import jwt from "jsonwebtoken";
import { AUTH_COOKIE_KEYS, TOKEN_TYPES } from "../config/auth.constants.js";

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not configured.");
    }
    return secret;
};

const getRefreshSecret = () =>
    process.env.JWT_REFRESH_SECRET || getJwtSecret();

const assertTokenType = (decoded, expectedType) => {
    if (decoded.tokenType !== expectedType) {
        throw new Error("Invalid token type.");
    }
};

export const signAccessToken = (payload) =>
    jwt.sign({ ...payload, tokenType: TOKEN_TYPES.ACCESS }, getJwtSecret(), {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    });

export const signRefreshToken = (payload) =>
    jwt.sign(
        { ...payload, tokenType: TOKEN_TYPES.REFRESH },
        getRefreshSecret(),
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
        }
    );

export const verifyAccessToken = (token) => {
    const decoded = jwt.verify(token, getJwtSecret());
    assertTokenType(decoded, TOKEN_TYPES.ACCESS);
    return decoded;
};

export const verifyRefreshToken = (token) => {
    const decoded = jwt.verify(token, getRefreshSecret());
    assertTokenType(decoded, TOKEN_TYPES.REFRESH);
    return decoded;
};

export const signTemp2faToken = (payload) =>
    jwt.sign({ ...payload, tokenType: "temp_2fa" }, getJwtSecret(), {
        expiresIn: "5m",
    });

export const verifyTemp2faToken = (token) => {
    const decoded = jwt.verify(token, getJwtSecret());
    if (decoded.tokenType !== "temp_2fa") {
        throw new Error("Invalid token type.");
    }
    return decoded;
};

export const setAuthCookies = (res, { accessToken, refreshToken }) => {
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
        httpOnly: true,
        sameSite: "strict",
        secure: isProduction,
    };

    res.cookie(AUTH_COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
        ...cookieOptions,
        expires: new Date(Date.now() + 15 * 60 * 1000),   // 15 minutes
    });

    res.cookie(AUTH_COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
        ...cookieOptions,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),   // 7 days
    });
};

export const clearAuthCookies = (res) => {
    res.clearCookie(AUTH_COOKIE_KEYS.ACCESS_TOKEN);
    res.clearCookie(AUTH_COOKIE_KEYS.REFRESH_TOKEN);
};
