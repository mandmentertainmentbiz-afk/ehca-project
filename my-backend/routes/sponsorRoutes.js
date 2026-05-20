import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema(
  {
    companyName: String,

    logo: String,

    website: String,

    amount: Number,

    tier: {
      type: String,
      enum: [
        "gold",
        "silver",
        "platinum",
      ],
      default: "silver",
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sponsor =
  mongoose.model("Sponsor", sponsorSchema);

export default Sponsor;