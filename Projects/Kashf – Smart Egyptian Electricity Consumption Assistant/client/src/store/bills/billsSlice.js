import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../../services/apiClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchBills = createAsyncThunk(
    'bills/fetchBills',
    async ({ page = 1, limit = 5, year = 'all', status = 'all' }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            let queryParams = `?page=${page}&limit=${limit}`;
            if (year !== 'all') queryParams += `&year=${year}`;
            if (status !== 'all') queryParams += `&status=${status}`;

            const response = await apiFetch(`/api/bills${queryParams}`);
            const data = await response.json();
            
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to fetch bills');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addBillAsync = createAsyncThunk(
    'bills/addBill',
    async (billData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await apiFetch(`/api/bills`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(billData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to add bill');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editBillAsync = createAsyncThunk(
    'bills/editBill',
    async ({ id, billData }, { rejectWithValue }) => {
        try {
            const response = await apiFetch(`/api/bills/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(billData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to edit bill');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteBillAsync = createAsyncThunk(
    'bills/deleteBill',
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiFetch(`/api/bills/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to delete bill');
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const billsSlice = createSlice({
    name: 'bills',
    initialState: {
        bills: [],
        currentPage: 1,
        totalPages: 1,
        totalBills: 0,
        isLoading: false,
        error: null
    },
    reducers: {
        clearBillsError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Bills
            .addCase(fetchBills.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBills.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bills = action.payload.bills;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
                state.totalBills = action.payload.totalBills;
            })
            .addCase(fetchBills.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Add Bill
            .addCase(addBillAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addBillAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                // Add new bill to start of array, remove last if over limit (simplified pagination update)
                state.bills.unshift(action.payload);
                if (state.bills.length > 5) {
                    state.bills.pop();
                }
                state.totalBills += 1;
            })
            .addCase(addBillAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Edit Bill
            .addCase(editBillAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editBillAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.bills.findIndex(b => b.id === action.payload.id);
                if (index !== -1) {
                    state.bills[index] = action.payload;
                }
            })
            .addCase(editBillAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete Bill
            .addCase(deleteBillAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteBillAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bills = state.bills.filter(b => b.id !== action.payload);
                state.totalBills -= 1;
            })
            .addCase(deleteBillAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearBillsError } = billsSlice.actions;
export default billsSlice.reducer;
