import express from "express";
import Member from "../models/Member.js";
import { verifyToken } from "../middleware/auth.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

/* ================= EHCA LOGO ================= */
const EHCA_LOGO =
  "https://ehca-project.vercel.app/images/logo.png";

/* ================= GENERATE MEMBERSHIP ID ================= */
const generateMembershipId = () => {
  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `EHCA-${Date.now()}-${random}`;
};

/* ================= EMAIL TEMPLATE ================= */
const emailTemplate = ({
  title,
  message,
  color,
  memberName,
  extraContent = "",
}) => {
  return `
    <div style="
      font-family: Arial, sans-serif;
      background:#f4f7fb;
      padding:40px 20px;
    ">

      <div style="
        max-width:600px;
        margin:auto;
        background:white;
        border-radius:14px;
        overflow:hidden;
        box-shadow:0 4px 15px rgba(0,0,0,0.08);
      ">

        <!-- HEADER -->
        <div style="
          background:${color};
          padding:30px;
          text-align:center;
        ">

          <img
            src="${EHCA_LOGO}"
            alt="EHCA Logo"
            style="
              width:90px;
              margin-bottom:10px;
            "
          />

          <h1 style="
            color:white;
            margin:0;
            font-size:28px;
          ">
            EHCA NGO
          </h1>

        </div>

        <!-- BODY -->
        <div style="padding:40px;">

          <h2 style="
            margin-top:0;
            color:${color};
          ">
            ${title}
          </h2>

          <p>
            Hello
            <b>${memberName}</b>,
          </p>

          <p>
            ${message}
          </p>

          ${extraContent}

          <br />

          <p>
            Regards,<br />
            <b>EHCA Team</b>
          </p>

        </div>

        <!-- FOOTER -->
        <div style="
          background:#f8fafc;
          padding:20px;
          text-align:center;
          font-size:13px;
          color:#64748b;
        ">
          © 2026 EHCA NGO.
          All rights reserved.
        </div>

      </div>
    </div>
  `;
};

/* ================= CREATE MEMBER ================= */
router.post("/", async (req, res) => {
  try {

    const {
      fullName,
      email,
      phone,
      country,
      organization,
      role,
      message,
    } = req.body;

    /* ================= VALIDATION ================= */
    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message:
          "Full name and email are required",
      });
    }

    /* ================= CHECK EXISTING ================= */
    const existingMember =
      await Member.findOne({
        email: email.toLowerCase(),
      });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message:
          "This email already submitted a request",
      });
    }

    /* ================= CREATE MEMBER ================= */
    const member = new Member({
      fullName: fullName.trim(),

      email:
        email.toLowerCase().trim(),

      phone:
        phone?.trim() || "",

      country:
        country?.trim() || "",

      organization:
        organization?.trim() || "",

      role:
        role || "member",

      message:
        message?.trim() || "",

      approved: false,

      status: "pending",
    });

    await member.save();

    res.status(201).json({
      success: true,
      message:
        role === "partner"
          ? "Partnership request submitted successfully"
          : "Membership request submitted successfully",
      member,
    });

  } catch (err) {

    console.error(
      "❌ MEMBER SUBMISSION ERROR:"
    );

    console.error(err);

    res.status(500).json({
      success: false,
      message:
        err.message ||
        "Failed to submit request",
    });
  }
});

/* ================= GET ALL MEMBERS ================= */
router.get(
  "/",
  verifyToken,
  async (req, res) => {
    try {

      const members =
        await Member.find().sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        count: members.length,
        members,
      });

    } catch (err) {

      console.error(
        "❌ GET MEMBERS ERROR:"
      );

      console.error(err);

      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Failed to fetch members",
      });
    }
  }
);

/* ================= GET SINGLE MEMBER ================= */
router.get(
  "/:id",
  verifyToken,
  async (req, res) => {
    try {

      const member =
        await Member.findById(
          req.params.id
        );

      if (!member) {
        return res.status(404).json({
          success: false,
          message: "Member not found",
        });
      }

      res.status(200).json({
        success: true,
        member,
      });

    } catch (err) {

      console.error(
        "❌ GET MEMBER ERROR:"
      );

      console.error(err);

      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Failed to fetch member",
      });
    }
  }
);

/* ================= APPROVE MEMBER ================= */
router.put(
  "/:id/approve",
  verifyToken,
  async (req, res) => {
    try {
      const member =
        await Member.findById(
          req.params.id
        );

      if (!member) {
        return res.status(404).json({
          success: false,
          message: "Member not found",
        });
      }

      /* UPDATE MEMBER */
      if (!member.membershipId) {
        member.membershipId =
          generateMembershipId();
      }

      member.approved = true;
      member.status = "approved";

      await member.save();

      /* RETURN SUCCESS IMMEDIATELY */
      res.status(200).json({
        success: true,
        message:
          "Member approved successfully",
        member,
      });

      /* SEND EMAIL IN BACKGROUND */
      sendEmail({
        to: member.email,
        subject:
          "EHCA Membership Approved",
        html: emailTemplate({
          title:
            "Membership Approved 🎉",

          message:
            "We are pleased to inform you that your membership request has been approved.",

          color: "#16a34a",

          memberName:
            member.fullName,

          extraContent: `
            <div style="
              background:#f1f5f9;
              padding:20px;
              border-radius:10px;
              margin:25px 0;
            ">
              <p>
                <b>Membership ID:</b>
              </p>

              <h2 style="
                color:#2563eb;
                letter-spacing:2px;
              ">
                ${member.membershipId}
              </h2>
            </div>
          `,
        }),
      })
        .then(() => {
          console.log(
            "✅ Approval email sent:",
            member.email
          );
        })
        .catch((err) => {
          console.error(
            "❌ Approval email failed:"
          );
          console.error(
            err.message
          );
        });

    } catch (err) {
      console.error(
        "❌ APPROVE MEMBER ERROR:"
      );

      console.error(err);

      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Failed to approve member",
      });
    }
  }
);
      /* ================= UPDATE MEMBER ================= */
      if (!member.membershipId) {
        member.membershipId =
          generateMembershipId();
      }

      member.approved = true;
      member.status = "approved";

      await member.save();

      /* ================= SEND EMAIL
      try {

        await sendEmail({
          to: member.email,

          subject:
            "EHCA Membership Approved",

          html: emailTemplate({
            title:
              "Membership Approved 🎉",

            message:
              "We are pleased to inform you that your membership request has been approved.",

            color: "#16a34a",

            memberName:
              member.fullName,

            extraContent: `
              <div style="
                background:#f1f5f9;
                padding:20px;
                border-radius:10px;
                margin:25px 0;
              ">

                <p style="
                  margin:0 0 10px 0;
                ">
                  <b>Membership ID:</b>
                </p>

                <h2 style="
                  margin:0;
                  color:#2563eb;
                  letter-spacing:2px;
                ">
                  ${member.membershipId}
                </h2>

              </div>
            `,
          }),
        });

        console.log(
          "✅ Approval email sent:",
          member.email
        );

      } catch (emailError) {

        console.error(
          "❌ EMAIL ERROR:"
        );

        console.error(
          emailError.message
        );
      }

      res.status(200).json({
        success: true,
        message:
          "Member approved successfully",
        member,
      });

    } catch (err) {

      console.error(
        "❌ APPROVE MEMBER ERROR:"
      );

      console.error(err);

      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Failed to approve member",
      });
    }
  }
);  ================= */

/* ================= REJECT MEMBER ================= */
router.put(
  "/:id/reject",
  verifyToken,
  async (req, res) => {
    try {

      const member =
        await Member.findById(
          req.params.id
        );

      if (!member) {
        return res.status(404).json({
          success: false,
          message: "Member not found",
        });
      }

      member.approved = false;
      member.status = "rejected";

      await member.save();

      /* ================= SEND EMAIL ================= */
      try {

        await sendEmail({
          to: member.email,

          subject:
            "EHCA Membership Update",

          html: emailTemplate({
            title:
              "Membership Request Update",

            message:
              "After reviewing your application, we regret to inform you that your request was not approved at this time.",

            color: "#dc2626",

            memberName:
              member.fullName,
          }),
        });

        console.log(
          "✅ Rejection email sent:",
          member.email
        );

      } catch (emailError) {

        console.error(
          "❌ REJECTION EMAIL ERROR:"
        );

        console.error(
          emailError.message
        );
      }

      res.status(200).json({
        success: true,
        message:
          "Member rejected successfully",
        member,
      });

    } catch (err) {

      console.error(
        "❌ REJECT MEMBER ERROR:"
      );

      console.error(err);

      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Failed to reject member",
      });
    }
  }
);

/* ================= DELETE MEMBER ================= */
router.delete(
  "/:id",
  verifyToken,
  async (req, res) => {
    try {

      const member =
        await Member.findByIdAndDelete(
          req.params.id
        );

      if (!member) {
        return res.status(404).json({
          success: false,
          message: "Member not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Member deleted successfully",
      });

    } catch (err) {

      console.error(
        "❌ DELETE MEMBER ERROR:"
      );

      console.error(err);

      res.status(500).json({
        success: false,
        message:
          err.message ||
          "Failed to delete member",
      });
    }
  }
);

export default router;