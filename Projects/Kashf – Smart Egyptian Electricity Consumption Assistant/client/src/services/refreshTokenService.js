import { parseApiResponse } from "./apiErrors";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const requestRefreshToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
    });

    if (response.status === 401) {
        return { expired: true };
    }

    return parseApiResponse(response, "Session refresh failed.");
};
