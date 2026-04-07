import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";


const isAuthenticated = async (req, res, next) => {
    // extract accessToken from headers or cookies
    let token;
    let authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];                    // shape of headers => "authorization": "Bearer <token>"
    }
    token = token || req.cookies?.ITI_ACCESS_TOKEN;
    if (!token) {
        throw new AppError("Unauthorized user! Missing access token", 401);
    }

    // verify token then extract user data
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
        throw new AppError("Unauthorized user! Invalid or expired access token", 401);
    }

    // append user data to req.user
    req.user = decoded;

    next();
}


export default isAuthenticated;