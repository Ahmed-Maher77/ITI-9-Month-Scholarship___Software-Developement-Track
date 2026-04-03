import ProductModel from "../database/models/products.model.js";
import CategoryModel from "../database/models/category.model.js";
import mongoose from "mongoose";

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().populate(
            "category",
            "name description",
        );
        if (products.length === 0) {
            return res.json({ message: "No products found", products: [] });
        }
        return res.json({ products });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get product by id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const product = await ProductModel.findById(id).populate(
            "category",
            "name description",
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json({ product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Create product
const addNewProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;

        if (!name || price === undefined || !category) {
            return res
                .status(400)
                .json({ message: "name, price and category are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ message: "Invalid category id" });
        }

        const foundCategory = await CategoryModel.findById(category);
        if (!foundCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        const product = await ProductModel.create({ name, price, category });
        return res.status(201).json({ message: "Product created", product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete product by id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json({
            message: "Product deleted",
            product: deletedProduct,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update product by id
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const { category } = req.body;
        if (category) {
            if (!mongoose.Types.ObjectId.isValid(category)) {
                return res.status(400).json({ message: "Invalid category id" });
            }

            const foundCategory = await CategoryModel.findById(category);
            if (!foundCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        ).populate("category", "name description");

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json({
            message: "Product updated",
            product: updatedProduct,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export {
    getAllProducts,
    getProductById,
    addNewProduct,
    deleteProduct,
    updateProduct,
};
