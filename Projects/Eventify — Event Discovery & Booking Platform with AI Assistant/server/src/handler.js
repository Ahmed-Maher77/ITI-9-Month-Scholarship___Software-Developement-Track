import "./config/env.js";
import connectDB from "./config/db.js";
import app from "./app.js";

let isDbConnected = false;

/** Shared serverless handler (Vercel api/index.js). */
export default async function handler(req, res) {
    try {
        if (!isDbConnected) {
            await connectDB();
            isDbConnected = true;
        }

        return app(req, res);
    } catch (error) {
        console.error("Serverless handler error:", error);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message:
                    process.env.NODE_ENV === "production"
                        ? "Internal server error"
                        : error.message,
            });
        }
    }
}
