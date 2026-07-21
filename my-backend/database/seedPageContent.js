import mongoose from "mongoose";
import dotenv from "dotenv";
import PageContent from "../models/PageContent.js";

dotenv.config();

const pageContents = [
  // ==========================
  // HOME
  // ==========================
  {
    page: "home",
    section: "hero",
    title: "Welcome to EHCA NGO",
    subtitle: "Empowering Lives Through Love and Compassion",
    content:
      "Together we create hope, transform communities, and build a better future.",
    buttonText: "Join Us",
    buttonLink: "/membership",
    order: 1,
  },

  {
    page: "home",
    section: "what-we-do",
    title: "What We Do",
    content: "Making a lasting impact in communities.",
    items: [
      {
        title: "Education",
        description: "Supporting education for children and young people.",
      },
      {
        title: "Healthcare",
        description: "Providing healthcare outreach and medical support.",
      },
      {
        title: "Community Development",
        description: "Building stronger and sustainable communities.",
      },
    ],
    order: 2,
  },

  // ==========================
  // ABOUT
  // ==========================
  {
    page: "about",
    section: "about-ehca",
    title: "About EHCA",
    content:
      "Elevate Hope Charity Association is committed to transforming lives through humanitarian services.",
    order: 1,
  },

  {
    page: "about",
    section: "who-we-are",
    title: "Who We Are",
    content:
      "We are a non-profit organization dedicated to serving humanity.",
    order: 2,
  },

  {
    page: "about",
    section: "mission",
    title: "Our Mission",
    content:
      "To uplift communities through education, healthcare and humanitarian support.",
    order: 3,
  },

  {
    page: "about",
    section: "vision",
    title: "Our Vision",
    content:
      "A world where every individual has equal opportunities to thrive.",
    order: 4,
  },

  {
    page: "about",
    section: "core-values",
    title: "Our Core Values",
    items: [
      {
        title: "Integrity",
        description: "We uphold honesty and transparency.",
      },
      {
        title: "Compassion",
        description: "Serving others with love and empathy.",
      },
      {
        title: "Excellence",
        description: "Delivering quality in everything we do.",
      },
      {
        title: "Accountability",
        description: "Responsible stewardship of resources.",
      },
    ],
    order: 5,
  },

  {
    page: "about",
    section: "impact",
    title: "Our Impact",
    items: [
      {
        title: "Education",
        description: "Thousands of students supported.",
      },
      {
        title: "Healthcare",
        description: "Medical outreaches across communities.",
      },
      {
        title: "Relief",
        description: "Food and emergency assistance provided.",
      },
    ],
    order: 6,
  },

  // ==========================
  // CONTACT
  // ==========================
  {
    page: "contact",
    section: "contact-info",
    title: "Contact Us",
    items: [
      {
        title: "Address",
        description: "Your Office Address",
      },
      {
        title: "Phone",
        description: "+00000000000",
      },
      {
        title: "Email",
        description: "info@elevatehopecharity.org",
      },
      {
        title: "Working Hours",
        description: "Monday - Friday, 9AM - 5PM",
      },
    ],
    order: 1,
  },

  // ==========================
  // DONATE
  // ==========================
  {
    page: "donate",
    section: "hero",
    title: "Support Our Mission",
    subtitle: "Every Donation Makes a Difference",
    content:
      "Your generous contribution helps us transform lives and communities.",
    buttonText: "Donate Now",
    buttonLink: "/donate",
    order: 1,
  },

  {
    page: "donate",
    section: "donation-info",
    title: "Donation Information",
    content:
      "Your donations support education, healthcare and humanitarian programs.",
    order: 2,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    await PageContent.deleteMany();

    console.log("🗑 Existing page contents deleted.");

    await PageContent.insertMany(pageContents);

    console.log("✅ Page contents seeded successfully.");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed");
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();