import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["warning", "critical", "recommendation", "system"],
        },
        titleKey: {
            type: String,
            required: true,
        },
        messageKey: {
            type: String,
            required: true,
        },
        messageParams: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        iconName: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        bg: {
            type: String,
            required: true,
        },
        ring: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Alert = mongoose.model("Alert", alertSchema);
export default Alert;
