import "dotenv/config";
import mongoose from "mongoose";
import User from "./database/models/user.model.js";
import { signAccessToken } from "./src/services/token.service.js";

async function test() {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne();
    if (!user) {
        console.log("No user found");
        return;
    }
    const token = signAccessToken({
        userId: user._id.toString(),
        role: user.role,
        sessionId: "test"
    });
    
    console.log("Token:", token);
    
    // Fetch meters
    try {
        const res = await fetch("http://localhost:3000/api/meters", {
            headers: { Authorization: "Bearer " + token }
        });
        const text = await res.text();
        console.log("GET /api/meters:", res.status, text);
    } catch (e) {
        console.error("GET Error:", e);
    }
    
    // Create meter
    try {
        const res = await fetch("http://localhost:3000/api/meters", {
            method: "POST",
            headers: { 
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Test Meter " + Date.now(),
                number: "NUM" + Date.now(),
                type: "residential"
            })
        });
        const text = await res.text();
        console.log("POST /api/meters:", res.status, text);
    } catch (e) {
        console.error("POST Error:", e);
    }
    
    process.exit(0);
}

test();
