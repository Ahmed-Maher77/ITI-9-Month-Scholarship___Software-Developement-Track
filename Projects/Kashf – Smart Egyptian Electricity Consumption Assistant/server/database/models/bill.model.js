import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        meter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meter",
            required: false, // Optional for now
        },
        billId: {
            type: String,
            required: true,
            unique: true,
            default: () => `INV-${new Date().getFullYear().toString().substr(-2)}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
        },
        month: {
            type: String, // e.g. "January 2026", "2026-05"
            required: true,
        },
        consumption: {
            type: Number,
            required: true,
            min: 0,
        },
        tier: {
            type: Number,
            required: true,
            min: 1,
            max: 7,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["paid", "pending", "overdue"],
            default: "pending",
        },
        dueDate: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

export default Bill;
