import express from "express";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import { upload } from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ================= FORMAT TAGS ================= */
const formatTags = (tags) => {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

/* ================= CREATE PROJECT ================= */
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        desc,
        shortDesc,
        date,
        endDate,
        category,
        status,
        featured,
        donationGoal,
        donationRaised,
        location,
        metaTitle,
        metaDesc,
        tags,
      } = req.body;

      if (!title || !desc || !date) {
        return res.status(400).json({
          success: false,
          message:
            "Title, description and date are required",
        });
      }

      const project = new Project({
        title: title.trim(),
        desc: desc.trim(),
        shortDesc: shortDesc?.trim() || "",
        date,
        endDate: endDate || null,
        category: category || "project",
        status: status || "active",

        featured:
          featured === true ||
          featured === "true",

        donationGoal:
          donationGoal !== undefined
            ? Number(donationGoal)
            : 0,

        donationRaised:
          donationRaised !== undefined
            ? Number(donationRaised)
            : 0,

        location: location?.trim() || "",

        metaTitle: metaTitle?.trim() || "",
        metaDesc: metaDesc?.trim() || "",

        tags: formatTags(tags),

        image: req.file
          ? req.file.path
          : "",
      });

      await project.save();

      res.status(201).json({
        success: true,
        message:
          "Project created successfully",
        project,
      });
    } catch (err) {
      console.error(
        "❌ CREATE PROJECT ERROR:"
      );
      console.error(err);

      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Failed to create project",
      });
    }
  }
);

/* ================= GET ALL PROJECTS ================= */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (err) {
    console.error(
      "❌ FETCH PROJECTS ERROR:"
    );
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to fetch projects",
    });
  }
});

/* ================= GET SINGLE PROJECT ================= */
router.get("/:id", async (req, res) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (err) {
    console.error(
      "❌ GET PROJECT ERROR:"
    );
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to fetch project",
    });
  }
});

/* ================= UPDATE PROJECT ================= */
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID",
        });
      }

      const {
        title,
        desc,
        shortDesc,
        date,
        endDate,
        category,
        status,
        featured,
        donationGoal,
        donationRaised,
        location,
        metaTitle,
        metaDesc,
        tags,
      } = req.body;

      const updatedData = {};

      if (title !== undefined)
        updatedData.title = title.trim();

      if (desc !== undefined)
        updatedData.desc = desc.trim();

      if (shortDesc !== undefined)
        updatedData.shortDesc =
          shortDesc.trim();

      if (date !== undefined)
        updatedData.date = date;

      if (endDate !== undefined)
        updatedData.endDate = endDate;

      if (category !== undefined)
        updatedData.category = category;

      if (status !== undefined)
        updatedData.status = status;

      if (featured !== undefined) {
        updatedData.featured =
          featured === true ||
          featured === "true";
      }

      if (donationGoal !== undefined) {
        updatedData.donationGoal =
          Number(donationGoal);
      }

      if (donationRaised !== undefined) {
        updatedData.donationRaised =
          Number(donationRaised);
      }

      if (location !== undefined) {
        updatedData.location =
          location.trim();
      }

      if (metaTitle !== undefined) {
        updatedData.metaTitle =
          metaTitle.trim();
      }

      if (metaDesc !== undefined) {
        updatedData.metaDesc =
          metaDesc.trim();
      }

      if (tags !== undefined) {
        updatedData.tags =
          formatTags(tags);
      }

      if (req.file) {
        updatedData.image =
          req.file.path;
      }

      const project =
        await Project.findByIdAndUpdate(
          req.params.id,
          updatedData,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Project updated successfully",
        project,
      });
    } catch (err) {
      console.error(
        "❌ UPDATE PROJECT ERROR:"
      );
      console.error(err);

      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Failed to update project",
      });
    }
  }
);

/* ================= DELETE PROJECT ================= */
router.delete(
  "/:id",
  verifyToken,
  async (req, res) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID",
        });
      }

      const project =
        await Project.findByIdAndDelete(
          req.params.id
        );

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Project deleted successfully",
      });
    } catch (err) {
      console.error(
        "❌ DELETE PROJECT ERROR:"
      );
      console.error(err);

      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Failed to delete project",
      });
    }
  }
);

export default router;