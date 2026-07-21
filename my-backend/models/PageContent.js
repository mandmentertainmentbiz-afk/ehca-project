import mongoose from "mongoose";

/* ==========================
   REUSABLE ITEM SCHEMA
========================== */

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

/* ==========================
   PAGE CONTENT SCHEMA
========================== */

const PageContentSchema =
  new mongoose.Schema(
    {
      page: {
        type: String,
        required: true,
        enum: [
  "home",
  "about",
  "contact",
  "donate",
  "gallery",
  "members",
  "partners",
  "volunteer",
],
      },

      section: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        default: "",
      },

      subtitle: {
        type: String,
        default: "",
      },

      content: {
        type: String,
        default: "",
      },

      image: {
        type: String,
        default: "",
      },

      buttonText: {
        type: String,
        default: "",
      },

      buttonLink: {
        type: String,
        default: "",
      },

      items: {
        type: [ItemSchema],
        default: [],
      },

      order: {
        type: Number,
        default: 0,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

/* ==========================
   EXPORT MODEL
========================== */

export default mongoose.model(
  "PageContent",
  PageContentSchema
);