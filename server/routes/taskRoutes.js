import express from "express";
import { createTask, deleteTask, editTask, getAllTasks } from "../controllers/task.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/edit-task/:taskId", authenticateToken, editTask);
router.get("/get-all-tasks", authenticateToken, getAllTasks);
router.post("/create-task", authenticateToken, createTask);
router.delete("/delete-task/:taskId", authenticateToken, deleteTask);

export default router;
