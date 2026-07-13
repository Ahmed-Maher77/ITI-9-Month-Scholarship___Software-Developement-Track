import { apiFetch, parseApiResponse } from "./apiClient";

/**
 * Get paginated activity history for the current user.
 * GET /api/activity?page=1&limit=20
 */
export const getActivity = async ({ page = 1, limit = 20 } = {}) => {
    const params = new URLSearchParams({ page, limit });
    const response = await apiFetch(`/api/activity?${params}`);
    return parseApiResponse(response);
};
