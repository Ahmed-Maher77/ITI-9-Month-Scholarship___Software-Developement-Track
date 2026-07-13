import mongoose from "mongoose";

const systemConfigSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
        },
        value: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
    },
    { timestamps: true }
);

const SystemConfig = mongoose.model("SystemConfig", systemConfigSchema);

export default SystemConfig;
