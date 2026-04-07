// const allowedOrigins = ["http://localhost:8080", "https://domain.vercel.app"];

const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true);
        // if (!origin || allowedOrigins.includes(origin)) {
        //     callback(null, true);
        // } else {
        //     callback(new Error("Access denied! Not allowed by CORS"));
        // }
    },
    credentials: true, // Allow cookies/authorization headers
};

export default corsOptions;
