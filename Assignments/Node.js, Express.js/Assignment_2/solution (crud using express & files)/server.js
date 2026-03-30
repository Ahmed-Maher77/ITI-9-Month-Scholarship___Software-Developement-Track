import express from "express";
import dotenv from "dotenv";
import getAllProducts from "./src/modules/products/getAllProducts.js";
import getProductById from "./src/modules/products/getProductById.js";
import addNewProduct from "./src/modules/products/addNewProduct.js";
import updateProduct from "./src/modules/products/updateProduct.js";
import deleteProduct from "./src/modules/products/deleteProduct.js";

// server configuration
dotenv.config();
const app = express();



// middleware
app.use(express.json());

// =========================== Route Handlers ===========================
// home
app.get("/api", (req, res) => {
    res.send("Hello from server");
});

// get all products
app.get("/api/products", async (req, res) => {
    const products = await getAllProducts();
    return res.json({ data: products });
});

// get product by id
app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    // ensure id is provided
    if (!id) {
        return res.status(400).json({ message: "Product id is required" });
    }

    const product = await getProductById(id);

    // no product found with the provided id
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
        message: "Product sent successfully",
        data: product,
    });
});

// add new product
app.post("/api/products", async (req, res) => {
    const data = req.body;
    // ensure request body isn't empty
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: "Request body is required" });
    }
    // ensure data has a valid format
    if (typeof data !== "object") {
        return res.status(400).json({ message: "Invalid data format" });
    }
    // ensure name, price are provided
    const { name, price } = data;
    if (!name || !price) {
        return res.status(400).json({ message: "Name and price are required" });
    }

    const newProduct = await addNewProduct(name, price);

    // send response (201 + msg + new product)
    res.status(201).json({
        message: "Product added successfully",
        data: newProduct,
    });
});

// update product
app.patch("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    // ensure id is provided
    if (!id) {
        return res.status(400).json({ message: "Product id is required" });
    }
    // ensure data is provided
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: "Request body is required" });
    }
    // ensure name or price is provided
    if (!data.name && !data.price) {
        return res.status(400).json({ message: "Name or price is required" });
    }

    const updatedProduct = await updateProduct(id, data, res);
    // send response (200 + msg + updated product)
    res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct,
    });
});

// delete product
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    // ensure id is provided
    if (!id) {
        return res.status(400).json({ message: "Product id is required" });
    }
    await deleteProduct(id, res);
    res.status(200).json({
        message: `Product with id (${id}) deleted successfully`,
    });
});

// not found route
app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
