import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_ROLES } from "../auth/authConstants";
import { readAuthSession } from "../auth/authStorage";
import {
    login as loginAction,
    logout as logoutAction,
    refreshSession as refreshSessionAction,
    selectAccessToken,
    selectAuth,
    selectIsAdmin,
    selectIsAuthenticated,
    selectUser,
    selectUserRole,
} from "../store/auth/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const role = useSelector(selectUserRole);
    const accessToken = useSelector(selectAccessToken);
    const user = useSelector(selectUser);
    const isAdmin = useSelector(selectIsAdmin);

    const login = useCallback(
        ({
            accessToken: token,
            role: userRole = USER_ROLES.USER,
            user: profile = null,
        }) => {
            dispatch(
                loginAction({
                    accessToken: token,
                    role: userRole,
                    user: profile,
                })
            );
            return readAuthSession();
        },
        [dispatch]
    );

    const logout = useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);

    const refreshSession = useCallback(() => {
        dispatch(refreshSessionAction());
        return readAuthSession();
    }, [dispatch]);

    return {
        accessToken,
        role,
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        refreshSession,
    };
};

export const useAuthState = () => useSelector(selectAuth);
