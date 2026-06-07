import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

/* ================= ROUTES ================= */
import donationRoutes from "./routes/donationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";

/* ================= LOAD ENV ================= */
dotenv.config();

/* ================= APP ================= */
const app = express();

/* ================= TRUST PROXY ================= */
app.set("trust proxy", 1);

/* ================= CORS ================= */
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🌍 Request Origin:", origin);

      // Allow requests without origin
      if (!origin) {
        return callback(null, true);
      }

      // Allow localhost during development
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }

      // Allow all Vercel deployments
      if (origin.endsWith(".vercel.app")) {
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
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🌍 Request Origin:", origin);

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
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
      "DELETE",
      "PATCH",
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

/* ================= HEALTH ROUTE ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EHCA Backend API running successfully 🚀",
  });
});

/* ================= API ROUTES ================= */
app.use("/api/donations", donationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);

/* ================= 404 ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ================= GLOBAL ERROR ================= */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR");
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================= ENV VALIDATION ================= */
const requiredEnvVars = [
  "MONGO_URI",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(
      `❌ Missing environment variable: ${envVar}`
    );

    process.exit(1);
  }
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

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

  } catch (err) {
    console.error(
      "❌ MongoDB Connection Failed"
    );

    console.error(err.message);

    process.exit(1);
  }
};

startServer();