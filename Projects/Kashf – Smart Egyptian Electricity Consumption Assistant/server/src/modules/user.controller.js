import { AUTH_COOKIE_KEYS } from "../config/auth.constants.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import * as authService from "../services/auth.service.js";

const register = asyncHandler(async (req, res) => {
    const result = await authService.register({
        body: req.body,
        file: req.file,
        res,
        ip: req.ip || req.headers['x-forwarded-for'] || "127.0.0.1",
        userAgent: req.headers['user-agent'] || "Unknown Device",
    });

    res.status(201).json({
        success: true,
        data: {
            user: result.user,
            accessToken: result.accessToken,
        },
    });
});

const login = asyncHandler(async (req, res) => {
    const result = await authService.login({
        body: req.body,
        res,
        ip: req.ip || req.headers['x-forwarded-for'] || "127.0.0.1",
        userAgent: req.headers['user-agent'] || "Unknown Device",
    });

    if (result.twoFactorRequired) {
        return res.status(200).json({
            success: true,
            data: {
                twoFactorRequired: true,
                tempToken: result.tempToken,
            },
        });
    }

    res.status(200).json({
        success: true,
        data: {
            user: result.user,
            accessToken: result.accessToken,
        },
    });
});

const logout = asyncHandler(async (req, res) => {
    await authService.logout({
        res,
        userId: req.user?.id,
        sessionId: req.user?.sessionId,
    });

    res.status(200).json({ success: true, message: "Logged out successfully." });
});

const refreshToken = asyncHandler(async (req, res) => {
    const refreshTokenValue = req.cookies?.[AUTH_COOKIE_KEYS.REFRESH_TOKEN];

    const result = await authService.refreshToken({
        refreshTokenValue,
        res,
    });

    res.status(200).json({
        success: true,
        data: {
            accessToken: result.accessToken,
        },
    });
});

const me = asyncHandler(async (req, res) => {
    const user = await authService.getMe({ userId: req.user.id });

    res.status(200).json({
        success: true,
        data: { user },
    });
});

const updateProfilePicture = asyncHandler(async (req, res) => {
    const user = await authService.updateProfilePicture({
        userId: req.user.id,
        file: req.file,
    });

    res.status(200).json({
        success: true,
        data: { user },
    });
});

const updateProfile = asyncHandler(async (req, res) => {
    const user = await authService.updateProfile({
        userId: req.user.id,
        body: req.body,
    });

    res.status(200).json({ success: true, data: { user } });
});

const updateGoals = asyncHandler(async (req, res) => {
    const user = await authService.updateGoals({
        userId: req.user.id,
        goals: req.body,
    });

    res.status(200).json({ success: true, data: { user } });
});

const updateNotifications = asyncHandler(async (req, res) => {
    const user = await authService.updateNotificationPrefs({
        userId: req.user.id,
        prefs: req.body,
    });

    res.status(200).json({ success: true, data: { user } });
});

const verify2faLogin = asyncHandler(async (req, res) => {
    const result = await authService.verify2faLogin({
        code: req.body.code,
        tempToken: req.body.tempToken,
        res,
    });

    res.status(200).json({
        success: true,
        data: {
            user: result.user,
            accessToken: result.accessToken,
        },
    });
});

const changePassword = asyncHandler(async (req, res) => {
    await authService.changePassword({
        userId: req.user.id,
        currentPassword: req.body.currentPassword,
        newPassword: req.body.newPassword,
        sessionId: req.user.sessionId,
    });

    res.status(200).json({ success: true, message: "Password changed successfully." });
});

const setup2fa = asyncHandler(async (req, res) => {
    const result = await authService.setup2fa({ userId: req.user.id });

    res.status(200).json({ success: true, data: result });
});

const enable2fa = asyncHandler(async (req, res) => {
    const result = await authService.enable2fa({
        userId: req.user.id,
        code: req.body.code,
    });

    res.status(200).json({ success: true, data: result });
});

const disable2fa = asyncHandler(async (req, res) => {
    const result = await authService.disable2fa({
        userId: req.user.id,
        password: req.body.password,
    });

    res.status(200).json({ success: true, data: result });
});

const getSessions = asyncHandler(async (req, res) => {
    const sessions = await authService.getSessions({
        userId: req.user.id,
        ip: req.ip || req.headers['x-forwarded-for'] || "127.0.0.1",
        userAgent: req.headers['user-agent'] || "Unknown Device",
    });

    res.status(200).json({ success: true, data: { sessions } });
});

const revokeSession = asyncHandler(async (req, res) => {
    const result = await authService.revokeSession({
        userId: req.user.id,
        sessionIdToRevoke: req.params.sessionId,
    });

    res.status(200).json({ success: true, data: result });
});

const getLoginHistory = asyncHandler(async (req, res) => {
    const history = await authService.getLoginHistory({ userId: req.user.id });

    res.status(200).json({ success: true, data: { history } });
});

const deleteAccount = asyncHandler(async (req, res) => {
    const result = await authService.deleteAccount({
        userId: req.user.id,
        password: req.body.password,
        res,
    });

    res.status(200).json({ success: true, data: result });
});

export {
    register,
    login,
    logout,
    refreshToken,
    me,
    updateProfilePicture,
    updateProfile,
    updateGoals,
    updateNotifications,
    verify2faLogin,
    changePassword,
    setup2fa,
    enable2fa,
    disable2fa,
    getSessions,
    revokeSession,
    getLoginHistory,
    deleteAccount
};
