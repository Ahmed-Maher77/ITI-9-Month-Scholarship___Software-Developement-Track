import Stripe from "stripe";
import Payment from "../../database/models/payment.model.js";
import User from "../../database/models/user.model.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { logActivity } from "../services/activity.service.js";
import { sendPaymentSuccessEmail } from "../services/email.service.js";
import { toPublicUser } from "../utils/userMapper.js";
import { createAlert } from "../services/alert.service.js";

// Initialize Stripe lazily
let stripeInstance = null;
const getStripe = () => {
    if (!stripeInstance) {
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeKey) {
            console.error("STRIPE_SECRET_KEY is missing in environment variables.");
        }
        stripeInstance = new Stripe(stripeKey || "mock_key");
    }
    return stripeInstance;
};

// Plan config details
const PLAN_DETAILS = {
    plus: {
        price: 49,
        coins: 150,
        name: "Kashf Plus Plan"
    },
    family: {
        price: 99,
        coins: 300,
        name: "Kashf Family Plan"
    }
};

/**
 * Creates a Stripe Checkout Session for upgrading a subscription plan
 */
export const payForPlan = asyncHandler(async (req, res) => {
    const { targetPlan } = req.body;

    if (!targetPlan || !PLAN_DETAILS[targetPlan]) {
        throw new AppError("Invalid target plan specified. Choose 'plus' or 'family'.", 400);
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        throw new AppError("User not found.", 404);
    }

    // Check if the user is already subscribed to this plan
    if (user.subscriptionPlan === targetPlan && user.subscriptionRenewalDate && new Date(user.subscriptionRenewalDate) > new Date()) {
        throw new AppError(`You are already subscribed to the ${targetPlan} plan.`, 400);
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey || stripeKey.startsWith("mock")) {
        throw new AppError("Stripe API key is not configured. Please add STRIPE_SECRET_KEY to your server's .env file.", 500);
    }

    const stripe = getStripe();
    const plan = PLAN_DETAILS[targetPlan];

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "egp",
                    product_data: {
                        name: plan.name,
                        description: `30 days subscription to ${plan.name} with ${plan.coins} coins`,
                    },
                    unit_amount: plan.price * 100, // Stripe expects amount in cents
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/billing?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/billing?status=cancel`,
        customer_email: user.email,
        metadata: {
            userId: user._id.toString(),
            targetPlan,
        },
    });

    // Save payment log in Database
    await Payment.create({
        userId: user._id,
        checkoutSessionId: session.id,
        targetPlan,
        amount: plan.price,
        currency: "egp",
        paymentStatus: "pending",
    });

    res.status(200).json({
        success: true,
        data: {
            url: session.url,
        },
    });
});

/**
 * Fetches the payment history for the logged-in user
 */
export const getPaymentHistory = asyncHandler(async (req, res) => {
    const payments = await Payment.find({
        userId: req.user.id,
        paymentStatus: "succeeded"
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: payments,
    });
});

/**
 * Stripe Webhook to process payments asynchronously
 */
export const stripeWebhook = asyncHandler(async (req, res) => {
    const signature = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        throw new AppError("Missing Stripe signature or webhook secret.", 400);
    }

    const stripe = getStripe();
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (err) {
        throw new AppError(`Webhook signature verification failed: ${err.message}`, 400);
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const { userId, targetPlan } = session.metadata;

        console.log(`Processing successful checkout session ${session.id} for user ${userId}`);

        try {
            // Find the pending payment log and update it
            const payment = await Payment.findOne({ checkoutSessionId: session.id });
            if (payment) {
                payment.paymentStatus = "succeeded";
                payment.paymentIntentId = session.payment_intent;
                payment.paymentInfo = session;
                await payment.save();
            }

            const user = await User.findById(userId);
            if (user) {
                user.subscriptionPlan = targetPlan;
                user.stripeCustomerId = session.customer;
                user.hasPaymentMethod = true;
                
                // Add 30 days to renewal date
                const renewalDate = new Date();
                renewalDate.setDate(renewalDate.getDate() + 30);
                user.subscriptionRenewalDate = renewalDate;

                // Grant plan coins
                const planCoins = PLAN_DETAILS[targetPlan]?.coins || 50;
                user.coins = planCoins;
                user.lastCoinResetDate = new Date();

                await user.save();

                // Log Activity
                logActivity(user._id, "subscription_success", { 
                    plan: targetPlan, 
                    amount: session.amount_total / 100 
                });

                // Create System Alert
                createAlert({
                    userId: user._id,
                    type: "system",
                    titleKey: "alerts.data.subSuccess.title",
                    messageKey: "alerts.data.subSuccess.message",
                    messageParams: { plan: targetPlan }
                });

                // Send Confirmation Email
                await sendPaymentSuccessEmail(
                    user, 
                    targetPlan, 
                    session.amount_total / 100, 
                    renewalDate
                );
            }
        } catch (err) {
            console.error(`Error updating subscription inside webhook: ${err.message}`);
            throw new AppError(`Internal database update error: ${err.message}`, 500);
        }
    } else if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object;
        console.log(`Payment failed for intent ${paymentIntent.id}`);
        try {
            const payment = await Payment.findOne({ paymentIntentId: paymentIntent.id });
            if (payment) {
                payment.paymentStatus = "failed";
                payment.paymentInfo = paymentIntent;
                await payment.save();

                // Log Activity
                logActivity(payment.userId, "subscription_failed", { 
                    plan: payment.targetPlan, 
                    amount: payment.amount 
                });

                // Create System Alert
                createAlert({
                    userId: payment.userId,
                    type: "critical",
                    titleKey: "alerts.data.subFailed.title",
                    messageKey: "alerts.data.subFailed.message",
                    messageParams: { plan: payment.targetPlan }
                });
            }
        } catch (err) {
            console.error(`Error processing payment failure webhook: ${err.message}`);
        }
    }

    res.json({ received: true });
});

/**
 * Verifies a Stripe Checkout Session status synchronously on landing/redirect
 */
export const verifyCheckout = asyncHandler(async (req, res) => {
    const { session_id } = req.query;

    if (!session_id) {
        throw new AppError("session_id query parameter is required.", 400);
    }

    const stripe = getStripe();
    let session;
    try {
        session = await stripe.checkout.sessions.retrieve(session_id);
    } catch (err) {
        throw new AppError(`Stripe error retrieving session: ${err.message}`, 400);
    }

    if (!session) {
        throw new AppError("Checkout session not found.", 404);
    }

    // Verify the session belongs to the logged in user
    if (session.metadata?.userId !== req.user.id) {
        throw new AppError("Unauthorized. This session does not belong to your account.", 403);
    }

    // Find the payment record in our DB
    let payment = await Payment.findOne({ checkoutSessionId: session_id });

    // If session is paid, upgrade user plan
    if (session.payment_status === "paid" || session.status === "complete") {
        let isNewUpgrade = false;
        
        if (!payment) {
            // If for some reason the payment record wasn't created, create it now
            payment = await Payment.create({
                userId: req.user.id,
                checkoutSessionId: session_id,
                targetPlan: session.metadata.targetPlan,
                amount: session.amount_total / 100,
                currency: "egp",
                paymentStatus: "succeeded",
                paymentIntentId: session.payment_intent,
                paymentInfo: session
            });
            isNewUpgrade = true;
        } else if (payment.paymentStatus === "pending") {
            payment.paymentStatus = "succeeded";
            payment.paymentIntentId = session.payment_intent;
            payment.paymentInfo = session;
            await payment.save();
            isNewUpgrade = true;
        }

        if (isNewUpgrade) {
            const user = await User.findById(req.user.id);
            if (user && user.subscriptionPlan !== session.metadata.targetPlan) {
                const targetPlan = session.metadata.targetPlan;
                user.subscriptionPlan = targetPlan;
                user.stripeCustomerId = session.customer;
                user.hasPaymentMethod = true;
                
                // Add 30 days to renewal date
                const renewalDate = new Date();
                renewalDate.setDate(renewalDate.getDate() + 30);
                user.subscriptionRenewalDate = renewalDate;

                // Grant plan coins
                const planCoins = PLAN_DETAILS[targetPlan]?.coins || 50;
                user.coins = planCoins;
                user.lastCoinResetDate = new Date();

                await user.save();

                // Log Activity
                logActivity(user._id, "subscription_success", { 
                    plan: targetPlan, 
                    amount: session.amount_total / 100 
                });

                // Create System Alert
                createAlert({
                    userId: user._id,
                    type: "system",
                    titleKey: "alerts.data.subSuccess.title",
                    messageKey: "alerts.data.subSuccess.message",
                    messageParams: { plan: targetPlan }
                });

                // Send Confirmation Email
                sendPaymentSuccessEmail(
                    user, 
                    targetPlan, 
                    session.amount_total / 100, 
                    renewalDate
                ).catch(console.error);
            }
        }
    } else {
        // Session is unpaid/failed
        if (payment && payment.paymentStatus === "pending") {
            payment.paymentStatus = "failed";
            payment.paymentInfo = session;
            await payment.save();

            // Log Activity
            logActivity(payment.userId, "subscription_failed", { 
                plan: payment.targetPlan, 
                amount: payment.amount 
            });

            // Create System Alert
            createAlert({
                userId: payment.userId,
                type: "critical",
                titleKey: "alerts.data.subFailed.title",
                messageKey: "alerts.data.subFailed.message",
                messageParams: { plan: payment.targetPlan }
            });
        }
    }

    const updatedUser = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: {
            user: updatedUser ? toPublicUser(updatedUser) : null
        }
    });
});

/**
 * Removes the user's default payment method
 */
export const deletePaymentMethod = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        throw new AppError("User not found.", 404);
    }

    user.hasPaymentMethod = false;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Payment method removed successfully.",
        data: {
            user: toPublicUser(user)
        }
    });
});

/**
 * Reverts the user's plan to Free, resets coins to 50, and logs the cancellation alerts/activity
 */
export const cancelSubscription = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        throw new AppError("User not found.", 404);
    }

    if (user.subscriptionPlan === "free") {
        throw new AppError("You are already on the Free plan.", 400);
    }

    const previousPlan = user.subscriptionPlan;
    
    // Downgrade user properties
    user.subscriptionPlan = "free";
    user.subscriptionRenewalDate = null;
    user.coins = 50;
    user.lastCoinResetDate = new Date();
    await user.save();

    // Log Activity
    logActivity(user._id, "subscription_canceled", { previousPlan });

    // Create Warning Alert
    createAlert({
        userId: user._id,
        type: "warning",
        titleKey: "alerts.data.subCanceled.title",
        messageKey: "alerts.data.subCanceled.message",
        messageParams: { plan: previousPlan }
    });

    res.status(200).json({
        success: true,
        message: "Subscription canceled successfully.",
        data: {
            user: toPublicUser(user)
        }
    });
});
