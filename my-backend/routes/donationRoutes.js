import express from "express";
import Donation from "../models/Donation.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ================= CREATE DONATION ================= */
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      amount,
      paymentMethod,
      message,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !amount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, email and amount are required",
      });
    }

    const donation = new Donation({
      fullName,
      email,
      phone,
      amount,
      paymentMethod,
      message,
    });

    await donation.save();

    res.status(201).json({
      success: true,
      message:
        "Donation submitted successfully",
      donation,
    });

  } catch (err) {
    console.error(
      "DONATION ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* ================= GET DONATIONS ================= */
router.get(
  "/",
  verifyToken,
  async (req, res) => {
    try {
      const donations =
        await Donation.find().sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        count: donations.length,
        donations,
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);

/* ================= MARK DONATION COMPLETED ================= */
router.put(
  "/:id/complete",
  verifyToken,
  async (req, res) => {
    try {
      const donation =
        await Donation.findById(
          req.params.id
        );

      if (!donation) {
        return res.status(404).json({
          success: false,
          message:
            "Donation not found",
        });
      }

      donation.status =
        "completed";

      await donation.save();

      res.status(200).json({
        success: true,
        message:
          "Donation marked as completed",
        donation,
      });

    } catch (err) {
      console.error(
        "COMPLETE DONATION ERROR:",
        err
      );

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);

/* ================= DELETE DONATION ================= */
router.delete(
  "/:id",
  verifyToken,
  async (req, res) => {
    try {
      const donation =
        await Donation.findByIdAndDelete(
          req.params.id
        );

      if (!donation) {
        return res.status(404).json({
          success: false,
          message:
            "Donation not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Donation deleted successfully",
      });

    } catch (err) {
      console.error(
        "DELETE DONATION ERROR:",
        err
      );

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);

export default router;