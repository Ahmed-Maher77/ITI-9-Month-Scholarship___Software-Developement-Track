import mongoose from "mongoose";

const tierSchema = new mongoose.Schema(
    {
        tier: {
            type: Number,
            required: true,
            unique: true,
            min: 1,
            max: 7,
        },
        threshold: {
            type: Number,
            required: true,
            min: 0,
        },
        rate: {
            type: Number,
            required: true,
            min: 0,
        },
        label: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const Tier = mongoose.model("Tier", tierSchema);

export default Tier;
