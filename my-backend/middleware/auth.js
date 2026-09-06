import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "No token",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "No token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const admin = await Admin.findById(decoded.id).select(
      "tokenVersion"
    );

    if (!admin) {
      return res.status(401).json({
        error: "Admin account not found",
      });
    }

    // Invalidate tokens created before a credential change
    const currentTokenVersion = admin.tokenVersion ?? 0;
    const tokenVersion = decoded.tokenVersion ?? 0;

    if (tokenVersion !== currentTokenVersion) {
      return res.status(401).json({
        error: "Session expired. Please log in again.",
      });
    }

    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);

    return res.status(403).json({
      error: "Invalid or expired token",
    });
  }
};