import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.route.js";
import serviceRoutes from "./routes/service.route.js";
import bookingRoutes from "./routes/booking.route.js";
import technicianRoutes from "./routes/technician.route.js";
import customerRoutes from "./routes/customer.route.js";
import contactRoutes from "./routes/contact.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev
      "https://quickfix-lvch.onrender.com", // production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/contact", contactRoutes);

// Test API route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running ✅" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Serve React frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../client/build")));

// Catch-all for React Router
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  }
});
