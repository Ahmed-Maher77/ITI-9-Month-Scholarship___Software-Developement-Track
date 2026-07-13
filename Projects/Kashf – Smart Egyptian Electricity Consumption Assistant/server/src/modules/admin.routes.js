import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
    getDashboardStats,
    getRecentUsers,
    getUsers,
    toggleUserStatus,
    deleteUser,
    getDevices,
    updateDeviceStatus,
    deleteDevice,
    getTiers,
    updateTier,
    getNotifications,
    createNotification,
    deleteNotification,
    getSettings,
    updateSettings,
} from "./admin.controller.js";

const router = Router();

router.get("/health", isAuthenticated, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            status: "ok",
            userId: req.user.id,
            role: req.user.role,
        },
    });
});

router.get("/dashboard/stats", isAuthenticated, isAdmin, getDashboardStats);
router.get("/users/recent", isAuthenticated, isAdmin, getRecentUsers);
router.get("/users", isAuthenticated, isAdmin, getUsers);
router.patch("/users/:userId/status", isAuthenticated, isAdmin, toggleUserStatus);
router.delete("/users/:userId", isAuthenticated, isAdmin, deleteUser);
router.get("/devices", isAuthenticated, isAdmin, getDevices);
router.patch("/devices/:deviceId/status", isAuthenticated, isAdmin, updateDeviceStatus);
router.delete("/devices/:deviceId", isAuthenticated, isAdmin, deleteDevice);
router.get("/tiers", isAuthenticated, isAdmin, getTiers);
router.patch("/tiers/:tierId", isAuthenticated, isAdmin, updateTier);
router.get("/notifications", isAuthenticated, isAdmin, getNotifications);
router.post("/notifications", isAuthenticated, isAdmin, createNotification);
router.delete("/notifications/:notificationId", isAuthenticated, isAdmin, deleteNotification);
router.get("/settings", isAuthenticated, isAdmin, getSettings);
router.patch("/settings", isAuthenticated, isAdmin, updateSettings);

export default router;
