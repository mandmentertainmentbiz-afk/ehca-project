import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

    shortDesc: {
      type: String,
      default: "",
      trim: true,
    },

    /* ================= PROJECT DATES ================= */
    date: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    /* ================= CATEGORY ================= */
    category: {
      type: String,
      enum: [
        "project",
        "ongoing",
        "upcoming",
        "past",
      ],
      default: "project",
      required: true,
    },

    /* ================= STATUS ================= */
    status: {
      type: String,
      enum: [
        "draft",
        "active",
        "completed",
      ],
      default: "active",
      required: true,
    },

    /* ================= MAIN IMAGE ================= */
    image: {
      type: String,
      default: "",
    },

    /* ================= GALLERY ================= */
    gallery: [
      {
        type: String,
      },
    ],

    /* ================= DONATION ================= */
    donationGoal: {
      type: Number,
      default: 0,
      min: 0,
    },

    donationRaised: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* ================= FEATURED ================= */
    featured: {
      type: Boolean,
      default: false,
    },

    /* ================= LOCATION ================= */
    location: {
      type: String,
      default: "",
      trim: true,
    },

    /* ================= SLUG ================= */
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /* ================= SEO ================= */
    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },

    metaDesc: {
      type: String,
      default: "",
      trim: true,
    },

    /* ================= TAGS ================= */
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    /* ================= VIEWS ================= */
    views: {
      type: Number,
      default: 0,
    },

    /* ================= PAST EVENT ================= */
    isPastEvent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= AUTO GENERATE SLUG + AUTO PAST EVENT ================= */
projectSchema.pre("save", function (next) {
  try {
    /* ---------- GENERATE SLUG ---------- */
    if (!this.slug && this.title) {
      const cleanTitle = this.title
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "-");

      this.slug = `${cleanTitle}-${Date.now()}`;
    }

    /* ---------- AUTO DETECT PAST EVENT ---------- */
    if (this.date) {
      const now = new Date();

      const projectDate = new Date(this.date);

      // Event becomes past after 11:59:59 PM
      projectDate.setHours(23, 59, 59, 999);

      if (now > projectDate) {
        this.isPastEvent = true;

        // Change category to past automatically
        if (this.category !== "project") {
          this.category = "past";
        }

        // Auto complete active events
        if (this.status === "active") {
          this.status = "completed";
        }

      } else {
        this.isPastEvent = false;
      }
    }

    next();

  } catch (error) {
    next(error);
  }
});

/* ================= INDEXES ================= */
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ featured: 1 });

/* ================= MODEL ================= */
const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectSchema);

export default Project;