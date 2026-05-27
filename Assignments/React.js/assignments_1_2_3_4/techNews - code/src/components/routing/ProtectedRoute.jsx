import { Navigate } from "react-router-dom";

function ProtectedRoute({
    isLoggedIn,
    role,
    allowedRole,
    redirectTo = "/login",
    children,
}) {
    if (!isLoggedIn) return <Navigate to={redirectTo} replace />;
    if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;
    return children;
}

export default ProtectedRoute;
