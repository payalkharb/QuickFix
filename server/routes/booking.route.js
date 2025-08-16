import express from "express";
import {
  createBooking,
  getCustomerBookings,
  cancelBooking,
  getTechnicianBookings,
  updateBookingStatus,
  rescheduleBooking,
  addReview,
  getUpcomingBookings,
} from "../controllers/booking.controller.js";

import customerAuth from "../middlewares/customerAuth.js";
import technicianAuth from "../middlewares/technicianAuth.js";

const router = express.Router();

// ✅ Customer Routes
router.post("/", customerAuth, createBooking);
router.get("/", customerAuth, getCustomerBookings);
router.put("/cancel/:id", customerAuth, cancelBooking);
router.put("/reschedule/:id", customerAuth, rescheduleBooking);
router.put("/review/:id", customerAuth, addReview);
router.get("/upcoming", customerAuth, getUpcomingBookings);

// ✅ Technician Routes
router.get("/technician", technicianAuth, getTechnicianBookings);
router.put("/status/:id", technicianAuth, updateBookingStatus);

export default router;
