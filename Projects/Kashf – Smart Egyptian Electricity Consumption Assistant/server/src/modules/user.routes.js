import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import uploadProfilePicture from "../middlewares/uploadProfilePicture.js";
import { validateRequestBody } from "../middlewares/validateRequestBody.js";
import { loginSchema, signupSchema } from "./user.validation.js";
import * as userController from "./user.controller.js";

const router = Router();

router.post(
    "/register",
    uploadProfilePicture,
    validateRequestBody(signupSchema),
    userController.register
);
router.post("/login", validateRequestBody(loginSchema), userController.login);
router.post("/logout", userController.logout);
router.get("/me", isAuthenticated, userController.me);
router.patch(
    "/profile/picture",
    isAuthenticated,
    uploadProfilePicture,
    userController.updateProfilePicture
);
router.post("/refresh-token", userController.refreshToken);

// ─── New profile management routes ────────────────────────────────────────────
router.patch("/profile",       isAuthenticated, userController.updateProfile);
router.patch("/goals",         isAuthenticated, userController.updateGoals);
router.patch("/notifications", isAuthenticated, userController.updateNotifications);

// ─── Security Settings Routes ──────────────────────────────────────────────────
router.post("/security/change-password", isAuthenticated, userController.changePassword);
router.post("/security/2fa/setup",        isAuthenticated, userController.setup2fa);
router.post("/security/2fa/enable",       isAuthenticated, userController.enable2fa);
router.post("/security/2fa/disable",      isAuthenticated, userController.disable2fa);
router.post("/security/2fa/verify",       userController.verify2faLogin);
router.get("/security/devices",          isAuthenticated, userController.getSessions);
router.delete("/security/devices/:sessionId", isAuthenticated, userController.revokeSession);
router.get("/security/login-history",    isAuthenticated, userController.getLoginHistory);
router.post("/security/delete-account",  isAuthenticated, userController.deleteAccount);

export default router;

