import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    amount: Number,
    paymentMethod: String,
    message: String,

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