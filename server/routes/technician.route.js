import express from "express";
import * as techCtrl from "../controllers/technician.controller.js";
import technicianAuth from "../middlewares/technicianAuth.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.use(technicianAuth);

router.get("/bookings", techCtrl.getBookings);
router.patch("/booking/:id/status", techCtrl.updateBookingStatus);
router.get("/earnings", techCtrl.getEarnings);

router.get("/services", techCtrl.listServices);
router.post("/services", upload.single("image"), techCtrl.addService);
router.put("/services/:id", upload.single("image"), techCtrl.updateService); // ✅ added
router.delete("/services/:id", techCtrl.deleteService);

router.patch("/profile", techCtrl.updateProfile);

export default router;
