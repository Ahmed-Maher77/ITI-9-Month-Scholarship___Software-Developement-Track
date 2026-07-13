import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    getAlerts,
    markAlertRead,
    markAllAlertsRead,
    deleteAlert,
} from "./alert.controller.js";

const router = Router();

router.use(isAuthenticated);

router.get("/", getAlerts);
router.put("/read-all", markAllAlertsRead);
router.put("/:id/read", markAlertRead);
router.delete("/:id", deleteAlert);

export default router;
