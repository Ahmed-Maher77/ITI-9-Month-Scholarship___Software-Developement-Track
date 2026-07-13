import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { payForPlan, getPaymentHistory, verifyCheckout, deletePaymentMethod, cancelSubscription } from "./payment.controller.js";

const router = Router();

router.post("/pay-for-plan", isAuthenticated, payForPlan);
router.get("/history", isAuthenticated, getPaymentHistory);
router.get("/verify-checkout", isAuthenticated, verifyCheckout);
router.delete("/payment-method", isAuthenticated, deletePaymentMethod);
router.post("/cancel-subscription", isAuthenticated, cancelSubscription);

export default router;
