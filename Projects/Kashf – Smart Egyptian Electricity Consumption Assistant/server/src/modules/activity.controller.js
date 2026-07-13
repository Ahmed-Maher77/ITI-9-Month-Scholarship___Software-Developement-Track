import asyncHandler from "../middlewares/asyncHandler.js";
import * as activityService from "../services/activity.service.js";

export const getActivity = asyncHandler(async (req, res) => {
    const page  = Math.max(1, parseInt(req.query.page  ?? "1",  10));
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit ?? "20", 10)));

    const result = await activityService.getUserActivity({
        userId: req.user.id,
        page,
        limit,
    });

    res.status(200).json({ success: true, data: result });
});
