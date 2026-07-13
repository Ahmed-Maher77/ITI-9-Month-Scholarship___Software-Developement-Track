import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
    POST_REGISTER_REDIRECT_PATH,
    USER_ROLES,
} from "./authConstants";
import { selectIsAuthenticated, selectUserRole } from "../store/auth/authSlice";

const GuestRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const role = useSelector(selectUserRole);

    if (!isAuthenticated) {
        return children;
    }

    const destination =
        role === USER_ROLES.ADMIN
            ? "/admin/dashboard"
            : POST_REGISTER_REDIRECT_PATH;

    return <Navigate to={destination} replace />;
};

export default GuestRoute;
