import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ isLoggedIn }) {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return <Outlet />;
}

export default RequireAuth;
