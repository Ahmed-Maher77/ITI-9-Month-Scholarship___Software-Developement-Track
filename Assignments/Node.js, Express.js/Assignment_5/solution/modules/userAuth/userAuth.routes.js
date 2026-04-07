import express from "express";
import { createUser, loginUser, logoutUser, forgotPassword, resetPassword } from "./userAuth.controllers.js";
import { registerValidationSchema, loginValidationSchema, forgotPasswordValidationSchema, resetPasswordValidationSchema } from "./userAuth.validation.js";
import validateRequestBody from "../../middlewares/validateRequestBody.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

// Initialize the router
const router = express.Router();


// Register a new user
router.post("/register", validateRequestBody(registerValidationSchema), createUser);

// Login user
router.post("/login", validateRequestBody(loginValidationSchema), loginUser);

// Logout user
router.post("/logout", isAuthenticated, logoutUser);

// Forgot password
router.post("/forgot-password", validateRequestBody(forgotPasswordValidationSchema), forgotPassword);

// Reset password
router.patch("/reset-password/:resetPasswordToken", validateRequestBody(resetPasswordValidationSchema), resetPassword);




export default router;