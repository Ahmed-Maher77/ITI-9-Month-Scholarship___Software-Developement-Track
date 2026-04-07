import UserModel from "../../database/models/users.model.js";
import AppError from "../../utils/AppError.js";
import generateToken from "../../utils/generateToken.js";
import generateCookie from "../../utils/generateCookie.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import generateResetPasswordToken from "../../utils/generateResetPasswordToken.js";
import sendEmail from "../../utils/emailSender.js";
import fs from "fs";

const template = fs.readFileSync(
    new URL(
        "../../public/files/resetPassword_emailTemplate.html",
        import.meta.url,
    ),
    "utf8",
);

// ============== Register new user ==============
const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    // ensure user doesn't already exist
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new AppError("User with this email already exists", 400);
    }
    // create user and save to database
    const newUser = await new UserModel({
        username,
        email,
        password,
        role: role || "user",
    }).save();
    // generate ACCESS_TOKEN
    const accessToken = generateToken(newUser);
    // save in httpOnly cookie
    generateCookie(res, accessToken); // will be saved automatically in the browser cookies
    // send response
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        },
    });
};

// ============== login user ==============
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // ensure user exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
        throw new AppError("No account with this email", 404);
    }
    // ensure password is correct
    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password,
    );
    if (!isPasswordCorrect) {
        throw new AppError("Invalid email or password", 401);
    }
    // generate ACCESS_TOKEN
    const accessToken = generateToken(existingUser);
    // save in httpOnly cookie
    generateCookie(res, accessToken); // will be saved automatically in the browser cookies
    // send response
    res.status(201).json({
        message: "You logged in successfully",
        user: {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
        },
    });
};

// ============== logout user ==============
const logoutUser = (req, res) => {
    // remove browser cookies if exist
    res.clearCookie("ITI_ACCESS_TOKEN", {
        httpOnly: true,
        sameSite: "Strict",
        path: "/",
    });
    // res
    res.status(200).json({
        message: "You logged out successfully",
    });
};

// ============== forget password ==============
const forgotPassword = async (req, res) => {
    // extract user's email
    const { email } = req.body;
    // ensure user exists with this email
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
        throw new AppError("No account with this email", 404);
    }
    // generate reset password token + hashed version
    const { resetPasswordToken, hashedResetPasswordToken } =
        generateResetPasswordToken(existingUser);
    // save the hashed token + expiry date in db
    existingUser.resetPasswordToken = hashedResetPasswordToken;
    existingUser.resetPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
    await existingUser.save();
    // send email to user with the original resetPasswordToken
    try {
        const resetUrl = `http://localhost:3000/api/auth/reset-password/${resetPasswordToken}`;
        await sendEmail({
            to: existingUser.email,
            subject: "ITI_MERN - Password Reset Request",
            html: template
                .replace("{{name}}", existingUser.username)
                .replace("{{link}}", resetUrl),
        });
    } catch (emailError) {
        // Clean up so the user can try again
        existingUser.resetPasswordToken = undefined;
        existingUser.resetPasswordExpiry = undefined;
        await existingUser.save();
        throw new AppError(
            "Failed to send reset email. Please try again.",
            500,
        );
    }
    // send response
    res.status(200).json({
        message: "Password reset instructions have been sent to your email",
    });
};

// ============== reset password ==============
const resetPassword = async (req, res) => {
    // get resetPasswordToken from params
    const { resetPasswordToken } = req.params;
    // get the newPassword from body
    const { newPassword } = req.body || {};
    
    if (!newPassword) {
        throw new AppError("New password is required", 400);
    }
    
    // search for a user with this resetPasswordToken and ensure token is not expired
    const hashedResetPasswordToken = crypto.createHash("sha256").update(resetPasswordToken).digest("hex");
    const existingUser = await UserModel.findOne({ 
        resetPasswordToken: hashedResetPasswordToken, 
        resetPasswordExpiry: { $gt: Date.now() } 
    });
    if (!existingUser) {
        throw new AppError("Invalid or expired reset password token", 400);
    }
    // update user's password + passwordChangedAt + remove resetPasswordToken and resetPasswordExpiry
    // the schema pre-save hook hashes the password once before saving
    existingUser.password = newPassword;
    existingUser.resetPasswordToken = undefined;
    existingUser.resetPasswordExpiry = undefined;
    existingUser.passwordChangedAt = Date.now();
    await existingUser.save();
    // send response
    res.status(200).json({
        message: "Your password has been reset successfully",
    });
};

export { createUser, loginUser, logoutUser, forgotPassword, resetPassword };
