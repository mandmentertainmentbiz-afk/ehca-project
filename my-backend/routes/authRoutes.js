import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* ================= REGISTER ADMIN ================= */
router.post("/register", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    const admin = new Admin({
      email: req.body.email,
      password: hashed,
    });

    await admin.save();
    res.json({ message: "Admin created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(req.body.password, admin.password);

    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= CHANGE ADMIN LOGIN DETAILS ================= */
router.put("/change-credentials", verifyToken, async (req, res) => {
  try {
    const {
      currentPassword,
      newEmail,
      newPassword,
      confirmPassword,
    } = req.body;

    // Find logged-in admin
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin account not found",
      });
    }

    // Current password is required
    if (!currentPassword) {
      return res.status(400).json({
        message: "Current password is required",
      });
    }

    // Verify current password
    const valid = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!valid) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // At least email or password must be changed
    if (!newEmail && !newPassword) {
      return res.status(400).json({
        message: "Enter a new email or new password",
      });
    }

    /* ================= CHANGE EMAIL ================= */

    if (newEmail) {
      const email = newEmail.trim().toLowerCase();

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Please enter a valid email address",
        });
      }

      // Check if another admin already uses this email
      const existingAdmin = await Admin.findOne({
        email,
        _id: { $ne: admin._id },
      });

      if (existingAdmin) {
        return res.status(400).json({
          message: "That email address is already in use",
        });
      }

      admin.email = email;
    }

    /* ================= CHANGE PASSWORD ================= */

    if (newPassword) {
      if (newPassword.length < 8) {
        return res.status(400).json({
          message: "Password must be at least 8 characters",
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          message: "New passwords do not match",
        });
      }

      // Hash new password
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();

    return res.status(200).json({
      success: true,
      message:
        "Login details updated successfully. Please log in again.",
    });
  } catch (err) {
    console.error("CHANGE CREDENTIALS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to update login details",
    });
  }
});

export default router;