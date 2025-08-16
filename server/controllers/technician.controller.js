import Booking from "../models/booking.model.js";
import Service from "../models/service.model.js";
import Technician from "../models/technician.model.js";
import cloudinary from "../utils/cloudinary.js";

export const updateTechnicianLocation = async (req, res) => {
  try {
    const technicianId = req.user.id;
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const updatedTech = await Technician.findByIdAndUpdate(
      technicianId,
      { location },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Location updated", technician: updatedTech });
  } catch (error) {
    console.error("Error updating technician location:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBookings = async (req, res) => {
  const { status } = req.query;
  const techId = req.user.id;
  const filter = { technicianId: techId };
  if (status) filter.status = status;
  const bookings = await Booking.find(filter)
    .populate("customerId", "name phone location")
    .populate("serviceId", "title price")
    .sort({ bookingDate: 1 });
  res.json(bookings);
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const valid = ["confirmed", "completed", "cancelled"];
  if (!valid.includes(status))
    return res.status(400).json({ error: "Invalid status" });
  const booking = await Booking.findOneAndUpdate(
    { _id: id, technicianId: req.user.id },
    { status },
    { new: true }
  );
  if (!booking) return res.status(404).json({ error: "Not found" });
  res.json(booking);
};

export const getEarnings = async (req, res) => {
  const techId = req.user.id;
  const bookings = await Booking.find({
    technicianId: techId,
    status: "completed",
    createdAt: { $gte: req.query.start, $lte: req.query.end },
  }).populate("serviceId", "price");
  const total = bookings.reduce((sum, b) => sum + b.serviceId.price, 0);
  res.json({ total, count: bookings.length });
};

export const listServices = async (req, res) => {
  try {
    const services = await Service.find({ createdBy: req.user.id });
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

export const addService = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "services",
      });
      imageUrl = result.secure_url;
    }

    const service = await Service.create({
      ...req.body,
      createdBy: req.user.id,
      image: imageUrl,
    });

    res.status(201).json({ message: "Service added successfully", service });
  } catch (err) {
    console.error("Error adding service:", err);
    res.status(500).json({ error: "Failed to add service" });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if service exists & belongs to this technician
    const service = await Service.findOne({ _id: id, createdBy: req.user.id });
    if (!service) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this service" });
    }

    // Prepare updates
    let updates = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "services",
      });
      updates.image = result.secure_url;
    }

    const updatedService = await Service.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.json(updatedService);
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ error: "Failed to update service" });
  }
};

export const updateProfile = async (req, res) => {
  const techId = req.user.id;
  const tech = await Technician.findByIdAndUpdate(techId, req.body, {
    new: true,
  });
  res.json(tech);
};
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Check ownership before delete
    const service = await Service.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });

    if (!service) {
      return res
        .status(403)
        .json({ error: "Not authorized or service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ error: "Failed to delete service" });
  }
};
