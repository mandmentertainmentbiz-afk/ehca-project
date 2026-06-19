import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

/* ================= ROUTES ================= */
import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";

/* ================= LOAD ENV ================= */
dotenv.config();

/* ================= APP ================= */
const app = express();

/* ================= TRUST PROXY ================= */
app.set("trust proxy", 1);

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",

  // Custom Domains
  "https://elevatehopecharity.org",
  "https://www.elevatehopecharity.org",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🌍 Request Origin:", origin);

      // Allow Postman, mobile apps, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      // Allow localhost + custom domains
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow all Vercel deployments
      if (
        typeof origin === "string" &&
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      console.log("❌ Blocked Origin:", origin);

      return callback(
        new Error(`CORS not allowed: ${origin}`)
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
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

/* ================= ROOT ROUTE ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "EHCA Backend API running successfully 🚀",
  });
});

/* ================= TEST ROUTE ================= */
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

/* ================= API ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/donations", donationRoutes);

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR");
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
});

/* ================= ENV VALIDATION ================= */
const requiredEnvVars = [
  "MONGO_URI",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(
      `❌ Missing environment variable: ${envVar}`
    );
    process.exit(1);
  }
}

/* ================= PORT ================= */
const PORT = process.env.PORT || 5000;

/* ================= START SERVER ================= */
const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "✅ MongoDB connected successfully"
    );

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "❌ MongoDB Connection Failed"
    );

    console.error(error);

    process.exit(1);
  }
};

startServer();