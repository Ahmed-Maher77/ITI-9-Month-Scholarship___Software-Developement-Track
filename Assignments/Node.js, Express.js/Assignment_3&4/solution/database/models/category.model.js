import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true },
);

const CategoryModel = mongoose.model("categories", categorySchema);

export default CategoryModel;
