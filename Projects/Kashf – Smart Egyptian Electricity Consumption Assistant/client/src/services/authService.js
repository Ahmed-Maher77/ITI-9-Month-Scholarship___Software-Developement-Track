import { apiFetch, parseApiResponse } from "./apiClient";
import { requestRefreshToken } from "./refreshTokenService";

export const loginUser = async (payload) => {
    const response = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    return parseApiResponse(response, "Login failed.");
};

export const registerUser = async (payload) => {
    const formData = new FormData();
    formData.append("username", payload.username);
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("repassword", payload.repassword);

    if (payload.picture) {
        formData.append("picture", payload.picture);
    }

    const response = await apiFetch("/api/auth/register", {
        method: "POST",
        body: formData,
    });

    return parseApiResponse(response, "Registration failed.");
};

export const refreshAccessToken = requestRefreshToken;

export const updateProfilePicture = async (picture) => {
    const formData = new FormData();
    formData.append("picture", picture);

    const response = await apiFetch("/api/auth/profile/picture", {
        method: "PATCH",
        body: formData,
    });

    return parseApiResponse(response, "Could not update profile picture.");
};

export const fetchCurrentUser = async () => {
    const response = await apiFetch("/api/auth/me");

    return parseApiResponse(response, "Could not load profile.");
};

export const logoutUser = async () => {
    const response = await apiFetch(
        "/api/auth/logout",
        { method: "POST" },
        { skipRefresh: true }
    );

    return parseApiResponse(response, "Logout failed.");
};
