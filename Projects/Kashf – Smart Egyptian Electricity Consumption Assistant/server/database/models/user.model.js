import mongoose from "mongoose";
import { USER_ROLES, SUBSCRIPTION_PLANS, DEFAULT_SUBSCRIPTION_PLAN } from "../../src/config/auth.constants.js";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: [USER_ROLES.USER, USER_ROLES.ADMIN],
            default: USER_ROLES.USER,
        },
        subscriptionPlan: {
            type: String,
            enum: Object.values(SUBSCRIPTION_PLANS),
            default: DEFAULT_SUBSCRIPTION_PLAN,
        },
        subscriptionRenewalDate: {
            type: Date,
            default: null,
        },
        stripeCustomerId: {
            type: String,
            default: null,
        },
        hasPaymentMethod: {
            type: Boolean,
            default: false,
        },
        picture: {
            type: String,
            default: null,
        },
        // ─── Coin System ───────────────────────────────────────────────────
        coins: {
            type: Number,
            default: 50, // Free plan default
            min: 0,
        },
        rolloverCoins: {
            type: Number,
            default: 0,
            min: 0,
        },
        lastCoinResetDate: {
            type: Date,
            default: Date.now,
        },
        // ─── Profile extras ────────────────────────────────────────────────
        phone: {
            type: String,
            default: null,
            trim: true,
        },
        governorate: {
            type: String,
            default: null,
            trim: true,
        },
        preferredLanguage: {
            type: String,
            enum: ["ar", "en"],
            default: "ar",
        },
        // ─── Consumption goals ─────────────────────────────────────────────
        consumptionGoals: {
            monthlyKwhLimit: { type: Number, default: 400, min: 50, max: 2000 },
            targetBillEgp:   { type: Number, default: 700, min: 10, max: 5000 },
            targetSheriha:   { type: Number, default: 4,   min: 1,  max: 6   },
        },
        // ─── Notification preferences ──────────────────────────────────────
        notificationPreferences: {
            sherihaWarning:     { type: Boolean, default: true  },
            billForecast:       { type: Boolean, default: true  },
            aiRecommendations:  { type: Boolean, default: true  },
            monthlyReports:     { type: Boolean, default: false },
            pushNotifications:  { type: Boolean, default: true  },
            emailNotifications: { type: Boolean, default: true  },
            smsNotifications:   { type: Boolean, default: false },
        },
        // ─── Admin fields ──────────────────────────────────────────────────
        isActive: {
            type: Boolean,
            default: true,
        },
        // ─── Security fields ───────────────────────────────────────────────
        twoFactorEnabled: {
            type: Boolean,
            default: false,
        },
        twoFactorSecret: {
            type: String,
            select: false,
            default: null,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

