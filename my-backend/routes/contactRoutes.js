import express from "express";
import { Resend } from "resend";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } = await resend.emails.send({
      // Use a Resend-verified sender here.
      // For initial Resend testing, you can use onboarding@resend.dev
      from: process.env.EMAIL_FROM,

      // Your receiving email address
      to: process.env.CONTACT_EMAIL,

      // Replies will go directly to the person who submitted the form
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

    if (error) {
      console.error("RESEND ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to send message",
      });
    }

    console.log("CONTACT EMAIL SENT:", data?.id);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("CONTACT EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

export default router;