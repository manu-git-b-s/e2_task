import express from "express";
import taskRoutes from "./taskRoutes.js";
import userRoutes from "./userRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";

const router = express.Router();

router.use("/task", taskRoutes);
router.use("/auth", userRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
