import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import metersReducer from "./meters/metersSlice";
import billsReducer from "./bills/billsSlice";
import alertsReducer from "./alerts/alertsSlice";
import simulationsReducer from "./simulations/simulationSlice";

// Combines all feature slices and configures middleware.
export const store = configureStore({
    reducer: {
        auth: authReducer,
        meters: metersReducer,
        bills: billsReducer,
        alerts: alertsReducer,
        simulations: simulationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['auth/login/fulfilled', 'auth/register/fulfilled'],
                // Ignore these paths in the state
                ignoredPaths: ['auth.user.token'],
            },
        }),
});

export default store;
