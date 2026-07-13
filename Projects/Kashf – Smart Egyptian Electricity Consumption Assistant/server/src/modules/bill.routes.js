import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getBills, addBill, deleteBill, updateBill } from "./bill.controller.js";

const router = express.Router();

router.route("/")
    .get(isAuthenticated, getBills)
    .post(isAuthenticated, addBill);

router.route("/:id")
    .put(isAuthenticated, updateBill)
    .delete(isAuthenticated, deleteBill);

export default router;
