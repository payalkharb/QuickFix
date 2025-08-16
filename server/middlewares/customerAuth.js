import jwt from "jsonwebtoken";
import Customer from "../models/customer.model.js";

const customerAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findById(decoded.id);

    if (!customer) {
      return res.status(401).json({ error: "Customer not found" });
    }

    req.user = { id: customer._id };
    next();
  } catch (error) {
    console.error("Customer auth error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default customerAuth;
