export const toPublicUser = (user) => ({
    id: user._id?.toString?.() ?? user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    subscriptionPlan: user.subscriptionPlan ?? "free",
    subscriptionRenewalDate: user.subscriptionRenewalDate ?? null,
    stripeCustomerId: user.stripeCustomerId ?? null,
    hasPaymentMethod: user.hasPaymentMethod ?? false,
    coins: user.coins ?? 50,
    rolloverCoins: user.rolloverCoins ?? 0,
    lastCoinResetDate: user.lastCoinResetDate ?? null,
    picture: user.picture ?? null,
    // Profile extras
    phone: user.phone ?? null,
    governorate: user.governorate ?? null,
    preferredLanguage: user.preferredLanguage ?? "ar",
    // Consumption goals
    consumptionGoals: {
        monthlyKwhLimit: user.consumptionGoals?.monthlyKwhLimit ?? 400,
        targetBillEgp:   user.consumptionGoals?.targetBillEgp   ?? 700,
        targetSheriha:   user.consumptionGoals?.targetSheriha   ?? 4,
    },
    // Notification preferences
    notificationPreferences: {
        sherihaWarning:     user.notificationPreferences?.sherihaWarning     ?? true,
        billForecast:       user.notificationPreferences?.billForecast       ?? true,
        aiRecommendations:  user.notificationPreferences?.aiRecommendations  ?? true,
        monthlyReports:     user.notificationPreferences?.monthlyReports     ?? false,
        pushNotifications:  user.notificationPreferences?.pushNotifications  ?? true,
        emailNotifications: user.notificationPreferences?.emailNotifications ?? true,
        smsNotifications:   user.notificationPreferences?.smsNotifications   ?? false,
    },
    twoFactorEnabled: user.twoFactorEnabled ?? false,
    createdAt: user.createdAt ?? null,
});

