import { getAuthorizationHeader } from "../auth/authStorage";
import { attemptTokenRefresh } from "../auth/sessionCoordinator";
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export { ApiError, parseApiResponse } from "./apiErrors";

export const apiFetch = async (path, options = {}, { skipRefresh = false } = {}) => {
    const headers = {
        ...getAuthorizationHeader(),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${path}`, {
        credentials: "include",
        ...options,
        headers,
    });

    if (response.status === 401 && !skipRefresh && !options._retry) {
        const refreshed = await attemptTokenRefresh();

        if (refreshed) {
            return apiFetch(
                path,
                { ...options, _retry: true },
                { skipRefresh: true }
            );
        }
    }

    return response;
};
