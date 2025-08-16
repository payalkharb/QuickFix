// // import Service from "../models/service.model.js";
// // import Technician from "../models/technician.model.js";
// // import { uploader } from "../utils/cloudinary.js";
// // import fs from "fs";

// // export const createService = async (req, res) => {
// //   try {
// //     const { title, description, price, category, image } = req.body;
// //     const technicianId = req.user.id;

// //     const technicianExists = await Technician.findById(technicianId);
// //     if (!technicianExists) {
// //       return res.status(404).json({ error: "Technician not found" });
// //     }

// //     const newService = await Service.create({
// //       title,
// //       description,
// //       price,
// //       category,
// //       image,
// //       createdBy: technicianId,
// //     });

// //     res.status(201).json(newService);
// //   } catch (error) {
// //     console.error("Create Service Error:", error);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // };

// // export const getAllServices = async (req, res) => {
// //   try {
// //     const {
// //       category,
// //       minPrice,
// //       maxPrice,
// //       availability,
// //       sort,
// //       page = 1,
// //       limit = 9,
// //     } = req.query;

// //     const filter = {};
// //     if (category) {
// //       filter.$or = [
// //         { category: { $regex: category, $options: "i" } },
// //         { title: { $regex: category, $options: "i" } },
// //       ];
// //     }

// //     if (availability && availability !== "any")
// //       filter.availability = availability;
// //     if (minPrice || maxPrice) {
// //       filter.price = {};
// //       if (minPrice) filter.price.$gte = Number(minPrice);
// //       if (maxPrice) filter.price.$lte = Number(maxPrice);
// //     }

// //     let query = Service.find(filter).populate("createdBy", "name serviceType");
// //     if (sort === "priceAsc") query = query.sort({ price: 1 });
// //     else if (sort === "priceDesc") query = query.sort({ price: -1 });

// //     const total = await Service.countDocuments(filter);
// //     const services = await query.skip((page - 1) * limit).limit(Number(limit));

// //     res.json({ services, total, page: Number(page), limit: Number(limit) });
// //   } catch (error) {
// //     console.error("Error fetching services:", error);
// //     res.status(500).json({ error: "Failed to fetch services" });
// //   }
// // };

// // export const getServiceById = async (req, res) => {
// //   try {
// //     const service = await Service.findById(req.params.id).populate(
// //       "createdBy",
// //       "name phone location"
// //     );

// //     if (!service) return res.status(404).json({ error: "Service not found" });
// //     res.status(200).json(service);
// //   } catch (error) {
// //     res.status(500).json({ error: "Error fetching service" });
// //   }
// // };

// // export const updateService = async (req, res) => {
// //   try {
// //     const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
// //       new: true,
// //     });
// //     if (!updated) return res.status(404).json({ error: "Service not found" });
// //     res.status(200).json(updated);
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to update service" });
// //   }
// // };

// // export const deleteService = async (req, res) => {
// //   try {
// //     const deleted = await Service.findByIdAndDelete(req.params.id);
// //     if (!deleted) return res.status(404).json({ error: "Service not found" });
// //     res.status(200).json({ message: "Service deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to delete service" });
// //   }
// // };

// import Service from "../models/service.model.js";
// import Technician from "../models/technician.model.js";
// import { uploader } from "../utils/cloudinary.js";
// import fs from "fs";

// // ✅ Create Service (with optional image upload)
// export const createService = async (req, res) => {
//   try {
//     const { title, description, price, category } = req.body;
//     const technicianId = req.user._id || req.user.id;

//     // check if technician exists
//     const tech = await Technician.findById(technicianId);
//     if (!tech) return res.status(404).json({ error: "Technician not found" });

//     const serviceData = {
//       title,
//       description,
//       price,
//       category,
//       createdBy: technicianId,
//     };

//     // if image uploaded → send to cloudinary
//     if (req.file) {
//       const result = await uploader.upload(req.file.path);
//       serviceData.image = result.secure_url;
//       fs.unlinkSync(req.file.path);
//     }

//     const newService = await Service.create(serviceData);
//     res.status(201).json(newService);
//   } catch (err) {
//     console.error("Create Service Error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // ✅ Get all services (with filters, sorting, pagination)
// export const getAllServices = async (req, res) => {
//   try {
//     const {
//       category,
//       minPrice,
//       maxPrice,
//       availability,
//       sort,
//       page = 1,
//       limit = 9,
//     } = req.query;

//     const filter = {};

//     // category filter → match title or category
//     if (category) {
//       filter.$or = [
//         { category: { $regex: category, $options: "i" } },
//         { title: { $regex: category, $options: "i" } },
//       ];
//     }

//     if (availability && availability !== "any") {
//       filter.availability = availability;
//     }

//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     let query = Service.find(filter).populate("createdBy", "name serviceType");

//     // sorting
//     if (sort === "priceAsc") query = query.sort({ price: 1 });
//     else if (sort === "priceDesc") query = query.sort({ price: -1 });

//     const total = await Service.countDocuments(filter);
//     const services = await query.skip((page - 1) * limit).limit(Number(limit));

//     res.json({
//       services,
//       total,
//       page: Number(page),
//       limit: Number(limit),
//     });
//   } catch (err) {
//     console.error("Error fetching services:", err);
//     res.status(500).json({ error: "Failed to fetch services" });
//   }
// };

// // ✅ Get single service by ID
// export const getServiceById = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id).populate(
//       "createdBy",
//       "name phone location serviceType"
//     );

//     if (!service) return res.status(404).json({ error: "Service not found" });
//     res.status(200).json(service);
//   } catch (err) {
//     console.error("Get Service Error:", err);
//     res.status(500).json({ error: "Error fetching service" });
//   }
// };

// // ✅ Update service (only owner, with optional image re-upload)
// export const updateService = async (req, res) => {
//   try {
//     const updates = {
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       availability: req.body.availability,
//     };

//     if (req.file) {
//       const result = await uploader.upload(req.file.path);
//       updates.image = result.secure_url;
//       fs.unlinkSync(req.file.path);
//     }

//     const updated = await Service.findOneAndUpdate(
//       { _id: req.params.id, createdBy: req.user._id || req.user.id }, // ✅ ownership check
//       updates,
//       { new: true }
//     );

//     if (!updated)
//       return res
//         .status(404)
//         .json({ error: "Service not found or not authorized" });

//     res.status(200).json(updated);
//   } catch (err) {
//     console.error("Update Service Error:", err);
//     res.status(500).json({ error: "Failed to update service" });
//   }
// };

// // ✅ Delete service (only owner)
// export const deleteService = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const service = await Service.findOneAndDelete({
//       _id: id,
//       createdBy: req.user._id || req.user.id, // ✅ ownership check
//     });

//     if (!service) {
//       return res
//         .status(404)
//         .json({ message: "Service not found or not authorized" });
//     }

//     res.json({ message: "Service deleted successfully" });
//   } catch (err) {
//     console.error("Delete Service Error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

import Service from "../models/service.model.js";
import Technician from "../models/technician.model.js";
import cloudinary from "../utils/cloudinary.js"; // ✅ fixed import
import fs from "fs";

// ✅ Create Service (with optional image upload)
export const createService = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const technicianId = req.user._id || req.user.id;

    // check if technician exists
    const tech = await Technician.findById(technicianId);
    if (!tech) return res.status(404).json({ error: "Technician not found" });

    const serviceData = {
      title,
      description,
      price,
      category,
      createdBy: technicianId,
    };

    // if image uploaded → send to cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "services",
      });
      serviceData.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const newService = await Service.create(serviceData);
    res.status(201).json(newService);
  } catch (err) {
    console.error("Create Service Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get all services (with filters, sorting, pagination)
export const getAllServices = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      availability,
      sort,
      page = 1,
      limit = 9,
    } = req.query;

    const filter = {};

    // category filter → match title or category
    if (category) {
      filter.$or = [
        { category: { $regex: category, $options: "i" } },
        { title: { $regex: category, $options: "i" } },
      ];
    }

    if (availability && availability !== "any") {
      filter.availability = availability;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Service.find(filter).populate("createdBy", "name serviceType");

    // sorting
    if (sort === "priceAsc") query = query.sort({ price: 1 });
    else if (sort === "priceDesc") query = query.sort({ price: -1 });

    const total = await Service.countDocuments(filter);
    const services = await query.skip((page - 1) * limit).limit(Number(limit));

    res.json({
      services,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// ✅ Get single service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "createdBy",
      "name phone location serviceType"
    );

    if (!service) return res.status(404).json({ error: "Service not found" });
    res.status(200).json(service);
  } catch (err) {
    console.error("Get Service Error:", err);
    res.status(500).json({ error: "Error fetching service" });
  }
};

// ✅ Update service (only owner, with optional image re-upload)
export const updateService = async (req, res) => {
  try {
    const updates = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      availability: req.body.availability,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "services",
      });
      updates.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updated = await Service.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id || req.user.id }, // ✅ ownership check
      updates,
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ error: "Service not found or not authorized" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Service Error:", err);
    res.status(500).json({ error: "Failed to update service" });
  }
};

// ✅ Delete service (only owner)
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findOneAndDelete({
      _id: id,
      createdBy: req.user._id || req.user.id, // ✅ ownership check
    });

    if (!service) {
      return res
        .status(404)
        .json({ message: "Service not found or not authorized" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Delete Service Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
