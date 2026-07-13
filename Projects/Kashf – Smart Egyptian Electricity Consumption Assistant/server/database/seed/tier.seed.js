import Tier from "../models/tier.model.js";

const DEFAULT_TIERS = [
    { tier: 1, threshold: 50,  rate: 0.58,  label: "First Tier" },
    { tier: 2, threshold: 100, rate: 0.78,  label: "Second Tier" },
    { tier: 3, threshold: 200, rate: 1.08,  label: "Third Tier" },
    { tier: 4, threshold: 350, rate: 1.28,  label: "Fourth Tier" },
    { tier: 5, threshold: 650, rate: 1.58,  label: "Fifth Tier" },
    { tier: 6, threshold: 1000, rate: 1.78, label: "Sixth Tier" },
    { tier: 7, threshold: 999999, rate: 2.08, label: "Seventh Tier" },
];

const seedTiers = async () => {
    const count = await Tier.countDocuments();
    if (count > 0) return;

    await Tier.insertMany(DEFAULT_TIERS);
    console.log("Tier config seeded.");
};

export default seedTiers;
