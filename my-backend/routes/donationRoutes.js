import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

/* CREATE DONATION */
router.post("/", async (req, res) => {
  try {
    console.log("DONATION RECEIVED");
    console.log(req.body);

    const donation =
      await Donation.create(req.body);

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

/* TEST ROUTE */
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Donation route working",
  });
});

export default router;