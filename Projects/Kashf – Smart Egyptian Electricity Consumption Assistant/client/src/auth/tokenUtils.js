import { USER_ROLES } from "./authConstants";

export const decodeJwtPayload = (token) => {
    try {
        const payloadSegment = token.split(".")[1];

        if (!payloadSegment) {
            return null;
        }

        const normalized = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
        const padded = normalized.padEnd(
            normalized.length + ((4 - (normalized.length % 4)) % 4),
            "="
        );

        return JSON.parse(atob(padded));
    } catch {
        return null;
    }
};

export const isAccessTokenValid = (token) => {
    if (!token || typeof token !== "string") {
        return false;
    }

    const trimmedToken = token.trim();

    if (!trimmedToken) {
        return false;
    }

    const payload = decodeJwtPayload(trimmedToken);

    if (!payload) {
        return true;
    }

    if (typeof payload.exp === "number") {
        return Date.now() < payload.exp * 1000;
    }

    return true;
};

export const getRoleFromToken = (token) => {
    const payload = decodeJwtPayload(token);

    if (payload?.role === USER_ROLES.ADMIN || payload?.role === USER_ROLES.USER) {
        return payload.role;
    }

    return null;
};
