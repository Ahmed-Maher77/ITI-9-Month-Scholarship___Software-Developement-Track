import AppError from "../utils/AppError.js";

function isAuthorized(roles) {
    return (req, res, next) => {
        // ensure user exists in req.user (set by isAuthenticated middleware)
        if (!req.user) {
            throw new AppError("Not authorized to access this resource", 401);
        }
        // extract user role from req.user
        const role = req.user.role;
        
        // ensure user role is in the allowed roles
        if (!role || !roles.includes(role)) {
            throw new AppError("Forbidden! You don't have permission to access this resource", 403);
        }
        next();
    }
}


export default isAuthorized;