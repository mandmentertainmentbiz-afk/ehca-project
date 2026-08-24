import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    await transporter.sendMail({
  from: `"EHCA Website" <${process.env.SMTP_USER}>`,
  to: process.env.CONTACT_EMAIL,
  replyTo: email,
  subject: subject?.trim() || "New Contact Form Message",

  text: `
New message from EHCA website

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Subject: ${subject || "No subject"}

Message:
${message}
  `,

  html: `
    <h2>New Contact Form Message</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
    <p><strong>Subject:</strong> ${subject || "No subject"}</p>

    <hr />

    <h3>Message</h3>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `,
});

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("CONTACT EMAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

export default router;