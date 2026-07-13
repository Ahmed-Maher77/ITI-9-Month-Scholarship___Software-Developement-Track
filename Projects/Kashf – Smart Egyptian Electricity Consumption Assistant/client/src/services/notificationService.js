import { apiFetch, parseApiResponse } from "./apiClient";

/**
 * Update a single or multiple notification preference keys.
 * PATCH /api/auth/notifications
 * @param {Record<string, boolean>} prefs - e.g. { sherihaWarning: false }
 */
export const updateNotificationPrefs = async (prefs) => {
    const response = await apiFetch("/api/auth/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
    });
    return parseApiResponse(response);
};
