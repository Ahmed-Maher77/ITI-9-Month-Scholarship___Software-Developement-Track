const allowedOrigins = [
    // Production client
    "https://kashf-ai-electricity-assistant.vercel.app",
    "https://kashf-smart-electricity-assistant.netlify.app",
    // Local development
    "http://localhost:5173",  // Vite dev server
    "http://localhost:5174",  // Vite dev server (fallback)
    "http://localhost:4173",  // Vite preview
];
const corsOptions = {
    origin: (origin, callback) => {
        // Allow no-origin requests (curl, Postman, server-to-server)
        if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: origin "${origin}" is not allowed`));
        }
    },
    credentials: true, // Allow cookies / Authorization headers
};

export default corsOptions;

