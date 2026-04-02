import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryProducts,
} from "./category.controllers.js";

const router = express.Router();

// Create category
router.post("/", createCategory);

// Get all categories
router.get("/", getAllCategories);

// Get all products under a category
router.get("/:categoryId/products", getCategoryProducts);

export default router;
