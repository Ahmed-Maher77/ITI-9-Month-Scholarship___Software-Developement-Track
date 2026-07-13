import { apiFetch, parseApiResponse } from "./apiClient";

/**
 * Update profile fields (username, phone, governorate, preferredLanguage).
 * PATCH /api/auth/profile
 */
export const updateProfile = async (fields) => {
    const response = await apiFetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
    });
    return parseApiResponse(response);
};
