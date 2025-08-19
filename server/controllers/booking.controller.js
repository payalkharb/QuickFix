// import Booking from "../models/booking.model.js";
// import Service from "../models/service.model.js";
// import Customer from "../models/customer.model.js";
// import Technician from "../models/technician.model.js";

// export const createBooking = async (req, res) => {
//   try {
//     const { serviceId, bookingDate } = req.body;
//     const customerId = req.user.id;

//     const service = await Service.findById(serviceId);
//     if (!service) return res.status(404).json({ error: "Service not found" });

//     const technicianId = service.createdBy;

//     const booking = await Booking.create({
//       customerId,
//       serviceId,
//       technicianId,
//       bookingDate,
//     });

//     res.status(201).json(booking);
//   } catch (error) {
//     console.error("Create booking error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getCustomerBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ customerId: req.user.id })
//       .populate("serviceId")
//       .populate("technicianId", "name serviceType");

//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch bookings" });
//   }
// };

// export const cancelBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findOneAndUpdate(
//       { _id: req.params.id, customerId: req.user.id },
//       { status: "cancelled" },
//       { new: true }
//     );

//     if (!booking) return res.status(404).json({ error: "Booking not found" });

//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to cancel booking" });
//   }
// };

// /**
//  * GET /api/bookings/technician?scope=active|completed
//  * scope=active     -> status in ["pending","confirmed"]
//  * scope=completed  -> status === "completed"
//  * default          -> all
//  */
// export const getTechnicianBookings = async (req, res) => {
//   try {
//     const scope = (req.query.scope || "").toLowerCase();

//     const baseFilter = { technicianId: req.user.id };
//     let statusFilter = {};

//     if (scope === "active") {
//       statusFilter = { status: { $in: ["pending", "confirmed"] } };
//     } else if (scope === "completed") {
//       statusFilter = { status: "completed" };
//     }

//     const bookings = await Booking.find({ ...baseFilter, ...statusFilter })
//       .sort({ bookingDate: 1 })
//       .populate("customerId", "name phone location")
//       // NOTE: "type" does not exist on Service; using "category" as Type
//       .populate("serviceId", "title price category description");

//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error("Fetch technician bookings error:", error);
//     res.status(500).json({ error: "Failed to fetch technician bookings" });
//   }
// };

// // export const updateBookingStatus = async (req, res) => {
// //   try {
// //     const { status } = req.body;
// //     const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

// //     if (!validStatuses.includes(status)) {
// //       return res.status(400).json({ error: "Invalid status" });
// //     }

// //     const booking = await Booking.findOneAndUpdate(
// //       { _id: req.params.id, technicianId: req.user.id },
// //       {
// //         status,
// //         ...(status === "completed" ? { completedAt: new Date() } : {}),
// //       },
// //       { new: true }
// //     )
// //       .populate("customerId", "name phone location")
// //       .populate("serviceId", "title price category description");

// //     if (!booking) return res.status(404).json({ error: "Booking not found" });

// //     res.status(200).json(booking);
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to update booking status" });
// //   }
// // };

// // controllers/booking.controller.js

// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const booking = await Booking.findById(id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     // Technician marking job as complete (requesting customer confirmation)
//     if (status === "completion_requested") {
//       booking.status = "completion_requested";
//       booking.completionRequestedAt = new Date();
//     }

//     // Customer confirming completion
//     else if (status === "completed") {
//       booking.status = "completed";
//       booking.completedAt = new Date();
//     }

//     // Other statuses (pending, confirmed, cancelled etc.)
//     else {
//       booking.status = status;
//     }

//     await booking.save();
//     res.json(booking);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to update booking status" });
//   }
// };

// export const rescheduleBooking = async (req, res) => {
//   try {
//     const { bookingDate } = req.body;

//     const booking = await Booking.findOne({
//       _id: req.params.id,
//       customerId: req.user.id,
//       status: { $in: ["pending", "confirmed"] },
//     });

//     if (!booking) {
//       return res
//         .status(404)
//         .json({ error: "Booking not found or cannot be rescheduled" });
//     }

//     booking.bookingDate = bookingDate;
//     await booking.save();

//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to reschedule booking" });
//   }
// };

// export const addReview = async (req, res) => {
//   try {
//     const { rating, review } = req.body;

//     const booking = await Booking.findOne({
//       _id: req.params.id,
//       customerId: req.user.id,
//       status: "completed",
//     });

//     if (!booking) {
//       return res
//         .status(400)
//         .json({ error: "Only completed bookings can be reviewed" });
//     }

//     booking.rating = rating;
//     booking.review = review;
//     await booking.save();

//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to submit review" });
//   }
// };

// export const getUpcomingBookings = async (req, res) => {
//   try {
//     const now = new Date();
//     const bookings = await Booking.find({
//       customerId: req.user.id,
//       bookingDate: { $gte: now },
//       status: { $ne: "cancelled" },
//     }).populate("serviceId technicianId");

//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch upcoming bookings" });
//   }
// };

// export const getBookingDetails = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id)
//       .populate("customerId", "name phone location")
//       .populate("serviceId", "title price category description")
//       .populate("technicianId", "name phone location serviceType");

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.json(booking);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

import Booking from "../models/booking.model.js";
import Service from "../models/service.model.js";
import Customer from "../models/customer.model.js";
import Technician from "../models/technician.model.js";

// 📌 Customer creates a booking
export const createBooking = async (req, res) => {
  try {
    const { serviceId, bookingDate } = req.body;
    const customerId = req.user.id;

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ error: "Service not found" });

    const technicianId = service.createdBy;

    const booking = await Booking.create({
      customerId,
      serviceId,
      technicianId,
      bookingDate,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Customer bookings
export const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.id })
      .populate("serviceId")
      .populate("technicianId", "name serviceType");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// 📌 Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, customerId: req.user.id },
      { status: "cancelled" },
      { new: true }
    );

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel booking" });
  }
};

// 📌 Technician bookings (sidebar: pending, confirmed, completed)
export const getTechnicianBookings = async (req, res) => {
  try {
    const scope = (req.query.scope || "").toLowerCase();

    const baseFilter = { technicianId: req.user.id };
    let statusFilter = {};

    if (scope === "active") {
      statusFilter = {
        status: { $in: ["pending", "confirmed", "completion_requested"] },
      };
    } else if (scope === "completed") {
      statusFilter = { status: "completed" };
    }

    const bookings = await Booking.find({ ...baseFilter, ...statusFilter })
      .sort({ bookingDate: 1 })
      .populate("customerId", "name phone location")
      .populate("serviceId", "title price category description");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch technician bookings error:", error);
    res.status(500).json({ error: "Failed to fetch technician bookings" });
  }
};

// 📌 Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (status === "completion_requested") {
      // Technician marks job as complete (waiting for customer confirm)
      booking.status = "completion_requested";
      booking.completionRequestedAt = new Date();
    } else if (status === "completed") {
      // Customer confirms job done
      booking.status = "completed";
      booking.completedAt = new Date();
    } else {
      booking.status = status;
    }

    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update booking status" });
  }
};

// 📌 Reschedule booking
export const rescheduleBooking = async (req, res) => {
  try {
    const { bookingDate } = req.body;

    const booking = await Booking.findOne({
      _id: req.params.id,
      customerId: req.user.id,
      status: { $in: ["pending", "confirmed"] },
    });

    if (!booking) {
      return res
        .status(404)
        .json({ error: "Booking not found or cannot be rescheduled" });
    }

    booking.bookingDate = bookingDate;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to reschedule booking" });
  }
};

// 📌 Add review (only within 24h after completed)
export const addReview = async (req, res) => {
  try {
    const { rating, review } = req.body;

    const booking = await Booking.findOne({
      _id: req.params.id,
      customerId: req.user.id,
      status: "completed",
    });

    if (!booking) {
      return res
        .status(400)
        .json({ error: "Only completed bookings can be reviewed" });
    }

    // check 24h rule
    const now = new Date();
    const completedAt = new Date(booking.completedAt);
    const diffHours = (now - completedAt) / (1000 * 60 * 60);

    if (diffHours > 24) {
      return res.status(400).json({ error: "Review window expired" });
    }

    booking.rating = rating;
    booking.review = review;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit review" });
  }
};

// 📌 Get upcoming bookings
export const getUpcomingBookings = async (req, res) => {
  try {
    const now = new Date();
    const bookings = await Booking.find({
      customerId: req.user.id,
      bookingDate: { $gte: now },
      status: { $ne: "cancelled" },
    }).populate("serviceId technicianId");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch upcoming bookings" });
  }
};

// 📌 Get booking details
export const getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customerId", "name phone location")
      .populate("serviceId", "title price category description")
      .populate("technicianId", "name phone location serviceType");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
