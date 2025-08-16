import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

import technicianAuth from "../middlewares/technicianAuth.js";
import { upload } from "../utils/multer.js"; // Multer config

const router = express.Router();

// Public routes
router.get("/", getAllServices);
router.get("/:id", getServiceById);

// Protected technician routes with image upload support
router.post("/", technicianAuth, upload.single("image"), createService);
router.put("/:id", technicianAuth, upload.single("image"), updateService);
router.delete("/:id", technicianAuth, deleteService);

export default router;
