import express from "express";
import { sendOtp, verifyOtp } from "../controllers/forgotPasswordController.js";

const router = express.Router();

// POST /api/auth/forgot-password  → Step 1: send OTP to registered email
router.post("/forgot-password", sendOtp);

// POST /api/auth/verify-otp       → Step 2: verify the 4-digit OTP
router.post("/verify-otp", verifyOtp);

export default router;