import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/service.model.js";

dotenv.config();

// Replace with your MongoDB URI
await mongoose.connect(
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/urban_company"
);

const services = [
  // 5 services for Palu Technician (Electrician, Haryana)
  {
    title: "Fan Installation",
    description: "Quick and safe ceiling fan installation at your home.",
    category: "Electrician",
    price: 500,
    image:
      "https://unsplash.com/photos/side-view-of-caucasian-energy-plant-worker-in-working-clothes-and-with-helmet-on-head-turning-on-switch-qjlkiFA70xQ",
    createdBy: new mongoose.Types.ObjectId("688a264ca47c803a4abad86c"),
  },
  {
    title: "AC Repair",
    description: "Complete repair and servicing of split/window ACs.",
    category: "Electrician",
    price: 1200,
    image:
      "https://unsplash.com/photos/a-man-with-a-driller-and-a-hat-on-UovTD1dG-lA",
    createdBy: new mongoose.Types.ObjectId("688a264ca47c803a4abad86c"),
  },
  {
    title: "Switchboard Setup",
    description: "Install or replace switchboards with precision.",
    category: "Electrician",
    price: 700,
    image:
      "https://unsplash.com/photos/working-contractor-electrician-fixing-the-light-fsBhBDjxT-4",
    createdBy: new mongoose.Types.ObjectId("688a264ca47c803a4abad86c"),
  },
  {
    title: "Inverter Setup",
    description: "Professional inverter installation & maintenance.",
    category: "Electrician",
    price: 1500,
    image:
      "https://unsplash.com/photos/shallow-focus-photo-of-man-fixing-steel-cable-kBKOaghy8mU",
    createdBy: new mongoose.Types.ObjectId("688a264ca47c803a4abad86c"),
  },
  {
    title: "Wiring Inspection",
    description: "Thorough check-up of your home’s electrical wiring.",
    category: "Electrician",
    price: 600,
    image:
      "https://unsplash.com/photos/man-in-brown-hat-holding-black-and-gray-power-tool-_2AlIm-F6pw",
    createdBy: new mongoose.Types.ObjectId("688a264ca47c803a4abad86c"),
  },

  // 5 services for Gobar Gungun (Salon, Delhi)
  {
    title: "Facial & Clean-up",
    description: "Glowing skin with a deep cleanse facial package.",
    category: "Salon",
    price: 900,
    image:
      "https://unsplash.com/photos/happy-african-american-woman-showing-something-on-smart-phone-to-her-hairdresser-while-getting-her-hair-styled-at-the-salon-To-l8M2NCso",
    createdBy: new mongoose.Types.ObjectId("688a43483df994e43458e6be"),
  },
  {
    title: "Threading & Upper Lip",
    description: "Perfect brows and clean finish for your face.",
    category: "Salon",
    price: 150,
    image: "https://unsplash.com/photos/black-hair-brush-oM5YoMhTf8E",
    createdBy: new mongoose.Types.ObjectId("688a43483df994e43458e6be"),
  },
  {
    title: "Waxing Full Body",
    description: "Smooth and hygienic waxing service at your home.",
    category: "Salon",
    price: 1100,
    image:
      "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-flat-screen-tv-shT_LaGUmYI",
    createdBy: new mongoose.Types.ObjectId("688a43483df994e43458e6be"),
  },
  {
    title: "Pedicure & Manicure",
    description: "Relax with our hand and foot spa treatment.",
    category: "Salon",
    price: 800,
    image:
      "https://unsplash.com/photos/a-person-getting-the-hair-done-XqXtL3JMXG8",
    createdBy: new mongoose.Types.ObjectId("688a43483df994e43458e6be"),
  },
  {
    title: "Hair Spa & Styling",
    description: "Hair spa with styling for any occasion.",
    category: "Salon",
    price: 1000,
    image: "https://unsplash.com/photos/a-person-in-a-blue-shirt-ty1jF-GpwGY",
    createdBy: new mongoose.Types.ObjectId("688a43483df994e43458e6be"),
  },
];

try {
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log("✅ Dummy services seeded successfully!");
} catch (err) {
  console.error("❌ Error seeding services:", err);
} finally {
  await mongoose.disconnect();
}
