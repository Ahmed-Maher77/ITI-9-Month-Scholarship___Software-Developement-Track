import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../../services/apiClient';

// Thunks
export const fetchAlerts = createAsyncThunk(
    'alerts/fetchAlerts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiFetch('/api/alerts');
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to fetch alerts');
            }
            return data.data; // The alerts list is in data.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const markAsRead = createAsyncThunk(
    'alerts/markAsRead',
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiFetch(`/api/alerts/${id}/read`, {
                method: 'PUT'
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to mark alert as read');
            }
            return data.data; // Returns { id, isRead }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const markAllAsRead = createAsyncThunk(
    'alerts/markAllAsRead',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiFetch('/api/alerts/read-all', {
                method: 'PUT'
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to mark all alerts as read');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteAlert = createAsyncThunk(
    'alerts/deleteAlert',
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiFetch(`/api/alerts/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to delete alert');
            }
            return data.data; // Returns { id }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {
        alerts: [],
        unreadCount: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchAlerts
            .addCase(fetchAlerts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAlerts.fulfilled, (state, action) => {
                state.loading = false;
                state.alerts = action.payload;
                state.unreadCount = action.payload.filter(a => !a.isRead).length;
            })
            .addCase(fetchAlerts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch alerts';
            })
            // markAsRead
            .addCase(markAsRead.fulfilled, (state, action) => {
                const updated = action.payload;
                const alert = state.alerts.find(a => a.id === updated.id);
                if (alert && !alert.isRead) {
                    alert.isRead = true;
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            })
            // markAllAsRead
            .addCase(markAllAsRead.fulfilled, (state) => {
                state.alerts.forEach(a => {
                    a.isRead = true;
                });
                state.unreadCount = 0;
            })
            // deleteAlert
            .addCase(deleteAlert.fulfilled, (state, action) => {
                const { id } = action.payload;
                const alert = state.alerts.find(a => a.id === id);
                if (alert && !alert.isRead) {
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
                state.alerts = state.alerts.filter(a => a.id !== id);
            });
    }
});

export default alertsSlice.reducer;
