import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./modules/userAuth/userAuth.routes.js";
import productRoutes from "./modules/product/products.routes.js";
import corsOptions from "./config/corsOptions.js";
import startServerWithDB from "./config/serverManager.js";


// load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// intialize express app
const app = express();

// dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//======================= middlewares =======================
app.use(express.json());    // Parse JSON bodies
app.use(cors(corsOptions)); // Enable CORS
app.use(cookieParser());    // Parse cookies


// ======================= Route Handlers =======================
// home
app.get("/api", (_, res) => {
    res.sendFile(path.join(__dirname, "public", "files", "homePage.html"));
});


// User Authentication
app.use("/api/auth", userRoutes);

// Products
app.use("/api/products", productRoutes);


// Not Found Routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "files", "notFound.html"));
});


// ======================= Error-Handling Middleware =======================
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
});


// Start the server with database connection
startServerWithDB(app, PORT);