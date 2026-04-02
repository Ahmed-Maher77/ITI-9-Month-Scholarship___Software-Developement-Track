import express from "express";
import dotenv from "dotenv";
import productRoutes from "./modules/product.routes.js";
import categoryRoutes from "./modules/category.routes.js";
import connectDB from "./database/dbConnect.js";

// server setup
dotenv.config();
const app = express();
app.use(express.json());

// ======================= Route Handlers =======================
// home
app.post("/api", (req, res) => {
    res.json({ message: "Server is running..." });
});

// products
app.use("/api/products", productRoutes);

// categories
app.use("/api/categories", categoryRoutes);

// Not Found Route
app.use((req, res) => {
    res.status(404).json({ message: "Not Found Route" });
});

// Error Handling Middleware
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Connect DB and Start Server
const PORT = process.env.PORT || 5000;
connectDB().then((isConnected) => {
    if (isConnected) {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});

