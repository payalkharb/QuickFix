import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Technician",
    required: true,
  },
  bookingDate: { type: Date, required: true }, // when service is scheduled
  status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "completion_requested",
      "completed",
      "cancelled",
    ],
    default: "pending",
  },
  completionRequestedAt: { type: Date }, // when technician clicked "mark as complete"
  completedAt: { type: Date }, // when customer confirmed
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
