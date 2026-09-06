import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* =========================================================
   REGISTER ADMIN
   ========================================================= */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Clean email
    const cleanEmail = email.trim().toLowerCase();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: cleanEmail,
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "An admin with this email already exists",
      });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new Admin({
      email: cleanEmail,
      password: hashed,
      tokenVersion: 0,
    });

    await admin.save();

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to create admin",
    });
  }
});

/* =========================================================
   LOGIN
   ========================================================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Clean email
    const cleanEmail = email.trim().toLowerCase();

    // Find admin
    const admin = await Admin.findOne({
      email: cleanEmail,
    });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const valid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!valid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: admin._id,
        tokenVersion: admin.tokenVersion ?? 0,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

/* =========================================================
   CHANGE ADMIN LOGIN DETAILS
   ========================================================= */
router.put(
  "/change-credentials",
  verifyToken,
  async (req, res) => {
    try {
      const {
        currentPassword,
        newEmail,
        newPassword,
        confirmPassword,
      } = req.body;

      /* =====================================================
         FIND LOGGED-IN ADMIN
         ===================================================== */

      const admin = await Admin.findById(req.user.id);

      if (!admin) {
        return res.status(404).json({
          message: "Admin account not found",
        });
      }

      /* =====================================================
         CURRENT PASSWORD REQUIRED
         ===================================================== */

      if (!currentPassword) {
        return res.status(400).json({
          message: "Current password is required",
        });
      }

      /* =====================================================
         VERIFY CURRENT PASSWORD
         ===================================================== */

      const valid = await bcrypt.compare(
        currentPassword,
        admin.password
      );

      if (!valid) {
        return res.status(400).json({
          message: "Current password is incorrect",
        });
      }

      /* =====================================================
         AT LEAST ONE CHANGE REQUIRED
         ===================================================== */

      if (!newEmail && !newPassword) {
        return res.status(400).json({
          message:
            "Enter a new email or new password",
        });
      }

      /* =====================================================
         CHANGE EMAIL
         ===================================================== */

      if (newEmail) {
        const email = newEmail.trim().toLowerCase();

        // Validate email
        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          return res.status(400).json({
            message:
              "Please enter a valid email address",
          });
        }

        // Check whether another admin uses this email
        const existingAdmin = await Admin.findOne({
          email,
          _id: { $ne: admin._id },
        });

        if (existingAdmin) {
          return res.status(400).json({
            message:
              "That email address is already in use",
          });
        }

        admin.email = email;
      }

      /* =====================================================
         CHANGE PASSWORD
         ===================================================== */

      if (newPassword) {
        if (newPassword.length < 8) {
          return res.status(400).json({
            message:
              "Password must be at least 8 characters",
          });
        }

        if (newPassword !== confirmPassword) {
          return res.status(400).json({
            message: "New passwords do not match",
          });
        }

        // Prevent using the same password
        const samePassword = await bcrypt.compare(
          newPassword,
          admin.password
        );

        if (samePassword) {
          return res.status(400).json({
            message:
              "New password must be different from your current password",
          });
        }

        // Hash new password
        admin.password = await bcrypt.hash(
          newPassword,
          10
        );
      }

      /* =====================================================
         INVALIDATE ALL PREVIOUS JWT TOKENS
         ===================================================== */

      admin.tokenVersion =
        (admin.tokenVersion ?? 0) + 1;

      /* =====================================================
         SAVE ADMIN
         ===================================================== */

      await admin.save();

      /* =====================================================
         SUCCESS
         ===================================================== */

      return res.status(200).json({
        success: true,
        message:
          "Login details updated successfully. Please log in again.",
      });
    } catch (err) {
      console.error(
        "CHANGE CREDENTIALS ERROR:",
        err
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update login details",
      });
    }
  }
);

export default router;