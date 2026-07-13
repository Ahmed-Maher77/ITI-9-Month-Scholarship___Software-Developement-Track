import { apiFetch, parseApiResponse } from "./apiClient";

const API_URL = "/api/admin";

const getDashboardStats = async () => {
    const response = await apiFetch(`${API_URL}/dashboard/stats`);
    return parseApiResponse(response);
};

const getRecentUsers = async (limit = 5) => {
    const response = await apiFetch(`${API_URL}/users/recent?limit=${limit}`);
    return parseApiResponse(response);
};

const getUsers = async ({ search, page, limit, status } = {}) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page) params.set("page", page);
    if (limit) params.set("limit", limit);
    if (status) params.set("status", status);

    const response = await apiFetch(`${API_URL}/users?${params.toString()}`);
    return parseApiResponse(response);
};

const toggleUserStatus = async (userId, isActive) => {
    const response = await apiFetch(`${API_URL}/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
    });
    return parseApiResponse(response);
};

const deleteUser = async (userId) => {
    const response = await apiFetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
    });
    return parseApiResponse(response);
};

const getDevices = async ({ search, page, limit, status } = {}) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page) params.set("page", page);
    if (limit) params.set("limit", limit);
    if (status) params.set("status", status);

    const response = await apiFetch(`${API_URL}/devices?${params.toString()}`);
    return parseApiResponse(response);
};

const updateDeviceStatus = async (deviceId, status) => {
    const response = await apiFetch(`${API_URL}/devices/${deviceId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
    return parseApiResponse(response);
};

const deleteDevice = async (deviceId) => {
    const response = await apiFetch(`${API_URL}/devices/${deviceId}`, {
        method: "DELETE",
    });
    return parseApiResponse(response);
};

const getTiers = async () => {
    const response = await apiFetch(`${API_URL}/tiers`);
    return parseApiResponse(response);
};

const updateTier = async (tierId, data) => {
    const response = await apiFetch(`${API_URL}/tiers/${tierId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return parseApiResponse(response);
};

const getNotifications = async ({ type, read, page, limit } = {}) => {
    const params = new URLSearchParams();
    if (type && type !== "all") params.set("type", type);
    if (read !== undefined) params.set("read", read);
    if (page) params.set("page", page);
    if (limit) params.set("limit", limit);

    const response = await apiFetch(`${API_URL}/notifications?${params.toString()}`);
    return parseApiResponse(response);
};

const createNotification = async (data) => {
    const response = await apiFetch(`${API_URL}/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return parseApiResponse(response);
};

const deleteNotification = async (notificationId) => {
    const response = await apiFetch(`${API_URL}/notifications/${notificationId}`, {
        method: "DELETE",
    });
    return parseApiResponse(response);
};

const getSettings = async () => {
    const response = await apiFetch(`${API_URL}/settings`);
    return parseApiResponse(response);
};

const updateSettings = async (data) => {
    const response = await apiFetch(`${API_URL}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return parseApiResponse(response);
};

const adminService = {
    getDashboardStats,
    getRecentUsers,
    getUsers,
    toggleUserStatus,
    deleteUser,
    getDevices,
    updateDeviceStatus,
    deleteDevice,
    getTiers,
    updateTier,
    getNotifications,
    createNotification,
    deleteNotification,
    getSettings,
    updateSettings,
};

export default adminService;
