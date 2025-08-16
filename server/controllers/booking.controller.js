import Booking from "../models/booking.model.js";
import Service from "../models/service.model.js";
import Customer from "../models/customer.model.js";
import Technician from "../models/technician.model.js";

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

export const getTechnicianBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ technicianId: req.user.id })
      .populate("customerId", "name phone")
      .populate("serviceId", "title category");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch technician bookings" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, technicianId: req.user.id },
      { status },
      { new: true }
    );

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking status" });
  }
};

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

    booking.rating = rating;
    booking.review = review;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit review" });
  }
};

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
