// import jwt from "jsonwebtoken";
// import Technician from "../models/technician.model.js";

// const technicianAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const technician = await Technician.findById(decoded.id);

//     if (!technician) {
//       return res.status(401).json({ error: "Technician not found" });
//     }

//     req.user = { id: technician._id };
//     next();
//   } catch (error) {
//     console.error("Technician auth error:", error);
//     res.status(401).json({ error: "Invalid or expired token" });
//   }
// };

// export default technicianAuth;

import jwt from "jsonwebtoken";
import Technician from "../models/technician.model.js";

const technicianAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional role check → won't break if role isn't set in token
    if (decoded.role && decoded.role !== "technician") {
      return res
        .status(403)
        .json({ error: "Forbidden: Not a technician role" });
    }

    const technician = await Technician.findById(decoded.id);
    if (!technician) {
      return res.status(404).json({ error: "Technician not found" });
    }

    // ✅ Attach both forms (so both your & friend's code works)
    req.user = technician; // full technician object
    req.user.id = technician._id; // shorthand for compatibility

    next();
  } catch (error) {
    console.error("Technician auth error:", error);
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    res.status(401).json({ error: message });
  }
};

export default technicianAuth;
