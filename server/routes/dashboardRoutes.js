import express from "express";
import { getCalendarTasks, getDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/calendar-tasks", getCalendarTasks);

export default router;
