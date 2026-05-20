import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["member", "volunteer"],
      default: "member",
    },

    skills: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },

    approved: {
      type: Boolean,
      default: false,
    },

    membershipId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

/* AUTO MEMBER ID */
memberSchema.pre("save", function (next) {
  if (!this.membershipId) {
    this.membershipId =
      "EHCA-" +
      Math.floor(100000 + Math.random() * 900000);
  }

  next();
});

const Member =
  mongoose.model("Member", memberSchema);

export default Member;