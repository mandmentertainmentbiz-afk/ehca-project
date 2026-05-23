import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import donationRoutes from "./routes/donationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";

/* ================= LOAD ENV ================= */
dotenv.config();

console.log("EMAIL USER:", process.env.EMAIL_USER);

console.log(
  "EMAIL PASS EXISTS:",
  !!process.env.EMAIL_PASS
);

/* ================= APP ================= */
const app = express();

/* ================= FIX __dirname (ESM) ================= */
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

/* ================= CORS ================= */
app.use(
  cors({
    origin: [
      "https://mandmentertainmentbiz-6047s-projects.vercel.app",
      "http://localhost:5173",
    ],

    credentials: true,
  })
);

/* ================= BODY PARSER ================= */
app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

/* ================= STATIC FILES ================= */
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* ================= API ROUTES ================= */
app.use(
  "/api/donations",
  donationRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/members",
  memberRoutes
);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "EHCA API is running successfully 🚀",
  });
});

/* ================= ENV VALIDATION ================= */
const requiredEnvVars = [
  "MONGO_URI",
  "EMAIL_USER",
  "EMAIL_PASS",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(
      `❌ Missing environment variable: ${envVar}`
    );

    process.exit(1);
  }
});

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:");

  console.error(err);

  res.status(500).json({
    success: false,
    error:
      err.message ||
      "Internal Server Error",
  });
});

/* ================= PORT ================= */
const PORT =
  process.env.PORT || 5000;

/* ================= START SERVER ================= */
const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        serverSelectionTimeoutMS: 5000,
      }
    );

    console.log(
      "✅ MongoDB connected successfully"
    );

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });

  } catch (err) {
    console.error(
      "❌ MongoDB Connection Failed"
    );

    console.error(err.message);

    process.exit(1);
  }
};

startServer();