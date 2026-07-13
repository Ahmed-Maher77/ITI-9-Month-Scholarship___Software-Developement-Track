import { apiFetch, parseApiResponse } from "./apiClient";

const API_URL = "/api/simulations";

// Get user simulations
const getSimulations = async () => {
    const response = await apiFetch(API_URL);
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Get single simulation
const getSimulation = async (id) => {
    const response = await apiFetch(`${API_URL}/${id}`);
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Create new simulation
const createSimulation = async (simulationData) => {
    const response = await apiFetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(simulationData),
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Delete simulation
const deleteSimulation = async (id) => {
    const response = await apiFetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Add circuit
const addCircuit = async (simulationId, circuitData) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/circuits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(circuitData),
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Update circuit
const updateCircuit = async (simulationId, circuitId, circuitData) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/circuits/${circuitId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(circuitData),
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Delete circuit
const deleteCircuit = async (simulationId, circuitId) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/circuits/${circuitId}`, {
        method: "DELETE",
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};


// Add device
const addDevice = async (simulationId, deviceData) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deviceData),
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Update device
const updateDevice = async (simulationId, deviceId, deviceData) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/devices/${deviceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deviceData),
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Delete device
const deleteDevice = async (simulationId, deviceId) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/devices/${deviceId}`, {
        method: "DELETE",
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Engine control
const startSimulation = async (id) => {
    const response = await apiFetch(`${API_URL}/${id}/start`, { method: "POST" });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

const pauseSimulation = async (id) => {
    const response = await apiFetch(`${API_URL}/${id}/pause`, { method: "POST" });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

const resetSimulation = async (id) => {
    const response = await apiFetch(`${API_URL}/${id}/reset`, { method: "POST" });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// SSE stream — uses fetch with auth headers (EventSource doesn't support custom headers)
const streamSimulation = (id, onMessage, onError) => {
    const controller = new AbortController();

    const connect = async () => {
        try {
            const response = await apiFetch(
                `${API_URL}/${id}/stream`,
                {
                    signal: controller.signal,
                    headers: { Accept: "text/event-stream" },
                },
                { skipRefresh: true }
            );

            if (!response.ok) {
                onError?.(new Error(`SSE connection failed: ${response.status}`));
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            const read = async () => {
                try {
                    const { done, value } = await reader.read();
                    if (done) {
                        onError?.({ message: "Stream closed" });
                        return;
                    }

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    buffer = lines.pop() || "";

                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            try {
                                const data = JSON.parse(line.slice(6));
                                onMessage(data);
                            } catch {
                                // skip malformed JSON
                            }
                        }
                    }

                    read();
                } catch (error) {
                    if (error.name !== "AbortError") {
                        onError?.(error);
                    }
                }
            };

            read();
        } catch (error) {
            if (error.name !== "AbortError") {
                onError?.(error);
            }
        }
    };

    connect();
    return controller;
};

// Get AI-powered energy-saving advice for a simulation
const getAdvice = async (simulationId) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/advise`, {
        method: "POST",
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Get tier prediction for a simulation
const getPrediction = async (simulationId) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/prediction`);
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// What-If simulation — projects consumption with device toggles
const getWhatIf = async (simulationId, toggleDevices, durationMinutes = 60) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/what-if`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toggleDevices, durationMinutes }),
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// Get smart recommendations for a simulation
const getRecommendations = async (simulationId) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/recommendations`);
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

// NL Chat agent — sends a natural language message to the simulation
const chat = async (simulationId, message, messageId) => {
    const response = await apiFetch(`${API_URL}/${simulationId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, messageId }),
    });
    const parsed = await parseApiResponse(response);
    return parsed.data;
};

const simulationService = {
    getSimulations,
    getSimulation,
    createSimulation,
    deleteSimulation,
    addCircuit,
    updateCircuit,
    deleteCircuit,
    addDevice,
    updateDevice,
    deleteDevice,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    streamSimulation,
    getAdvice,
    getPrediction,
    getWhatIf,
    getRecommendations,
    chat,
};

export default simulationService;
