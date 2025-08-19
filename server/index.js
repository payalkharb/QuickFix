import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
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
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/customer", customerRoutes);

app.use("/api/contact", contactRoutes);

// Test route
app.get("/", (req, res) => {
  res.send({ message: "Server is running ✅" });
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
