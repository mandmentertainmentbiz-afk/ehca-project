import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    organization: String,
    email: String,
    phone: String,
    website: String,
    partnershipType: String,
    proposal: String,

    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Partner =
  mongoose.model("Partner", partnerSchema);

export default Partner;