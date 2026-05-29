import { createSlice } from "@reduxjs/toolkit";
import { getStoredAuth } from "../utils/authStorage";

const initialState = {
    auth: getStoredAuth(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.auth = action.payload;
        },
    },
});

export const { setAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth.auth;
export const selectIsLoggedIn = (state) => Boolean(state.auth.auth?.isLoggedIn);
export const selectRole = (state) => state.auth.auth?.role || "user";

export default authSlice.reducer;
