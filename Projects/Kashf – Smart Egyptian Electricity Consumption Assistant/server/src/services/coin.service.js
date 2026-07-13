import User from "../../database/models/user.model.js";

const PLAN_COINS = {
    free: 50,
    plus: 150,
    family: 300,
};

export const checkAndResetCoins = async (user) => {
    if (!user.lastCoinResetDate) {
        user.lastCoinResetDate = new Date();
    }

    const now = new Date();
    const lastReset = new Date(user.lastCoinResetDate);

    // If we are in a different month AND year, or just a different month of the same year
    const isDifferentMonth = now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear();

    if (isDifferentMonth) {
        // Rollover remaining coins
        user.rolloverCoins = (user.rolloverCoins || 0) + (user.coins || 0);
        
        // Reset coins to plan's base value
        const plan = user.subscriptionPlan || 'free';
        user.coins = PLAN_COINS[plan] || PLAN_COINS.free;
        
        user.lastCoinResetDate = now;
        await user.save();
    }

    return user;
};

export const deductCoins = async (user, amount) => {
    // Ensure coins are properly reset before deducting
    await checkAndResetCoins(user);

    let totalCoins = (user.coins || 0) + (user.rolloverCoins || 0);

    if (totalCoins < amount) {
        throw new Error(`Insufficient coins. Required: ${amount}, Available: ${totalCoins}`);
    }

    // Deduct from regular coins first
    if (user.coins >= amount) {
        user.coins -= amount;
    } else {
        // Exhaust regular coins and deduct remainder from rollover coins
        const remainingToDeduct = amount - user.coins;
        user.coins = 0;
        user.rolloverCoins -= remainingToDeduct;
    }

    await user.save();
    return user;
};
