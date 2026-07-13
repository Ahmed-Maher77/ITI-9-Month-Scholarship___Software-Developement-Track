export const normalizeUserProfile = (user) => {
    if (!user || typeof user !== "object") {
        return null;
    }

    const resolvedId = user.id ?? user._id ?? null;

    return {
        id: resolvedId != null ? String(resolvedId) : null,
        username: user.username ?? "",
        email: user.email ?? "",
        subscriptionPlan: user.subscriptionPlan ?? "free",
        subscriptionRenewalDate: user.subscriptionRenewalDate ?? null,
        stripeCustomerId: user.stripeCustomerId ?? null,
        coins: user.coins ?? 50,
        rolloverCoins: user.rolloverCoins ?? 0,
        lastCoinResetDate: user.lastCoinResetDate ?? null,
        hasPaymentMethod: user.hasPaymentMethod ?? false,
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
    };
};


export const getUserInitials = (username) => {
    const trimmed = username?.trim();

    if (!trimmed) {
        return "?";
    }

    const parts = trimmed.split(/\s+/);

    if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    return trimmed.slice(0, 2).toUpperCase();
};
