import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    BusinessName: {
      type: String,
      required: true,
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    BusinessType: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    Province: {
      type: String,
      required: true,
    },
    ContactNumber: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    RegistrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    Status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Business = mongoose.model("Business", businessSchema);

export default Business;
