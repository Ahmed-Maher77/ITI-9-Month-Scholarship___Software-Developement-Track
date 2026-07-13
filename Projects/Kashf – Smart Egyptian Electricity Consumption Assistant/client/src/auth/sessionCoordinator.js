import { requestRefreshToken } from "../services/refreshTokenService";
import { store } from "../store";
import { login, logout } from "../store/auth/authSlice";
import { getAccessToken } from "./authStorage";
import { isAccessTokenValid } from "./tokenUtils";

let inflightRefresh = null;

export const attemptTokenRefresh = async () => {
    if (inflightRefresh) {
        return inflightRefresh;
    }

    inflightRefresh = requestRefreshToken()
        .then((data) => {
            if (data?.expired) {
                store.dispatch(logout());
                return false;
            }

            const accessToken = data?.data?.accessToken;

            if (!accessToken) {
                throw new Error("missing_token");
            }

            store.dispatch(login({ accessToken }));
            return true;
        })
        .catch(() => {
            store.dispatch(logout());
            return false;
        })
        .finally(() => {
            inflightRefresh = null;
        });

    return inflightRefresh;
};

export const ensureClientSession = async () => {
    const token = getAccessToken();

    if (token && isAccessTokenValid(token)) {
        return true;
    }

    return attemptTokenRefresh();
};
