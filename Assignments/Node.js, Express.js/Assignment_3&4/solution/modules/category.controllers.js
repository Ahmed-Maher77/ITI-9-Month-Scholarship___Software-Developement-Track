import mongoose from "mongoose";
import CategoryModel from "../database/models/category.model.js";
import ProductModel from "../database/models/products.model.js";

// Create category
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res
                .status(400)
                .json({ message: "Category name is required" });
        }

        const category = await CategoryModel.create({ name, description });
        return res.status(201).json({ message: "Category created", category });
    } catch (error) {
        if (error.code === 11000) {
            return res
                .status(409)
                .json({ message: "Category name already exists" });
        }
        return res.status(500).json({ message: error.message });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        return res.json({ categories });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all products under a category
const getCategoryProducts = async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category id" });
        }

        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const products = await ProductModel.find({
            category: categoryId,
        }).populate("category", "name description");
        return res.json({ category, products });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { createCategory, getAllCategories, getCategoryProducts };
