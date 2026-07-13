import User from "../../database/models/user.model.js";
import { logActivity } from "./activity.service.js";
import { sendSubscriptionExpiredEmail } from "./email.service.js";
import { createAlert } from "./alert.service.js";

/**
 * Checks and handles expired subscriptions.
 * Sets expired users' plan back to 'free' and sends notification email.
 */
export const checkExpiredSubscriptions = async () => {
    const now = new Date();

    // Find users whose subscription renewal date has passed and plan is not free
    const expiredUsers = await User.find({
        subscriptionPlan: { $ne: "free" },
        subscriptionRenewalDate: { $lte: now },
    });

    console.log(`Found ${expiredUsers.length} expired subscriptions to process.`);

    for (const user of expiredUsers) {
        const previousPlan = user.subscriptionPlan;
        
        user.subscriptionPlan = "free";
        user.coins = 50; // free plan coins limit
        user.subscriptionRenewalDate = null;
        user.hasPaymentMethod = false;
        
        await user.save();

        // Log the activity
        logActivity(user._id, "subscription_expired", { previousPlan });

        // Create Alert
        createAlert({
            userId: user._id,
            type: "critical",
            titleKey: "alerts.data.subExpired.title",
            messageKey: "alerts.data.subExpired.message",
        });

        // Send email notification
        await sendSubscriptionExpiredEmail(user, previousPlan);
    }
};

/**
 * Checks a single user's subscription expiration dynamically on request.
 */
export const checkUserSubscription = async (user) => {
    if (user.subscriptionPlan !== "free" && user.subscriptionRenewalDate && new Date(user.subscriptionRenewalDate) < new Date()) {
        const previousPlan = user.subscriptionPlan;
        
        user.subscriptionPlan = "free";
        user.coins = 50;
        user.subscriptionRenewalDate = null;
        user.hasPaymentMethod = false;
        
        await user.save();
        
        // Log activity (non-blocking)
        logActivity(user._id, "subscription_expired", { previousPlan });

        // Create Alert (non-blocking)
        createAlert({
            userId: user._id,
            type: "critical",
            titleKey: "alerts.data.subExpired.title",
            messageKey: "alerts.data.subExpired.message",
        });
        
        // Send email (non-blocking)
        sendSubscriptionExpiredEmail(user, previousPlan).catch(console.error);
    }
};
