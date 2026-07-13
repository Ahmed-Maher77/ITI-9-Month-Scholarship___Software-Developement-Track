import { apiFetch, parseApiResponse } from "./apiClient";

/**
 * Update consumption goals.
 * PATCH /api/auth/goals
 */
export const updateGoals = async (goals) => {
    const response = await apiFetch("/api/auth/goals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goals),
    });
    return parseApiResponse(response);
};
