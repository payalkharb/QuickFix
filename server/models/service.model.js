import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a non-negative number"],
    },
    image: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v),
        message: (props) => `${props.value} is not a valid image URL`,
      },
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },

    // 👇 general time window
    availability: {
      type: String,
      enum: [
        "today",
        "this week",
        "weekend only",
        "fully booked",
        "available now",
      ],
      default: "available now",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technician",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceSchema);
