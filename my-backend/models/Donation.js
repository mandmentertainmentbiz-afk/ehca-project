import mongoose from "mongoose";

/* ================= DONATION SCHEMA ================= */
const donationSchema = new mongoose.Schema(
  {
    /* ================= DONOR ================= */
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    /* ================= DONATION ================= */
    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },

    paymentMethod: {
      type: String,
      enum: ["bank", "paypal", "card", "cash"],
      default: "bank",
    },

    /* ================= PAYMENT STATUS ================= */
    status: {
      type: String,
      enum: [
        "pending",
        "completed",
        "failed",
        "cancelled",
      ],
      default: "pending",
    },

    /* ================= TRANSACTION ================= */
    transactionId: {
      type: String,
      default: "",
    },

    reference: {
      type: String,
      default: "",
    },

    /* ================= MESSAGE ================= */
    message: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },

    /* ================= ANONYMOUS ================= */
    anonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= GENERATE REFERENCE ================= */
donationSchema.pre("save", function (next) {
  try {
    if (!this.reference) {
      const random = Math.floor(
        100000 + Math.random() * 900000
      );

      this.reference = `EHCA-DON-${Date.now()}-${random}`;
    }

    next();

  } catch (error) {
    next(error);
  }
});

/* ================= INDEXES ================= */
donationSchema.index({
  email: 1,
});

donationSchema.index({
  status: 1,
});

donationSchema.index({
  createdAt: -1,
});

donationSchema.index({
  reference: 1,
});

/* ================= MODEL ================= */
const Donation =
  mongoose.models.Donation ||
  mongoose.model("Donation", donationSchema);

export default Donation;