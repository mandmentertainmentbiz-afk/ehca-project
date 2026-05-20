import express from "express";
import Project from "../models/Project.js";
import { upload } from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

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

      /* ================= VALIDATION ================= */
      if (!title || !desc || !date) {
        return res.status(400).json({
          error: "Title, description and date are required",
        });
      }

      /* ================= FORMAT TAGS SAFELY ================= */
      let formattedTags = [];

      if (tags) {
        if (Array.isArray(tags)) {
          formattedTags = tags;
        } else if (typeof tags === "string") {
          formattedTags = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        }
      }

      /* ================= CREATE PROJECT ================= */
      const project = new Project({
        title: title.trim(),
        desc: desc.trim(),
        shortDesc: shortDesc?.trim() || "",

        date,
        endDate: endDate || null,

        category: category || "project",

        status: status || "active",

        featured:
          featured === "true" || featured === true,

        donationGoal: Number(donationGoal) || 0,
        donationRaised: Number(donationRaised) || 0,

        location: location?.trim() || "",

        metaTitle: metaTitle?.trim() || "",
        metaDesc: metaDesc?.trim() || "",

        tags: formattedTags,

        image: req.file
          ? `/uploads/${req.file.filename}`
          : "",
      });

      await project.save();

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        project,
      });

    } catch (err) {
      console.error("CREATE ERROR:", err);

      res.status(500).json({
        success: false,
        error: err.message,
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

    res.json(projects);

  } catch (err) {
    console.error("FETCH ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* ================= GET SINGLE PROJECT ================= */
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);

  } catch (err) {
    console.error("GET ONE ERROR:", err);

    res.status(500).json({
      error: err.message,
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

      /* ================= FORMAT TAGS SAFELY ================= */
      let formattedTags = [];

      if (tags) {
        if (Array.isArray(tags)) {
          formattedTags = tags;
        } else if (typeof tags === "string") {
          formattedTags = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        }
      }

      /* ================= UPDATE DATA ================= */
      const updatedData = {
        title: title?.trim(),
        desc: desc?.trim(),
        shortDesc: shortDesc?.trim(),

        date,
        endDate: endDate || null,

        category,
        status,

        featured:
          featured === "true" || featured === true,

        donationGoal: Number(donationGoal) || 0,
        donationRaised: Number(donationRaised) || 0,

        location: location?.trim() || "",

        metaTitle: metaTitle?.trim() || "",
        metaDesc: metaDesc?.trim() || "",

        tags: formattedTags,
      };

      /* ================= IMAGE ================= */
      if (req.file) {
        updatedData.image = `/uploads/${req.file.filename}`;
      }

      /* ================= UPDATE PROJECT ================= */
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      res.json({
        success: true,
        message: "Project updated successfully",
        project,
      });

    } catch (err) {
      console.error("UPDATE ERROR:", err);

      res.status(500).json({
        success: false,
        error: err.message,
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
      const project = await Project.findByIdAndDelete(
        req.params.id
      );

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      res.json({
        success: true,
        message: "Project deleted successfully",
      });

    } catch (err) {
      console.error("DELETE ERROR:", err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);

export default router;