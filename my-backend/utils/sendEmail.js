import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"EHCA NGO" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(
      "✅ Email sent:",
      info.messageId
    );

  } catch (error) {
    console.error(
      "❌ SEND EMAIL ERROR:",
      error.message
    );

    throw error;
  }
};

export default sendEmail; 