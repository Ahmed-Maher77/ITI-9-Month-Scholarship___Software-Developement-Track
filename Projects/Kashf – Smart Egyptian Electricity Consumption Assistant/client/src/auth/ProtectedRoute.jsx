import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { AUTH_LOGIN_PATH, USER_ROLES } from "./authConstants";
import { ensureClientSession } from "./sessionCoordinator";
import {
    refreshSession,
    selectIsAuthenticated,
    selectUserRole,
} from "../store/auth/authSlice";

const ProtectedRoute = ({
    allowedRoles,
    redirectTo = AUTH_LOGIN_PATH,
    forbiddenRedirect = "/dashboard",
}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const role = useSelector(selectUserRole);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const verifySession = async () => {
            dispatch(refreshSession());

            const hasValidSession = await ensureClientSession();

            if (hasValidSession) {
                dispatch(refreshSession());
            }

            if (isMounted) {
                setIsChecking(false);
            }
        };

        verifySession();

        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    if (isChecking) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={redirectTo}
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    if (allowedRoles?.length > 0 && !allowedRoles.includes(role)) {
        const fallback =
            role === USER_ROLES.ADMIN ? "/admin/dashboard" : forbiddenRedirect;

        return <Navigate to={fallback} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
