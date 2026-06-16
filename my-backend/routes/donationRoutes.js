import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

/* ================= TEST ROUTE ================= */
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Donation route working",
  });
});

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

    if (!fullName || !email || !amount) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, email and amount are required",
      });
    }

    const donation = await Donation.create({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      amount: Number(amount),
      paymentMethod: paymentMethod || "bank",
      message: message?.trim() || "",
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Donation submitted successfully",
      donation,
    });

  } catch (error) {
    console.error("CREATE DONATION ERROR:", error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create donation",
    });
  }
});

/* ================= GET ALL DONATIONS ================= */
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      donations,
    });

  } catch (error) {
    console.error("GET DONATIONS ERROR:", error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch donations",
    });
  }
});

/* ================= GET SINGLE DONATION ================= */
router.get("/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(
      req.params.id
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      donation,
    });

  } catch (error) {
    console.error("GET DONATION ERROR:", error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch donation",
    });
  }
});

/* ================= MARK COMPLETED ================= */
router.put("/:id/complete", async (req, res) => {
  try {
    const donation =
      await Donation.findByIdAndUpdate(
        req.params.id,
        {
          status: "completed",
        },
        {
          new: true,
        }
      );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Donation marked as completed",
      donation,
    });

  } catch (error) {
    console.error(
      "COMPLETE DONATION ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update donation",
    });
  }
});

/* ================= DELETE DONATION ================= */
router.delete("/:id", async (req, res) => {
  try {
    const donation =
      await Donation.findByIdAndDelete(
        req.params.id
      );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Donation deleted successfully",
    });

  } catch (error) {
    console.error(
      "DELETE DONATION ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete donation",
    });
  }
});

export default router;