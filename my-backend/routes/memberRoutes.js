import express from "express";
import Member from "../models/Member.js";
import { verifyToken } from "../middleware/auth.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

/* ================= GENERATE MEMBERSHIP ID ================= */
const generateMembershipId = () => {
  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `EHCA-${Date.now()}-${random}`;
};

/* ================= EHCA LOGO ================= */
const EHCA_LOGO =
  "https://yourdomain.com/logo.png";

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

    /* ================= CHECK EXISTING MEMBER ================= */
    const existingMember =
      await Member.findOne({
        email: email.toLowerCase(),
      });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message:
          "A membership request with this email already exists",
      });
    }

    /* ================= CREATE MEMBER ================= */
    const member = new Member({
      fullName,
      email: email.toLowerCase(),
      phone,
      country,
      organization,
      role: role || "member",
      message,
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
      error: err.message,
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
        "GET MEMBERS ERROR:",
        err
      );

      res.status(500).json({
        success: false,
        error: err.message,
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
        "GET MEMBER ERROR:",
        err
      );

      res.status(500).json({
        success: false,
        error: err.message,
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

      /* ================= GENERATE MEMBERSHIP ID ================= */
      if (!member.membershipId) {
        member.membershipId =
          generateMembershipId();
      }

      member.approved = true;
      member.status = "approved";

      await member.save();

      /* ================= SEND APPROVAL EMAIL ================= */
      try {
        await sendEmail({
          to: member.email,
          subject:
            "EHCA Membership Approved",
          html: `
            <div style="
              font-family: Arial, sans-serif;
              background:#f4f7fb;
              padding:40px 20px;
            ">
              
              <div style="
                max-width:600px;
                margin:auto;
                background:white;
                border-radius:12px;
                overflow:hidden;
                box-shadow:0 4px 15px rgba(0,0,0,0.08);
              ">

                <!-- HEADER -->
                <div style="
                  background:#0f172a;
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
                    color:#16a34a;
                    margin-top:0;
                  ">
                    Membership Approved 🎉
                  </h2>

                  <p>
                    Hello
                    <b>${member.fullName}</b>,
                  </p>

                  <p>
                    We are pleased to inform you
                    that your EHCA membership
                    request has been approved.
                  </p>

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

                  <p>
                    Thank you for joining EHCA
                    and supporting our mission
                    to impact lives positively.
                  </p>

                  <p>
                    We look forward to working
                    with you.
                  </p>

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
          `,
        });

        console.log(
          "✅ Approval email sent to:",
          member.email
        );

      } catch (emailError) {
        console.error(
          "❌ EMAIL ERROR:",
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
        "APPROVE ERROR:",
        err
      );

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);

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

      /* ================= SEND REJECTION EMAIL ================= */
      try {
        await sendEmail({
          to: member.email,
          subject:
            "EHCA Membership Update",
          html: `
            <div style="
              font-family: Arial, sans-serif;
              background:#f4f7fb;
              padding:40px 20px;
            ">
              
              <div style="
                max-width:600px;
                margin:auto;
                background:white;
                border-radius:12px;
                overflow:hidden;
                box-shadow:0 4px 15px rgba(0,0,0,0.08);
              ">

                <!-- HEADER -->
                <div style="
                  background:#991b1b;
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
                  ">
                    EHCA NGO
                  </h1>
                </div>

                <!-- BODY -->
                <div style="padding:40px;">

                  <h2 style="
                    color:#dc2626;
                    margin-top:0;
                  ">
                    Membership Request Update
                  </h2>

                  <p>
                    Hello
                    <b>${member.fullName}</b>,
                  </p>

                  <p>
                    Thank you for your interest
                    in joining EHCA.
                  </p>

                  <p>
                    After reviewing your
                    application, we regret to
                    inform you that your
                    membership request was not
                    approved at this time.
                  </p>

                  <p>
                    You may apply again in
                    the future.
                  </p>

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
          `,
        });

        console.log(
          "✅ Rejection email sent to:",
          member.email
        );

      } catch (emailError) {
        console.error(
          "❌ REJECTION EMAIL ERROR:",
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
        "REJECT ERROR:",
        err
      );

      res.status(500).json({
        success: false,
        error: err.message,
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
        "DELETE MEMBER ERROR:",
        err
      );

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);

export default router;