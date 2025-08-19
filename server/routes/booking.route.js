// import express from "express";
// import {
//   createBooking,
//   getCustomerBookings,
//   cancelBooking,
//   getTechnicianBookings,
//   updateBookingStatus,
//   rescheduleBooking,
//   addReview,
//   getUpcomingBookings,
// } from "../controllers/booking.controller.js";

// import customerAuth from "../middlewares/customerAuth.js";
// import technicianAuth from "../middlewares/technicianAuth.js";

// const router = express.Router();

// // ✅ Customer Routes
// router.post("/", customerAuth, createBooking);
// router.get("/", customerAuth, getCustomerBookings);
// router.put("/cancel/:id", customerAuth, cancelBooking);
// router.put("/reschedule/:id", customerAuth, rescheduleBooking);
// router.put("/review/:id", customerAuth, addReview);
// router.get("/upcoming", customerAuth, getUpcomingBookings);

// // ✅ Technician Routes
// // Add optional ?scope=active|completed to filter
// router.get("/technician", technicianAuth, getTechnicianBookings);

// // Accept/Reject/Complete etc.
// router.put("/status/:id", technicianAuth, updateBookingStatus);

// export default router;

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
  getBookingDetails,
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
router.get("/:id", customerAuth, getBookingDetails);

// ✅ Technician Routes
router.get("/technician", technicianAuth, getTechnicianBookings);

// ✅ Technician updates status
router.put("/status/:id", technicianAuth, updateBookingStatus);

// ✅ Customer confirms completion
router.put("/customer/status/:id", customerAuth, updateBookingStatus);

export default router;
