import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

/*
|--------------------------------------------------------------------------
| Resend
|--------------------------------------------------------------------------
*/

const resend = new Resend(process.env.RESEND_API_KEY);

/*
|--------------------------------------------------------------------------
| Send Email
|--------------------------------------------------------------------------
*/

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  replyTo,
}) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing");
    }

    if (!process.env.EMAIL_FROM) {
      throw new Error("EMAIL_FROM is missing");
    }

    if (!to) {
      throw new Error("Email recipient is missing");
    }

    if (!subject) {
      throw new Error("Email subject is missing");
    }

    if (!html && !text) {
      throw new Error("Email must contain html or text");
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [to],
      subject,
      html,
      ...(text ? { text } : {}),
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error("❌ RESEND EMAIL ERROR:", error);

      throw new Error(
        error.message || "Failed to send email through Resend"
      );
    }

    console.log("✅ EMAIL SENT:", {
      id: data?.id,
      to,
      subject,
    });

    return data;
  } catch (error) {
    console.error("❌ SEND EMAIL ERROR:", error);

    throw error;
  }
};

export default sendEmail;