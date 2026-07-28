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

/* ==========================================
   PUBLIC ROUTES
========================================== */

// Get all page content
// GET /api/page-content
router.get("/", getPageContents);

// Get all sections for a specific page
// Examples:
// GET /api/page-content/page/home
// GET /api/page-content/page/about
router.get("/page/:page", getPageContent);

/* ==========================================
   ADMIN ROUTES
========================================== */

// Create a new section
// POST /api/page-content
router.post("/", protect, createPageContent);

// Reorder sections
// PUT /api/page-content/reorder/all
router.put(
  "/reorder/all",
  protect,
  updateSectionOrder
);

// Update a section
// PUT /api/page-content/:id
router.put(
  "/:id",
  protect,
  updatePageContent
);

// Delete a section
// DELETE /api/page-content/:id
router.delete(
  "/:id",
  protect,
  deletePageContent
);

export default router;