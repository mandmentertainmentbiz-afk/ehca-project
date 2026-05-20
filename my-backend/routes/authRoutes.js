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

/* ================= CHANGE PASSWORD ================= */
router.put("/change-password", verifyToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.user.id);

    const valid = await bcrypt.compare(oldPassword, admin.password);
    if (!valid) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;

    await admin.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= CHANGE EMAIL ================= */
router.put("/change-email", verifyToken, async (req, res) => {
  try {
    const { newEmail } = req.body;

    const admin = await Admin.findById(req.user.id);
    admin.email = newEmail;

    await admin.save();

    res.json({ message: "Email updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;