import express from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      res.json({
        success: true,
        imageUrl: req.file.path,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

export default router;