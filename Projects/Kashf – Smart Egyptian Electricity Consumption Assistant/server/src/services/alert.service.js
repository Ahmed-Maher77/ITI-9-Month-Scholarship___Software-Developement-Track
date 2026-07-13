import Alert from "../../database/models/alert.model.js";

const PRESETS = {
    warning: {
        iconName: "AlertTriangle",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        ring: "ring-amber-500/30",
    },
    critical: {
        iconName: "TrendingUp",
        color: "text-red-400",
        bg: "bg-red-500/10",
        ring: "ring-red-500/30",
    },
    recommendation: {
        iconName: "Sparkles",
        color: "text-kashf-light-blue",
        bg: "bg-kashf-blue/10",
        ring: "ring-kashf-blue/30",
    },
    system: {
        iconName: "Bell",
        color: "text-neutral-400",
        bg: "bg-neutral-800",
        ring: "ring-neutral-500/30",
    },
};

/**
 * Creates a user alert/notification.
 * Fails silently — never throw to caller.
 */
export const createAlert = async ({
    userId,
    type,
    titleKey,
    messageKey,
    messageParams = {},
}) => {
    try {
        const preset = PRESETS[type] || PRESETS.system;
        await Alert.create({
            user: userId,
            type,
            titleKey,
            messageKey,
            messageParams,
            ...preset,
        });
    } catch (err) {
        console.error("[alert] Failed to create alert:", err.message);
    }
};
