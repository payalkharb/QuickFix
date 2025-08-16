import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  role: String, // 'customer' or 'technician'
  createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 mins expiry
});

export default mongoose.model("OtpToken", otpSchema);
