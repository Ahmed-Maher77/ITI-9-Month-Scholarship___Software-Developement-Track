import { apiFetch, parseApiResponse } from "./apiClient";

export const changePassword = async (currentPassword, newPassword) => {
    const response = await apiFetch("/api/auth/security/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
    });
    return parseApiResponse(response, "Failed to change password.");
};

export const setup2fa = async () => {
    const response = await apiFetch("/api/auth/security/2fa/setup", {
        method: "POST",
    });
    return parseApiResponse(response, "Failed to set up 2FA.");
};

export const enable2fa = async (code) => {
    const response = await apiFetch("/api/auth/security/2fa/enable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
    });
    return parseApiResponse(response, "Failed to enable 2FA.");
};

export const disable2fa = async (password) => {
    const response = await apiFetch("/api/auth/security/2fa/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
    });
    return parseApiResponse(response, "Failed to disable 2FA.");
};

export const verify2fa = async (code, tempToken) => {
    const response = await apiFetch(
        "/api/auth/security/2fa/verify",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, tempToken }),
        },
        { skipRefresh: true }
    );
    return parseApiResponse(response, "2FA verification failed.");
};

export const getDevices = async () => {
    const response = await apiFetch("/api/auth/security/devices", {
        method: "GET",
    });
    return parseApiResponse(response, "Failed to fetch active devices.");
};

export const revokeDevice = async (sessionId) => {
    const response = await apiFetch(`/api/auth/security/devices/${sessionId}`, {
        method: "DELETE",
    });
    return parseApiResponse(response, "Failed to revoke device session.");
};

export const getLoginHistory = async () => {
    const response = await apiFetch("/api/auth/security/login-history", {
        method: "GET",
    });
    return parseApiResponse(response, "Failed to fetch login history.");
};

export const deleteAccount = async (password) => {
    const response = await apiFetch("/api/auth/security/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
    });
    return parseApiResponse(response, "Failed to delete account.");
};
