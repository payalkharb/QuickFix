// controllers/customer.controller.js
import Customer from "../models/customer.model.js";

export const updateCustomerLocation = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { location },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Location updated", customer: updatedCustomer });
  } catch (error) {
    console.error("Error updating customer location:", error);
    res.status(500).json({ message: "Server error" });
  }
};
