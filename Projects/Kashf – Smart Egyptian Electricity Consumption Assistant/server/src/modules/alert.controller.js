import Alert from "../../database/models/alert.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";

// @desc    Get all alerts for logged in user
// @route   GET /api/alerts
// @access  Private
export const getAlerts = asyncHandler(async (req, res) => {
    const alerts = await Alert.find({ user: req.user.id }).sort({ createdAt: -1 });

    const formattedAlerts = alerts.map((alert) => {
        const a = alert.toObject();
        a.id = a._id.toString();
        delete a._id;
        delete a.__v;
        return a;
    });

    res.status(200).json({
        success: true,
        data: formattedAlerts,
    });
});

// @desc    Mark a specific alert as read
// @route   PUT /api/alerts/:id/read
// @access  Private
export const markAlertRead = asyncHandler(async (req, res) => {
    const alert = await Alert.findOne({ _id: req.params.id, user: req.user.id });

    if (!alert) {
        throw new AppError("Alert not found.", 404);
    }

    alert.isRead = true;
    await alert.save();

    res.status(200).json({
        success: true,
        data: {
            id: alert._id.toString(),
            isRead: alert.isRead,
        },
    });
});

// @desc    Mark all alerts as read
// @route   PUT /api/alerts/read-all
// @access  Private
export const markAllAlertsRead = asyncHandler(async (req, res) => {
    await Alert.updateMany({ user: req.user.id, isRead: false }, { isRead: true });

    res.status(200).json({
        success: true,
        message: "All alerts marked as read.",
    });
});

// @desc    Delete an alert
// @route   DELETE /api/alerts/:id
// @access  Private
export const deleteAlert = asyncHandler(async (req, res) => {
    const alert = await Alert.findOne({ _id: req.params.id, user: req.user.id });

    if (!alert) {
        throw new AppError("Alert not found.", 404);
    }

    await alert.deleteOne();

    res.status(200).json({
        success: true,
        message: "Alert deleted successfully.",
        data: {
            id: req.params.id,
        },
    });
});
