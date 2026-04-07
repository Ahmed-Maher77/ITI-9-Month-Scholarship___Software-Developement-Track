import express from "express";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import isAuthorized from "../../middlewares/isAuthorized.js";
import validateRequestBody from "../../middlewares/validateRequestBody.js";
import productValidationSchema from "./products.validation.js";
import { addNewProduct, getAllProducts, getProductById, getProductsByAdminId } from "./products.controllers.js";

const router = express.Router();


// add new product (avilable only for admins)
router.post("/", isAuthenticated, isAuthorized(["admin"]), validateRequestBody(productValidationSchema), addNewProduct);

// get all products (avilable for all users)
router.get("/", isAuthenticated, getAllProducts);

// get product by id (avilable for all users)
router.get("/:productId", isAuthenticated, getProductById);

// get admin's products (avilable only for admins)
router.get("/admin/:adminId", isAuthenticated, isAuthorized(["admin"]), getProductsByAdminId);


export default router;