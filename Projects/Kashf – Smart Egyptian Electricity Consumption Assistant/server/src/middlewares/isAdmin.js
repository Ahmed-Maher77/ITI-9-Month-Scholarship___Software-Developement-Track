import { USER_ROLES } from "../config/auth.constants.js";
import AppError from "../utils/AppError.js";

const isAdmin = (req, res, next) => {
    if (!req.user) {
        return next(new AppError("Unauthorized.", 401));
    }

    if (req.user.role !== USER_ROLES.ADMIN) {
        return next(new AppError("Forbidden. Admin access required.", 403));
    }

    next();
};

export default isAdmin;
