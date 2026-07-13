import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        checkoutSessionId: {
            type: String,
            required: true,
            unique: true,
        },
        paymentIntentId: {
            type: String,
            default: null,
        },
        targetPlan: {
            type: String,
            required: true,
            enum: ["plus", "family"],
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ["pending", "succeeded", "failed"],
            default: "pending",
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "egp",
        },
        paymentInfo: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
