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
      trim: true,
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
      enum: ["member", "volunteer", "partner"],
      default: "member",
    },

    skills: {
      type: String,
      default: "",
    },

    message: {
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

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    membershipId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= GENERATE MEMBERSHIP ID ================= */
memberSchema.pre("save", async function (next) {
  
    if (!this.membershipId) {
      const randomNumbers = Math.floor(
        100000 + Math.random() * 900000
      );

      this.membershipId = `EHCA-${randomNumbers}`;
    }

    

  
});

const Member = mongoose.model(
  "Member",
  memberSchema
);

export default Member;