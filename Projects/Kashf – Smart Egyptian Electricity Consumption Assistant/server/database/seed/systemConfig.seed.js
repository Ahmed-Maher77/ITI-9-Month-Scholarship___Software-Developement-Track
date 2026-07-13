import SystemConfig from "../models/systemConfig.model.js";

const DEFAULTS = [
    { key: "geminiApiKey", value: "" },
    { key: "maxUploadSizeMb", value: 10 },
    { key: "maxMetersFree", value: 1 },
    { key: "maxMetersPlus", value: 2 },
    { key: "maxMetersFamily", value: 5 },
    { key: "sessionTimeoutMinutes", value: 60 },
    { key: "maintenanceMode", value: false },
];

const seedSystemConfig = async () => {
    for (const config of DEFAULTS) {
        await SystemConfig.findOneAndUpdate(
            { key: config.key },
            { $setOnInsert: { value: config.value } },
            { upsert: true }
        );
    }
    console.log("System config seeded.");
};

export default seedSystemConfig;
