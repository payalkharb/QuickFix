import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  location: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Customer", customerSchema);
