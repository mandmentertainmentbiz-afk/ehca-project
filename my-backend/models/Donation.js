import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "bank",
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Donation",
  donationSchema
);