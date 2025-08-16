// routes/customer.route.js
import express from "express";
import customerAuth from "../middlewares/customerAuth.js";
import { updateCustomerLocation } from "../controllers/customer.controller.js";

const router = express.Router();

router.put("/location", customerAuth, updateCustomerLocation);

export default router;
