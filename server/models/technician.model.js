import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  location: {
    type: String,
    required: true,
  },
  serviceType: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Technician", technicianSchema);
