import ProductModel from "../../database/models/products.model.js";
import UserModel from "../../database/models/users.model.js";
import AppError from "../../utils/AppError.js";


// Add new product (available only for admins)
const addNewProduct = async (req, res) => {
    const { name, description, price, category, image } = req.body;
    const publisherId = req.user?.userId;

    if (!publisherId) {
        throw new AppError("Unauthorized user! Missing publisher identity", 401);
    }

    // ensure publisher refers to an existing user
    const existingUser = await UserModel.findById(publisherId);
    if (!existingUser) {
        throw new AppError("No user found with the authenticated publisher ID", 404);
    }

    // create new product and save to database
    const newProduct = await ProductModel.create({
        name, 
        description, 
        price, 
        category, 
        image, 
        publishedBy: publisherId
    });

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
}

// Get all products (available for all users)
const getAllProducts = async (req, res) => {
    const products = await ProductModel.find().populate("publishedBy", "username email");
    res.status(200).json({
        message: "Products retrieved successfully",
        products
    })
};

// Get product by id (available for all users)
const getProductById = async (req, res) => {
    const { productId } = req.params;
    if (!productId) {
        throw new AppError("Product ID is required", 400);
    }
    const product = await ProductModel.findById(productId).populate("publishedBy", "username email");
    if (!product) {
        throw new AppError("No product found with this ID", 404);
    }
    res.status(200).json({
        message: "Product retrieved successfully",
        product
    });
};

// Get admin's products (available only for admins)
const getProductsByAdminId = async (req, res) => {
    const { adminId } = req.params;
    if (!adminId) {
        throw new AppError("Admin ID is required", 400);
    }
    // ensure adminId refers to an existing user (admin)
    const admin = await UserModel.findById(adminId);
    if (!admin) {
        throw new AppError("No user found with this ID", 404);
    }
    if (admin.role !== "admin") {
        throw new AppError("User with this ID is not an admin", 403);
    }
    
    const products = await ProductModel.find({ publishedBy: adminId }).populate("publishedBy", "username email");
    res.status(200).json({
        message: "Admin's products retrieved successfully",
        products
    });
};




export {
    addNewProduct,
    getAllProducts,
    getProductById,
    getProductsByAdminId
}