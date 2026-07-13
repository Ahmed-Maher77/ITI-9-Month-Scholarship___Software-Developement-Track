import bcrypt from "bcryptjs";
import User from "../../database/models/user.model.js";
import Session from "../../database/models/session.model.js";
import Activity from "../../database/models/activity.model.js";
import { USER_ROLES, SUBSCRIPTION_PLANS, DEFAULT_SUBSCRIPTION_PLAN } from "../config/auth.constants.js";
import { ACTIVITY_TYPES } from "../config/activity.constants.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../config/cloudinary.js";
import AppError from "../utils/AppError.js";
import { toPublicUser } from "../utils/userMapper.js";
import { checkUserSubscription } from "./subscription.service.js";
import { generateSecret, verifyTOTP } from "../utils/totp.js";
import {
    clearAuthCookies,
    setAuthCookies,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    signTemp2faToken,
    verifyTemp2faToken,
} from "./token.service.js";
import { logActivity } from "./activity.service.js";

const SALT_ROUNDS = 10;

const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);

const comparePassword = (password, hash) => bcrypt.compare(password, hash);

const buildTokens = (user, sessionId) => {
    const payload = {
        userId: user._id.toString(),
        role: user.role,
        sessionId: sessionId ? sessionId.toString() : undefined
    };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return { accessToken, refreshToken };
};

export const register = async ({ body, file, res, ip, userAgent }) => {
    const { username, email, password } = body;

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        throw new AppError("Email or username already in use.", 409);
    }

    let pictureUrl = null;

    if (file) {
        pictureUrl = await uploadToCloudinary(file.buffer);
    }

    try {
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: USER_ROLES.USER,
            subscriptionPlan: DEFAULT_SUBSCRIPTION_PLAN,
            picture: pictureUrl,
        });

        // Create initial session
        const session = await Session.create({
            userId: user._id,
            ip: ip || "127.0.0.1",
            userAgent: userAgent || "Unknown Device",
        });

        const { accessToken, refreshToken } = buildTokens(user, session._id);
        setAuthCookies(res, { accessToken, refreshToken });

        // Log registration activity (non-blocking)
        logActivity(user._id, ACTIVITY_TYPES.REGISTER, { ip, userAgent });

        return {
            user: toPublicUser(user),
            accessToken,
        };
    } catch (error) {
        if (pictureUrl) {
            await deleteFromCloudinary(pictureUrl);
        }
        throw error;
    }
};

export const login = async ({ body, res, ip, userAgent }) => {
    const { email, password } = body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new AppError("Invalid email or password.", 401);
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new AppError("Invalid email or password.", 401);
    }

    // 2FA check
    if (user.twoFactorEnabled) {
        const tempToken = signTemp2faToken({
            userId: user._id.toString(),
            ip: ip || "127.0.0.1",
            userAgent: userAgent || "Unknown Device",
        });
        return {
            twoFactorRequired: true,
            tempToken,
        };
    }

    // Standard login - create session
    const session = await Session.create({
        userId: user._id,
        ip: ip || "127.0.0.1",
        userAgent: userAgent || "Unknown Device",
    });

    const { accessToken, refreshToken } = buildTokens(user, session._id);
    setAuthCookies(res, { accessToken, refreshToken });

    // Log login activity (non-blocking)
    logActivity(user._id, ACTIVITY_TYPES.LOGIN, { ip, userAgent });

    return {
        user: toPublicUser(user),
        accessToken,
    };
};

export const verify2faLogin = async ({ code, tempToken, res }) => {
    if (!tempToken) {
        throw new AppError("Temp token is required.", 400);
    }
    if (!code) {
        throw new AppError("2FA code is required.", 400);
    }

    let decoded;
    try {
        decoded = verifyTemp2faToken(tempToken);
    } catch {
        throw new AppError("Invalid or expired 2FA session.", 401);
    }

    const user = await User.findById(decoded.userId).select("+twoFactorSecret");
    if (!user || !user.twoFactorSecret) {
        throw new AppError("2FA setup is incomplete.", 400);
    }

    const isVerified = verifyTOTP(code, user.twoFactorSecret);
    if (!isVerified) {
        throw new AppError("Invalid 2FA code.", 401);
    }

    // Valid code, create session
    const session = await Session.create({
        userId: user._id,
        ip: decoded.ip || "127.0.0.1",
        userAgent: decoded.userAgent || "Unknown Device",
    });

    const { accessToken, refreshToken } = buildTokens(user, session._id);
    setAuthCookies(res, { accessToken, refreshToken });

    // Log login activity (non-blocking)
    logActivity(user._id, ACTIVITY_TYPES.LOGIN, { ip: decoded.ip, userAgent: decoded.userAgent });

    return {
        user: toPublicUser(user),
        accessToken,
    };
};

export const logout = async ({ res, userId, sessionId }) => {
    clearAuthCookies(res);
    if (sessionId) {
        await Session.findByIdAndDelete(sessionId);
    }
    if (userId) logActivity(userId, ACTIVITY_TYPES.LOGOUT);
};

export const refreshToken = async ({ refreshTokenValue, res }) => {
    if (!refreshTokenValue) {
        throw new AppError("Refresh token is required.", 401);
    }

    let decoded;

    try {
        decoded = verifyRefreshToken(refreshTokenValue);
    } catch {
        throw new AppError("Invalid or expired refresh token.", 401);
    }

    // Verify session still exists
    if (decoded.sessionId) {
        const session = await Session.findById(decoded.sessionId);
        if (!session) {
            throw new AppError("Session has been revoked or expired.", 401);
        }
        // Update lastActive
        session.lastActive = new Date();
        await session.save();
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
        throw new AppError("Invalid refresh token.", 401);
    }

    await checkUserSubscription(user);

    const { accessToken, refreshToken: newRefreshToken } = buildTokens(user, decoded.sessionId);
    setAuthCookies(res, { accessToken, refreshToken: newRefreshToken });

    return { accessToken };
};

export const getMe = async ({ userId }) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    await checkUserSubscription(user);

    return toPublicUser(user);
};

export const updateProfilePicture = async ({ userId, file }) => {
    if (!file) {
        throw new AppError("Profile picture is required.", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    const previousPicture = user.picture;
    const pictureUrl = await uploadToCloudinary(file.buffer);

    try {
        user.picture = pictureUrl;
        await user.save();

        if (previousPicture) {
            await deleteFromCloudinary(previousPicture);
        }

        logActivity(userId, ACTIVITY_TYPES.PICTURE_UPDATED);

        return toPublicUser(user);
    } catch (error) {
        await deleteFromCloudinary(pictureUrl);
        throw error;
    }
};

// ─── Edit Profile ──────────────────────────────────────────────────────────────

export const updateProfile = async ({ userId, body }) => {
    const { username, phone, governorate, preferredLanguage } = body;

    // Check username uniqueness if being changed
    if (username) {
        const existing = await User.findOne({ username, _id: { $ne: userId } });
        if (existing) {
            throw new AppError("Username is already taken.", 409);
        }
    }

    const updates = {};
    if (username          !== undefined) updates.username          = username;
    if (phone             !== undefined) updates.phone             = phone || null;
    if (governorate       !== undefined) updates.governorate       = governorate || null;
    if (preferredLanguage !== undefined) updates.preferredLanguage = preferredLanguage;

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
    );

    if (!user) throw new AppError("User not found.", 404);

    logActivity(userId, ACTIVITY_TYPES.PROFILE_UPDATED);

    return toPublicUser(user);
};

// ─── Consumption Goals ─────────────────────────────────────────────────────────

export const updateGoals = async ({ userId, goals }) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { $set: { consumptionGoals: goals } },
        { new: true, runValidators: true }
    );

    if (!user) throw new AppError("User not found.", 404);

    logActivity(userId, ACTIVITY_TYPES.GOALS_UPDATED);

    return toPublicUser(user);
};

// ─── Notification Preferences ──────────────────────────────────────────────────

export const updateNotificationPrefs = async ({ userId, prefs }) => {
    // Build a $set object with only the provided keys
    const setFields = {};
    for (const [key, value] of Object.entries(prefs)) {
        setFields[`notificationPreferences.${key}`] = value;
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: setFields },
        { new: true, runValidators: true }
    );

    if (!user) throw new AppError("User not found.", 404);

    logActivity(userId, ACTIVITY_TYPES.NOTIFICATION_PREFS_UPDATED);

    return toPublicUser(user);
};

// ─── Security Settings Endpoints ───────────────────────────────────────────────

export const changePassword = async ({ userId, currentPassword, newPassword, sessionId }) => {
    const user = await User.findById(userId).select("+password");
    if (!user) {
        throw new AppError("User not found.", 404);
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
        throw new AppError("Incorrect current password.", 400);
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    // Revoke all OTHER sessions
    await Session.deleteMany({ userId, _id: { $ne: sessionId } });

    logActivity(userId, "password_changed");
};

export const setup2fa = async ({ userId }) => {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found.", 404);

    const secret = generateSecret();
    user.twoFactorSecret = secret;
    await user.save();

    return { secret };
};

export const enable2fa = async ({ userId, code }) => {
    const user = await User.findById(userId).select("+twoFactorSecret");
    if (!user || !user.twoFactorSecret) {
        throw new AppError("Two-factor authentication secret is not set up.", 400);
    }

    const isVerified = verifyTOTP(code, user.twoFactorSecret);
    if (!isVerified) {
        throw new AppError("Invalid verification code.", 400);
    }

    user.twoFactorEnabled = true;
    await user.save();

    logActivity(userId, "two_factor_enabled");
    return { success: true };
};

export const disable2fa = async ({ userId, password }) => {
    const user = await User.findById(userId).select("+password");
    if (!user) {
        throw new AppError("User not found.", 404);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new AppError("Incorrect password.", 400);
    }

    user.twoFactorEnabled = false;
    user.twoFactorSecret = null;
    await user.save();

    logActivity(userId, "two_factor_disabled");
    return { success: true };
};

export const getSessions = async ({ userId, ip, userAgent }) => {
    let sessions = await Session.find({ userId }).sort({ lastActive: -1 }).lean();
    if (sessions.length === 0) {
        const newSession = await Session.create({
            userId,
            ip: ip || "127.0.0.1",
            userAgent: userAgent || "Unknown Device",
        });
        sessions = [newSession.toObject()];
    }
    return sessions;
};

export const revokeSession = async ({ userId, sessionIdToRevoke }) => {
    const session = await Session.findOne({ _id: sessionIdToRevoke, userId });
    if (!session) {
        throw new AppError("Session not found or unauthorized.", 404);
    }
    await session.deleteOne();
    return { success: true };
};

export const getLoginHistory = async ({ userId }) => {
    return await Activity.find({ userId, type: ACTIVITY_TYPES.LOGIN })
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();
};

export const deleteAccount = async ({ userId, password, res }) => {
    const user = await User.findById(userId).select("+password");
    if (!user) {
        throw new AppError("User not found.", 404);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new AppError("Incorrect password.", 400);
    }

    // Clean up
    if (user.picture) {
        try {
            await deleteFromCloudinary(user.picture);
        } catch (err) {
            console.error("Failed to delete user profile picture from Cloudinary:", err.message);
        }
    }

    await Session.deleteMany({ userId });
    await Activity.deleteMany({ userId });
    await user.deleteOne();

    clearAuthCookies(res);

    return { success: true };
};

export const hashPasswordForSeed = hashPassword;
