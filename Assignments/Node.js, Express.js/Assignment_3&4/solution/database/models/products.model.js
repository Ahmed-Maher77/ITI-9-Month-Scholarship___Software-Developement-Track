import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [200, "Name must be less than 200 characters long"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be a positive number"],
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "categories",
            required: [true, "Category is required"],
        },
    },
    { timestamps: true },
);

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
