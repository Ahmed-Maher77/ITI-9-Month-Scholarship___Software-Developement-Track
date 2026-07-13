import mongoose from "mongoose";
import { ACTIVITY_TYPE_VALUES } from "../../src/config/activity.constants.js";

const activitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: ACTIVITY_TYPE_VALUES,
            required: true,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    { timestamps: true }
);

// TTL: auto-delete activity logs older than 90 days
activitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
