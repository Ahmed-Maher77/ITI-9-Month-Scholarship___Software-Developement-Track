import Activity from "../../database/models/activity.model.js";

/**
 * Log a user activity event.
 * Fails silently — never throw to the caller.
 */
export const logActivity = async (userId, type, metadata = {}) => {
    try {
        await Activity.create({ userId, type, metadata });
    } catch (err) {
        // Activity logging is non-critical — log but don't propagate
        console.error("[activity] Failed to log activity:", err.message);
    }
};

/**
 * Get paginated activity history for a user.
 */
export const getUserActivity = async ({ userId, page = 1, limit = 20 }) => {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        Activity.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Activity.countDocuments({ userId }),
    ]);

    return {
        items,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
    };
};
