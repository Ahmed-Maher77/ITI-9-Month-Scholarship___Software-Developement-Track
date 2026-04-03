import express from 'express';
import { getAllProducts, getProductById, addNewProduct, deleteProduct, updateProduct } from "./product.controllers.js";


const router = express.Router();


// Get all products
router.get("/", getAllProducts);

// Get product by id
router.get("/:id", getProductById);

// Add new product
router.post("/", addNewProduct);

// Delete product
router.delete("/:id", deleteProduct);

// Update product
router.put("/:id", updateProduct);



export default router;