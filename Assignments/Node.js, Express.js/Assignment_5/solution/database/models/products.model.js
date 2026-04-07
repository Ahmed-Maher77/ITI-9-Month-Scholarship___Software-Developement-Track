import mongoose from "mongoose";

const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 300
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    publishedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true });                 // Add timestamps for createdAt and updatedAt


const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;