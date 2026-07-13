import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../../database/models/user.model.js";
import Meter from "../../database/models/meter.model.js";
import Bill from "../../database/models/bill.model.js";
import Activity from "../../database/models/activity.model.js";
import Tier from "../../database/models/tier.model.js";
import Alert from "../../database/models/alert.model.js";
import SystemConfig from "../../database/models/systemConfig.model.js";

const getDashboardStats = asyncHandler(async (req, res) => {
    const [totalUsers, totalDevices, totalBills, activeMeters] = await Promise.all([
        User.countDocuments({ role: "user" }),
        Meter.countDocuments(),
        Bill.countDocuments(),
        Meter.countDocuments({ status: "active" }),
    ]);

    const activeRate = totalDevices > 0 ? Math.round((activeMeters / totalDevices) * 100) : 100;

    res.json({
        success: true,
        data: {
            totalUsers,
            totalDevices,
            totalBills,
            activeRate,
        },
    });
});

const getRecentUsers = asyncHandler(async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit, 10) || 5, 50);

    const users = await User.find({ role: "user" })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select("username email createdAt")
        .lean();

    res.json({
        success: true,
        data: users,
    });
});

const getUsers = asyncHandler(async (req, res) => {
    const { search, page = 1, limit = 20, status } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const pageLimit = Math.min(parseInt(limit, 10), 100);

    const filter = { role: "user" };

    if (search) {
        const regex = new RegExp(search, "i");
        filter.$or = [
            { username: regex },
            { email: regex },
            { phone: regex },
        ];
    }

    if (status === "active") filter.isActive = true;
    if (status === "disabled") filter.isActive = false;

    const [users, total] = await Promise.all([
        User.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageLimit)
            .select("username email role isActive subscriptionPlan createdAt")
            .lean(),
        User.countDocuments(filter),
    ]);

    res.json({
        success: true,
        data: {
            users,
            pagination: {
                page: parseInt(page, 10),
                limit: pageLimit,
                total,
                totalPages: Math.ceil(total / pageLimit),
            },
        },
    });
});

const toggleUserStatus = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
        return res.status(400).json({ success: false, message: "isActive must be a boolean." });
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { isActive },
        { new: true }
    ).select("username email isActive");

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
    }

    res.json({ success: true, data: { user } });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
    }

    await Promise.all([
        Meter.deleteMany({ user: userId }),
        Bill.deleteMany({ user: userId }),
        Activity.deleteMany({ userId }),
    ]);

    res.json({ success: true, message: "User and associated data deleted." });
});

const getDevices = asyncHandler(async (req, res) => {
    const { search, page = 1, limit = 20, status } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const pageLimit = Math.min(parseInt(limit, 10), 100);

    const filter = {};

    if (search) {
        const regex = new RegExp(search, "i");
        filter.$or = [
            { name: regex },
            { number: regex },
        ];
    }

    if (status) filter.status = status;

    const [devices, total] = await Promise.all([
        Meter.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageLimit)
            .populate("user", "username email")
            .lean(),
        Meter.countDocuments(filter),
    ]);

    res.json({
        success: true,
        data: {
            devices,
            pagination: {
                page: parseInt(page, 10),
                limit: pageLimit,
                total,
                totalPages: Math.ceil(total / pageLimit),
            },
        },
    });
});

const updateDeviceStatus = asyncHandler(async (req, res) => {
    const { deviceId } = req.params;
    const { status } = req.body;

    const valid = ["active", "standby", "inactive", "maintenance"];
    if (!valid.includes(status)) {
        return res.status(400).json({ success: false, message: `Status must be one of: ${valid.join(", ")}` });
    }

    const device = await Meter.findByIdAndUpdate(
        deviceId,
        { status },
        { new: true }
    ).populate("user", "username email");

    if (!device) {
        return res.status(404).json({ success: false, message: "Device not found." });
    }

    res.json({ success: true, data: { device } });
});

const deleteDevice = asyncHandler(async (req, res) => {
    const { deviceId } = req.params;

    const device = await Meter.findByIdAndDelete(deviceId);

    if (!device) {
        return res.status(404).json({ success: false, message: "Device not found." });
    }

    res.json({ success: true, message: "Device deleted." });
});

const getTiers = asyncHandler(async (req, res) => {
    const tiers = await Tier.find().sort({ tier: 1 }).lean();

    res.json({ success: true, data: { tiers } });
});

const updateTier = asyncHandler(async (req, res) => {
    const { tierId } = req.params;
    const { threshold, rate, label } = req.body;

    const update = {};
    if (threshold !== undefined) update.threshold = threshold;
    if (rate !== undefined) update.rate = rate;
    if (label !== undefined) update.label = label;

    const tier = await Tier.findByIdAndUpdate(tierId, update, { new: true });

    if (!tier) {
        return res.status(404).json({ success: false, message: "Tier not found." });
    }

    res.json({ success: true, data: { tier } });
});

const getNotifications = asyncHandler(async (req, res) => {
    const { type, read, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const pageLimit = Math.min(parseInt(limit, 10), 100);

    const filter = {};
    if (type && type !== "all") filter.type = type;
    if (read === "true") filter.isRead = true;
    if (read === "false") filter.isRead = false;

    const [notifications, total] = await Promise.all([
        Alert.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageLimit)
            .populate("user", "username email")
            .lean(),
        Alert.countDocuments(filter),
    ]);

    res.json({
        success: true,
        data: {
            notifications,
            pagination: {
                page: parseInt(page, 10),
                limit: pageLimit,
                total,
                totalPages: Math.ceil(total / pageLimit),
            },
        },
    });
});

const createNotification = asyncHandler(async (req, res) => {
    const { userIds, type, titleKey, messageKey, iconName, color, bg, ring } = req.body;

    if (!userIds || !type || !titleKey || !messageKey) {
        return res.status(400).json({
            success: false,
            message: "userIds, type, titleKey, and messageKey are required.",
        });
    }

    const alerts = userIds.map((userId) => ({
        user: userId,
        type,
        titleKey,
        messageKey,
        messageParams: req.body.messageParams || {},
        iconName: iconName || "Bell",
        color: color || "text-amber-400",
        bg: bg || "bg-amber-400/10",
        ring: ring || "ring-amber-400/20",
    }));

    await Alert.insertMany(alerts);

    res.status(201).json({ success: true, message: `Notification sent to ${userIds.length} user(s).` });
});

const deleteNotification = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const alert = await Alert.findByIdAndDelete(notificationId);

    if (!alert) {
        return res.status(404).json({ success: false, message: "Notification not found." });
    }

    res.json({ success: true, message: "Notification deleted." });
});

const getSettings = asyncHandler(async (req, res) => {
    const configs = await SystemConfig.find().lean();
    const settings = {};
    for (const c of configs) {
        if (c.key === "geminiApiKey" && c.value) {
            settings[c.key] = c.value.slice(0, 8) + "..." + c.value.slice(-4);
        } else {
            settings[c.key] = c.value;
        }
    }
    res.json({ success: true, data: { settings } });
});

const updateSettings = asyncHandler(async (req, res) => {
    const updates = req.body;
    const keys = Object.keys(updates);

    for (const key of keys) {
        await SystemConfig.findOneAndUpdate(
            { key },
            { value: updates[key] },
            { upsert: true }
        );
    }

    const configs = await SystemConfig.find().lean();
    const settings = {};
    for (const c of configs) {
        if (c.key === "geminiApiKey" && c.value) {
            settings[c.key] = c.value.slice(0, 8) + "..." + c.value.slice(-4);
        } else {
            settings[c.key] = c.value;
        }
    }

    res.json({ success: true, data: { settings } });
});

export { getDashboardStats, getRecentUsers, getUsers, toggleUserStatus, deleteUser, getDevices, updateDeviceStatus, deleteDevice, getTiers, updateTier, getNotifications, createNotification, deleteNotification, getSettings, updateSettings };
