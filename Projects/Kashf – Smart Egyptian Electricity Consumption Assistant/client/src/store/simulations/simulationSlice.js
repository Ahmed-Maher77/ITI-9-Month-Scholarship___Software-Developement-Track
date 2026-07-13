import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import simulationService from '../../services/simulationService';

const initialState = {
    simulations: [],
    currentSimulation: null,
    isLoading: false,
    error: null,
    streamData: null,
    isStreamConnected: false,
    adviceData: null,
    adviceLoading: false,
    adviceError: null,
    predictionData: null,
    predictionLoading: false,
    predictionError: null,
    whatIfData: null,
    whatIfLoading: false,
    whatIfError: null,
    recommendationsData: null,
    recommendationsLoading: false,
    recommendationsError: null,
};

// Fetches all simulations available to the user.
export const fetchSimulations = createAsyncThunk('simulations/fetchSimulations', async (_, thunkAPI) => {
    try {
        return await simulationService.getSimulations();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Fetches a single simulation by its ID.
export const fetchSimulation = createAsyncThunk('simulations/fetchSimulation', async (id, thunkAPI) => {
    try {
        return await simulationService.getSimulation(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Creates a new simulation environment.
export const createSimulationAsync = createAsyncThunk('simulations/createSimulation', async (data, thunkAPI) => {
    try {
        return await simulationService.createSimulation(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Deletes a simulation by its ID.
export const deleteSimulationAsync = createAsyncThunk('simulations/deleteSimulation', async (id, thunkAPI) => {
    try {
        return await simulationService.deleteSimulation(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Adds a new electrical circuit to a specific simulation.
export const addCircuitAsync = createAsyncThunk('simulations/addCircuit', async ({ simulationId, data }, thunkAPI) => {
    try {
        return await simulationService.addCircuit(simulationId, data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Deletes a specific electrical circuit from a simulation.
export const deleteCircuitAsync = createAsyncThunk('simulations/deleteCircuit', async ({ simulationId, circuitId }, thunkAPI) => {
    try {
        return await simulationService.deleteCircuit(simulationId, circuitId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Adds a new device to an existing circuit within a simulation.
export const addDeviceAsync = createAsyncThunk('simulations/addDevice', async ({ simulationId, data }, thunkAPI) => {
    try {
        return await simulationService.addDevice(simulationId, data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});
// Updates a device inside a simulation.
export const updateDeviceAsync = createAsyncThunk('simulations/updateDevice', async ({ simulationId, deviceId, data }, thunkAPI) => {
    try {
        return await simulationService.updateDevice(simulationId, deviceId, data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});
// Deletes a device from a simulation.
export const deleteDeviceAsync = createAsyncThunk('simulations/deleteDevice', async ({ simulationId, deviceId }, thunkAPI) => {
    try {
        return await simulationService.deleteDevice(simulationId, deviceId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});
// Starts the simulation engine for a given simulation.
export const startSimulationAsync = createAsyncThunk('simulations/startSimulation', async (id, thunkAPI) => {
    try {
        return await simulationService.startSimulation(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Pauses a running simulation engine.
export const pauseSimulationAsync = createAsyncThunk('simulations/pauseSimulation', async (id, thunkAPI) => {
    try {
        return await simulationService.pauseSimulation(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Resets a simulation's state back to its initial configuration.
export const resetSimulationAsync = createAsyncThunk('simulations/resetSimulation', async (id, thunkAPI) => {
    try {
        return await simulationService.resetSimulation(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Fetches AI-powered energy-saving advice for a simulation.
export const fetchAdviceAsync = createAsyncThunk('simulations/fetchAdvice', async (simulationId, thunkAPI) => {
    try {
        return await simulationService.getAdvice(simulationId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Fetches tier prediction for a simulation.
export const fetchPredictionAsync = createAsyncThunk('simulations/fetchPrediction', async (simulationId, thunkAPI) => {
    try {
        return await simulationService.getPrediction(simulationId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Fetches What-If simulation projection.
export const fetchWhatIfAsync = createAsyncThunk('simulations/fetchWhatIf', async ({ simulationId, toggleDevices, durationMinutes }, thunkAPI) => {
    try {
        return await simulationService.getWhatIf(simulationId, toggleDevices, durationMinutes);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Fetches smart recommendations for a simulation.
export const fetchRecommendationsAsync = createAsyncThunk('simulations/fetchRecommendations', async (simulationId, thunkAPI) => {
    try {
        return await simulationService.getRecommendations(simulationId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || error.toString());
    }
});

// Redux slice handling electrical simulation state, including circuits, devices, and engine status (running/paused).
const simulationSlice = createSlice({
    name: 'simulations',
    initialState,
    reducers: {
        clearSimulations: (state) => {
            state.simulations = [];
            state.currentSimulation = null;
        },
        setStreamData: (state, action) => {
            state.streamData = action.payload;
        },
        setStreamConnected: (state, action) => {
            state.isStreamConnected = action.payload;
        },
        clearStreamData: (state) => {
            state.streamData = null;
            state.isStreamConnected = false;
        },
        clearAdvice: (state) => {
            state.adviceData = null;
            state.adviceLoading = false;
            state.adviceError = null;
        },
        clearRecommendations: (state) => {
            state.recommendationsData = null;
            state.recommendationsLoading = false;
            state.recommendationsError = null;
        },
        clearPrediction: (state) => {
            state.predictionData = null;
            state.predictionLoading = false;
            state.predictionError = null;
        },
        clearWhatIf: (state) => {
            state.whatIfData = null;
            state.whatIfLoading = false;
            state.whatIfError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Simulations
            .addCase(fetchSimulations.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSimulations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.simulations = action.payload;
            })
            .addCase(fetchSimulations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch Single Simulation
            .addCase(fetchSimulation.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSimulation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentSimulation = action.payload;
                state.streamData = action.payload.runtime || null;
                // Also update in the array if it exists
                const index = state.simulations.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.simulations[index] = action.payload;
                } else {
                    state.simulations.push(action.payload);
                }
            })
            .addCase(fetchSimulation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Create Simulation
            .addCase(createSimulationAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createSimulationAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.simulations.unshift(action.payload);
            })
            .addCase(createSimulationAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete Simulation
            .addCase(deleteSimulationAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteSimulationAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.simulations = state.simulations.filter(s => s.id !== action.payload.id);
                if (state.currentSimulation?.id === action.payload.id) {
                    state.currentSimulation = null;
                }
            })
            .addCase(deleteSimulationAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Add Circuit
            .addCase(addCircuitAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addCircuitAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.simulations.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.simulations[index] = action.payload;
                }
                if (state.currentSimulation?.id === action.payload.id) {
                    state.currentSimulation = action.payload;
                }
            })
            .addCase(addCircuitAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete Circuit
            .addCase(deleteCircuitAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCircuitAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.simulations.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.simulations[index] = action.payload;
                }
                if (state.currentSimulation?.id === action.payload.id) {
                    state.currentSimulation = action.payload;
                }
            })
            .addCase(deleteCircuitAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Add Device
            .addCase(addDeviceAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addDeviceAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.simulations.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.simulations[index] = action.payload;
                }
                if (state.currentSimulation?.id === action.payload.id) {
                    state.currentSimulation = action.payload;
                }
            })
            .addCase(updateDeviceAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.simulations.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.simulations[index] = action.payload;
                }
                if (state.currentSimulation?.id === action.payload.id) {
                    state.currentSimulation = action.payload;
                }
            })
            .addCase(deleteDeviceAsync.fulfilled, (state, action) => {
                const index = state.simulations.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.simulations[index] = action.payload;
                }
                if (state.currentSimulation?.id === action.payload.id) {
                    state.currentSimulation = action.payload;
                }
            })
            // Start Simulation
            .addCase(startSimulationAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(startSimulationAsync.fulfilled, (state, action) => {
                // action.payload is the new engine runtime state
                state.streamData = action.payload;
                if (state.currentSimulation) {
                    state.currentSimulation.runtime = action.payload;
                }
                const index = state.simulations.findIndex(s => s.id === state.currentSimulation?.id);
                if (index !== -1) {
                    state.simulations[index].runtime = action.payload;
                }
            })
            .addCase(startSimulationAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Pause Simulation
            .addCase(pauseSimulationAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(pauseSimulationAsync.fulfilled, (state, action) => {
                // action.payload is the engine runtime state
                state.streamData = action.payload;
                if (state.currentSimulation) {
                    state.currentSimulation.runtime = action.payload;
                }
                const index = state.simulations.findIndex(s => s.id === state.currentSimulation?.id);
                if (index !== -1) {
                    state.simulations[index].runtime = action.payload;
                }
            })
            .addCase(pauseSimulationAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Reset Simulation
            .addCase(resetSimulationAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(resetSimulationAsync.fulfilled, (state, action) => {
                // action.payload is the full simulation doc with the reset runtime state
                const index = state.simulations.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.simulations[index] = action.payload;
                }
                if (state.currentSimulation?.id === action.payload.id) {
                    state.currentSimulation = action.payload;
                }
                state.streamData = action.payload.runtime;
            })
            .addCase(resetSimulationAsync.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Fetch AI Advice
            .addCase(fetchAdviceAsync.pending, (state) => {
                state.adviceLoading = true;
                state.adviceError = null;
            })
            .addCase(fetchAdviceAsync.fulfilled, (state, action) => {
                state.adviceLoading = false;
                state.adviceData = action.payload;
            })
            .addCase(fetchAdviceAsync.rejected, (state, action) => {
                state.adviceLoading = false;
                state.adviceError = action.payload;
            })
            // Fetch Tier Prediction
            .addCase(fetchPredictionAsync.pending, (state) => {
                state.predictionLoading = true;
                state.predictionError = null;
            })
            .addCase(fetchPredictionAsync.fulfilled, (state, action) => {
                state.predictionLoading = false;
                state.predictionData = action.payload;
            })
            .addCase(fetchPredictionAsync.rejected, (state, action) => {
                state.predictionLoading = false;
                state.predictionError = action.payload;
            })
            // Fetch What-If
            .addCase(fetchWhatIfAsync.pending, (state) => {
                state.whatIfLoading = true;
                state.whatIfError = null;
            })
            .addCase(fetchWhatIfAsync.fulfilled, (state, action) => {
                state.whatIfLoading = false;
                state.whatIfData = action.payload;
            })
            .addCase(fetchWhatIfAsync.rejected, (state, action) => {
                state.whatIfLoading = false;
                state.whatIfError = action.payload;
            })
            // Fetch Recommendations
            .addCase(fetchRecommendationsAsync.pending, (state) => {
                state.recommendationsLoading = true;
                state.recommendationsError = null;
            })
            .addCase(fetchRecommendationsAsync.fulfilled, (state, action) => {
                state.recommendationsLoading = false;
                state.recommendationsData = action.payload;
            })
            .addCase(fetchRecommendationsAsync.rejected, (state, action) => {
                state.recommendationsLoading = false;
                state.recommendationsError = action.payload;
            });
    }
});

export const { clearSimulations, setStreamData, setStreamConnected, clearStreamData, clearAdvice, clearPrediction, clearWhatIf, clearRecommendations } = simulationSlice.actions;

export default simulationSlice.reducer;
