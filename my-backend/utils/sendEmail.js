import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/* ================= EMAIL TRANSPORTER ================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // must be false for port 587
  family: 4, // force IPv4

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

/* ================= VERIFY SMTP ================= */
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP CONNECTION ERROR:");
    console.error(error);
  } else {
    console.log("✅ SMTP SERVER READY");
  }
});

/* ================= SEND EMAIL FUNCTION ================= */
const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    if (!to) {
      throw new Error("Recipient email is required");
    }

    const info = await transporter.sendMail({
      from: `"EHCA NGO" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("📧 Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ SEND EMAIL ERROR:");
    console.error(error);

    throw error;
  }
};

export default sendEmail;