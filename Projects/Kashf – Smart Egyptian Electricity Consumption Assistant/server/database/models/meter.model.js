import mongoose from "mongoose";

const meterSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        number: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["residential", "commercial", "vacation"],
            default: "residential",
        },
        status: {
            type: String,
            enum: ["active", "standby", "inactive", "maintenance"],
            default: "active",
        },
        tier: {
            type: Number,
            default: null,
            min: 1,
            max: 7,
        },
        consumption: {
            type: Number,
            default: 0,
            min: 0,
        },
        lastReading: {
            type: Date,
            default: Date.now,
        },
        trend: {
            type: [Number],
            default: [],
        },
    },
    { timestamps: true }
);

// Optional: compound index to ensure user doesn't have duplicate meter numbers
meterSchema.index({ user: 1, number: 1 }, { unique: true });

// Add a pre-save hook to ensure the trend array is initialized if missing
meterSchema.pre("save", function () {
    if (!this.trend || this.trend.length === 0) {
        this.trend = [0];
    }
});

const Meter = mongoose.model("Meter", meterSchema);

export default Meter;
