import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

/* ================= ROUTES ================= */
import donationRoutes from "./routes/donationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";

/* ================= LOAD ENV ================= */
dotenv.config();

/* ================= APP ================= */
const app = express();

/* ================= __dirname FIX ================= */
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

/* ================= TRUST PROXY ================= */
app.set("trust proxy", 1);

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://ehca-project.vercel.app",
  "https://mandmentertainmentbiz-6047s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {

      // allow requests with no origin
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error("CORS not allowed")
        );
      }
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

/* ================= STATIC FILES ================= */
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* ================= HEALTH ROUTE ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "EHCA Backend API running successfully 🚀",
  });
});

/* ================= API ROUTES ================= */
app.use(
  "/api/donations",
  donationRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/members",
  memberRoutes
);

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR");

  console.error(err);

  res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

/* ================= ENV VALIDATION ================= */
const requiredEnvVars = [
  "MONGO_URI",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {

    console.error(
      `❌ Missing environment variable: ${envVar}`
    );

    process.exit(1);
  }
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