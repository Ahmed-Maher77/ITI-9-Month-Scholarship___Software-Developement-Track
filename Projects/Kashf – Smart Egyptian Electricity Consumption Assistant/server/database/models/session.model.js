import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        userAgent: {
            type: String,
            default: "Unknown Device",
        },
        ip: {
            type: String,
            default: "Unknown IP",
        },
        lastActive: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Auto-delete session records after 7 days (matching refresh token expiration)
sessionSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

const Session = mongoose.model("Session", sessionSchema);

export default Session;
