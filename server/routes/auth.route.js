import express from "express";
import { sendOtp, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

// OTP Flow for signup (works for both customer and technician)
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
