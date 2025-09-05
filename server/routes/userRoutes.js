import express from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register-user", createUser);
router.post("/login-user", loginUser);

export default router;
