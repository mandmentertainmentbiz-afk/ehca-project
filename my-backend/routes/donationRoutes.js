import express from "express";
import Donation from "../models/Donation.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ================= CREATE DONATION ================= */
router.post("/", async (req, res) => {
  console.log("========== DONATION REQUEST ==========");
  console.log(req.body);

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

    const donationAmount = Number(amount);

    if (
      isNaN(donationAmount) ||
      donationAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a valid donation amount",
      });
    }

    const donation = await Donation.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || "",
      amount: donationAmount,
      paymentMethod: paymentMethod || "bank",
      message: message || "",
    });

    console.log(
      "✅ Donation saved:",
      donation._id
    );

    res.status(201).json({
      success: true,
      message:
        "Donation submitted successfully",
      donation,
    });

  } catch (err) {
    console.error(
      "❌ CREATE DONATION ERROR:"
    );
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        "Failed to submit donation",
      error: err.message,
    });
  }
});

    /* ================= VALIDATION ================= */
    if (!fullName || !email || !amount) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, email and amount are required",
      });
    }

    const donationAmount = Number(amount);

    if (
      isNaN(donationAmount) ||
      donationAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a valid donation amount",
      });
    }

    /* ================= CREATE ================= */
    const donation = await Donation.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || "",
      amount: donationAmount,
      paymentMethod:
        paymentMethod || "bank",
      message: message || "",
    });

    res.status(201).json({
      success: true,
      message:
        "Donation submitted successfully",
      donation,
    });

  } catch (err) {
    console.error(
      "❌ CREATE DONATION ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to submit donation",
      error: err.message,
    });
  }
});

/* ================= GET ALL DONATIONS ================= */
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Donation routes working",
  });
});


/* ================= GET SINGLE DONATION ================= */
router.get("/:id", verifyToken, async (req, res) => {
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

    res.status(200).json({
      success: true,
      donation,
    });

  } catch (err) {
    console.error(
      "❌ GET DONATION ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch donation",
      error: err.message,
    });
  }
});

/* ================= MARK COMPLETED ================= */
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
        "❌ COMPLETE DONATION ERROR:",
        err
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update donation",
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
        "❌ DELETE DONATION ERROR:",
        err
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete donation",
        error: err.message,
      });
    }
  }
);

export default router;