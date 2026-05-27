import { Navigate, Outlet } from "react-router-dom";

function RequireRole({ role, allowedRole }) {
    if (role !== allowedRole) return <Navigate to="/" replace />;
    return <Outlet />;
}

export default RequireRole;
