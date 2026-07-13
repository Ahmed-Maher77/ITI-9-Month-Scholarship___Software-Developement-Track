import { apiFetch, parseApiResponse } from "./apiClient";

const API_URL = "/api/meters";

// Get user meters
const getMeters = async () => {
    const response = await apiFetch(API_URL);
    return parseApiResponse(response);
};

// Create new meter
const createMeter = async (meterData) => {
    const response = await apiFetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meterData),
    });
    return parseApiResponse(response);
};

// Update meter
const updateMeter = async (meterId, meterData) => {
    const response = await apiFetch(`${API_URL}/${meterId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meterData),
    });
    return parseApiResponse(response);
};

// Delete meter
const deleteMeter = async (meterId) => {
    const response = await apiFetch(`${API_URL}/${meterId}`, {
        method: "DELETE",
    });
    return parseApiResponse(response);
};

const meterService = {
    getMeters,
    createMeter,
    updateMeter,
    deleteMeter,
};

export default meterService;
