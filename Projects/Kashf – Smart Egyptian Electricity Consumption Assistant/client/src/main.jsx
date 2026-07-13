import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import "./index.css";
import App from "./App.jsx";
import UpdatePrompt from "./components/UpdatePrompt.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            retry: false,
        },
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <App />
                <UpdatePrompt />
            </QueryClientProvider>
        </HelmetProvider>
    </StrictMode>
);
