import mongoose from "mongoose";

/* ================= PROJECT SCHEMA ================= */
const projectSchema =
  new mongoose.Schema(
    {
      /* ================= BASIC INFO ================= */
      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },

      desc: {
        type: String,
        required: true,
        trim: true,
      },

      shortDesc: {
        type: String,
        trim: true,
        default: "",
        maxlength: 300,
      },

      /* ================= DATES ================= */
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
      },

      /* ================= MAIN IMAGE ================= */
      image: {
        type: String,
        default: "",
      },

      /* ================= IMAGE GALLERY ================= */
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
        trim: true,
        default: "",
      },

      /* ================= SEO ================= */
      slug: {
  type: String,
  lowercase: true,
  trim: true,
},

      metaTitle: {
        type: String,
        trim: true,
        default: "",
      },

      metaDesc: {
        type: String,
        trim: true,
        default: "",
      },

      /* ================= TAGS ================= */
      tags: [
        {
          type: String,
          trim: true,
          lowercase: true,
        },
      ],

      /* ================= ANALYTICS ================= */
      views: {
        type: Number,
        default: 0,
      },

      /* ================= AUTO DETECT ================= */
      isPastEvent: {
        type: Boolean,
        default: false,
      },
    },

    {
      timestamps: true,
    }
  );

/* ================= GENERATE SLUG ================= */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(
      /[^a-zA-Z0-9\s-]/g,
      ""
    )
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/* ================= PRE SAVE ================= */
projectSchema.pre(
  "save",
  function (next) {
    try {

      /* ================= AUTO SLUG ================= */
      if (
        this.title &&
        (!this.slug ||
          this.isModified("title"))
      ) {
        this.slug = `${generateSlug(
          this.title
        )}-${Date.now()}`;
      }

      /* ================= AUTO PAST EVENT ================= */
      if (this.date) {

        const now = new Date();

        const eventDate =
          new Date(this.date);

        /* End of the event day */
        eventDate.setHours(
          23,
          59,
          59,
          999
        );

        if (now > eventDate) {

          this.isPastEvent = true;

          /* Auto move to past */
          if (
            this.category !==
            "project"
          ) {
            this.category = "past";
          }

          /* Auto complete */
          if (
            this.status === "active"
          ) {
            this.status =
              "completed";
          }

        } else {

          this.isPastEvent = false;

          /* Auto upcoming */
          if (
            this.category ===
            "past"
          ) {
            this.category =
              "upcoming";
          }
        }
      }

  

    } catch (error) {

      next(error);
    }
  }
);

/* ================= INDEXES ================= */
projectSchema.index({
  category: 1,
});

projectSchema.index({
  status: 1,
});

projectSchema.index({
  featured: 1,
});

projectSchema.index({ slug: 1 });

projectSchema.index({
  createdAt: -1,
});

/* ================= MODEL ================= */
const Project =
  mongoose.models.Project ||
  mongoose.model(
    "Project",
    projectSchema
  );

export default Project;