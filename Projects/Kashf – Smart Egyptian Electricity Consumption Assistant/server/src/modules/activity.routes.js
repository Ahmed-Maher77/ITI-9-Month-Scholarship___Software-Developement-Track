import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getActivity } from "./activity.controller.js";

const router = Router();

router.get("/", isAuthenticated, getActivity);

export default router;
