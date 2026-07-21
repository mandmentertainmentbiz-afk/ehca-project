import express from "express";

import {
  getPageContents,
  getPageContent,
  createPageContent,
  updatePageContent,
  deletePageContent,
  updateSectionOrder,
} from "../controllers/pageContentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===================================
   PUBLIC ROUTES
=================================== */

// Get every section
router.get("/", getPageContents);

// Get all sections for one page
// Example:
// /api/page-content/home
// /api/page-content/about
router.get("/:page", getPageContent);

/* ===================================
   ADMIN ROUTES
=================================== */

// Create section
router.post("/", protect, createPageContent);

// Update section
router.put("/:id", protect, updatePageContent);

// Delete section
router.delete("/:id", protect, deletePageContent);

// Update section order
router.put(
  "/reorder/all",
  protect,
  updateSectionOrder
);

export default router;