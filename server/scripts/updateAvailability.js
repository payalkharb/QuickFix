// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Service from "../models/service.model.js";

// dotenv.config();

// await mongoose.connect(
//   process.env.MONGO_URI || "mongodb://127.0.0.1:27017/urban_company"
// );

// // Random availability options
// const availabilityOptions = [
//   "today",
//   "this week",
//   "weekend only",
//   "fully booked",
//   "available now",
// ];

// try {
//   const services = await Service.find({ availability: { $exists: false } });

//   for (const service of services) {
//     const randomAvailability =
//       availabilityOptions[
//         Math.floor(Math.random() * availabilityOptions.length)
//       ];
//     service.availability = randomAvailability;
//     await service.save();
//     console.log(
//       `✅ Updated ${service.title} with availability: ${randomAvailability}`
//     );
//   }

//   console.log(
//     `🎉 Finished updating ${services.length} services with random availability`
//   );
// } catch (err) {
//   console.error("❌ Error updating availability:", err);
// } finally {
//   await mongoose.disconnect();
// }

import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/service.model.js";

dotenv.config();

await mongoose.connect(
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/urban_company"
);

// Availability enum options
const availabilityOptions = [
  "today",
  "this week",
  "weekend only",
  "fully booked",
  "available now",
];

// Function to randomly return true or false
const getRandomBoolean = () => Math.random() < 0.5;

try {
  const services = await Service.find({
    $or: [
      { availability: { $exists: false } },
      { isAvailable: { $exists: false } },
    ],
  });

  for (const service of services) {
    if (!service.availability) {
      service.availability =
        availabilityOptions[
          Math.floor(Math.random() * availabilityOptions.length)
        ];
    }

    if (typeof service.isAvailable !== "boolean") {
      service.isAvailable = getRandomBoolean();
    }

    await service.save();
    console.log(
      `✅ Updated "${service.title}" with -> availability: ${service.availability}, isAvailable: ${service.isAvailable}`
    );
  }

  console.log(`🎉 Finished updating ${services.length} services`);
} catch (err) {
  console.error("❌ Error updating services:", err);
} finally {
  await mongoose.disconnect();
}
