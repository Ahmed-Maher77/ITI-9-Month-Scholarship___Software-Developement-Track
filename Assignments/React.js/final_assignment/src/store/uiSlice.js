import { createSlice } from "@reduxjs/toolkit";

const THEME_STORAGE_KEY = "tech_news_theme";

function getInitialTheme() {
    if (typeof window === "undefined") return "light";
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

const initialState = {
    isSidebarCollapsed: false,
    theme: getInitialTheme(),
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebarCollapsed(state) {
            state.isSidebarCollapsed = !state.isSidebarCollapsed;
        },
        toggleTheme(state) {
            state.theme = state.theme === "dark" ? "light" : "dark";
        },
        setTheme(state, action) {
            state.theme = action.payload === "dark" ? "dark" : "light";
        },
    },
});

export const { toggleSidebarCollapsed, toggleTheme, setTheme } =
    uiSlice.actions;
export const selectIsSidebarCollapsed = (state) => state.ui.isSidebarCollapsed;
export const selectTheme = (state) => state.ui.theme;
export const themeStorageKey = THEME_STORAGE_KEY;

export default uiSlice.reducer;
