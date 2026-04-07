import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    },
    resetPasswordToken: {
        type: String,
        default: undefined
    },
    resetPasswordExpiry: {
        type: Date,
        default: undefined
    },
    passwordChangedAt: {
        type: Date,
        default: undefined
    }
}, { timestamps: true });                 // Add timestamps for createdAt and updatedAt


// Document Middleware to hash password before saving
userSchema.pre("save", async function(next) {
    if (!this.isModified("password"))
        return;
    this.password = await bcrypt.hash(this.password, 10);
});


const UserModel = mongoose.model("User", userSchema);

export default UserModel;