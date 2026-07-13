import { AUTH_COOKIE_KEYS } from "../config/auth.constants.js";
import AppError from "../utils/AppError.js";
import { verifyAccessToken } from "../services/token.service.js";

const getAccessTokenFromRequest = (req) => {
    const cookieToken = req.cookies?.[AUTH_COOKIE_KEYS.ACCESS_TOKEN];

    if (cookieToken) {
        return cookieToken;
    }

    const authorization = req.headers.authorization;

    if (authorization?.startsWith("Bearer ")) {
        return authorization.slice(7);
    }

    return null;
};

const isAuthenticated = (req, res, next) => {
    try {
        const token = getAccessTokenFromRequest(req);

        if (!token) {
            return next(new AppError("Unauthorized.", 401));
        }

        const decoded = verifyAccessToken(token);
        req.user = {
            id: decoded.userId,
            role: decoded.role,
            sessionId: decoded.sessionId,
        };

        next();
    } catch {
        next(new AppError("Unauthorized.", 401));
    }
};

export default isAuthenticated;
