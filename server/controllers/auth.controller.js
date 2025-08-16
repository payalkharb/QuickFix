import OtpToken from "../models/otps.model.js";
import Customer from "../models/customer.model.js";
import Technician from "../models/technician.model.js";
import { sendOTP } from "../utils/sendOtp.js";
import { generateToken } from "../utils/generateToken.js";

export const sendOtp = async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ message: "Email and role are required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OtpToken.create({ email, otp, role });
  await sendOTP(email, otp);

  return res.status(200).json({ success: true, message: "OTP sent to email" });
};

export const verifyOtp = async (req, res) => {
  const { email, otp, name, phone, location, serviceType } = req.body;

  const otpDoc = await OtpToken.findOne({ email, otp });
  if (!otpDoc) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const role = otpDoc.role;
  let user;

  if (role === "customer") {
    user = await Customer.findOne({ email });
    console.log("Fetched/Created Customer from DB:", user);
    if (!user) {
      user = await Customer.create({ email, name, phone, location });
    }
  } else if (role === "technician") {
    user = await Technician.findOne({ email });
    if (!user) {
      user = await Technician.create({
        email,
        name,
        phone,
        location,
        serviceType,
      });
    }
  }

  const token = generateToken(user._id, role);

  // Convert to plain JS object and exclude sensitive/internal fields if needed
  const userObj = user.toObject();
  delete userObj.password; // just in case you ever add a password field
  delete userObj.__v;

  console.log("User being returned:", userObj);
  return res.status(200).json({
    success: true,
    message: "OTP verified",
    token,
    user: userObj,
    role,
  });
};
