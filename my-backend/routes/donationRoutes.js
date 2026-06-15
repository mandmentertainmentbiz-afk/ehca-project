import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

/* ================= TEST ================= */
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Donation route working",
  });
});

/* ================= CREATE DONATION ================= */
router.post("/", async (req, res) => {
  try {
    const donation = await Donation.create({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      message: req.body.message,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      donation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ================= GET ALL DONATIONS ================= */
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      donations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
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

    res.json({
      success: true,
      message: "Donation marked completed",
      donation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ================= DELETE ================= */
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

    res.json({
      success: true,
      message: "Donation deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;