import express from "express";
import {
    getMeters,
    createMeter,
    updateMeter,
    deleteMeter,
} from "./meter.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/")
    .get(isAuthenticated, getMeters)
    .post(isAuthenticated, createMeter);

router.route("/:id")
    .put(isAuthenticated, updateMeter)
    .delete(isAuthenticated, deleteMeter);

export default router;
