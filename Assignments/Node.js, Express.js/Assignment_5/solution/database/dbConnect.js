import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("MongoDB connected successfully");
        return true;
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        return false;
    }
};


export default connectDB;
