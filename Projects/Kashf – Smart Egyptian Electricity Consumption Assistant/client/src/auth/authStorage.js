import Cookies from "js-cookie";
import { AUTH_STORAGE_KEYS, USER_ROLES } from "./authConstants";
import { normalizeUserProfile } from "./userProfile";
import { getRoleFromToken, isAccessTokenValid } from "./tokenUtils";

const COOKIE_OPTIONS = {
    sameSite: "strict",
    secure: import.meta.env.PROD,
    expires: 7,
};

export const getAccessToken = () => {
    return Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN) ?? null;
};

export const setAccessToken = (token) => {
    if (token) {
        Cookies.set(AUTH_STORAGE_KEYS.ACCESS_TOKEN, token, COOKIE_OPTIONS);
    } else {
        Cookies.remove(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    }
};

export const getStoredUserRole = () => {
    return Cookies.get(AUTH_STORAGE_KEYS.USER_ROLE) ?? null;
};

export const setUserRole = (role) => {
    if (role) {
        Cookies.set(AUTH_STORAGE_KEYS.USER_ROLE, role, COOKIE_OPTIONS);
    } else {
        Cookies.remove(AUTH_STORAGE_KEYS.USER_ROLE);
    }
};

const readStoredUserProfile = () => {
    const rawProfile = Cookies.get(AUTH_STORAGE_KEYS.USER_PROFILE);

    if (!rawProfile) {
        return null;
    }

    try {
        const profile = normalizeUserProfile(JSON.parse(rawProfile));
        return profile;
    } catch {
        return null;
    }
};

export const setUserProfile = (user) => {
    const profile = normalizeUserProfile(user);

    if (profile) {
        Cookies.set(
            AUTH_STORAGE_KEYS.USER_PROFILE,
            JSON.stringify(profile),
            COOKIE_OPTIONS
        );
    } else {
        Cookies.remove(AUTH_STORAGE_KEYS.USER_PROFILE);
    }
};

export const resolveUserRole = (token, explicitRole) => {
    if (explicitRole === USER_ROLES.ADMIN || explicitRole === USER_ROLES.USER) {
        return explicitRole;
    }

    const roleFromToken = getRoleFromToken(token);
    if (roleFromToken) {
        return roleFromToken;
    }

    const storedRole = getStoredUserRole();
    if (storedRole === USER_ROLES.ADMIN || storedRole === USER_ROLES.USER) {
        return storedRole;
    }

    return USER_ROLES.USER;
};

export const readAuthSession = () => {
    const accessToken = getAccessToken();

    if (!accessToken || !isAccessTokenValid(accessToken)) {
        return {
            accessToken: null,
            role: null,
            user: null,
            isAuthenticated: false,
        };
    }

    const role = resolveUserRole(accessToken);

    return {
        accessToken,
        role,
        user: readStoredUserProfile(),
        isAuthenticated: true,
    };
};

export const persistAuthSession = ({ accessToken, role, user }) => {
    setAccessToken(accessToken);
    setUserRole(resolveUserRole(accessToken, role));

    if (user) {
        setUserProfile(user);
    }

    return readAuthSession();
};

export const clearAuthSession = () => {
    setAccessToken(null);
    setUserRole(null);
    setUserProfile(null);
};

export const getAuthorizationHeader = () => {
    const token = getAccessToken();

    if (!token || !isAccessTokenValid(token)) {
        return {};
    }

    return { Authorization: `Bearer ${token}` };
};
