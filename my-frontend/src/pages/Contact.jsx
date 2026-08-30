import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import useSection from "../hooks/useSection";

export default function Contact() {
  /* ================= DYNAMIC SECTIONS ================= */

  const hero = useSection("contact", "hero");
  const formSection = useSection("contact", "form");
  const map = useSection("contact", "map");
  const contactInfo = useSection("contact", "contact-info");

  /* ================= FORM STATE ================= */

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/contact`,
      form
    );

    if (response.data.success) {
      alert("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);

    alert(
      error.response?.data?.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  /* ================= FALLBACK DATA ================= */

  const heroTitle =
    hero?.title || "Contact Us";

  const heroContent =
    hero?.content ||
    "We'd love to hear from you. Reach out to support our mission, volunteer or partner with EHCA.";

  const contactTitle =
    contactInfo?.title || "Get In Touch";

  const contactContent =
    contactInfo?.content ||
    "Whether you want to support our projects, volunteer, donate or collaborate with us, our team is ready to connect with you.";

  const formTitle =
    formSection?.title || "Send Us a Message";

  const formContent =
    formSection?.content ||
    "Fill out the form below and our team will get back to you.";

  /*
   * Map section content can contain the Google Maps embed URL.
   * If it is not available in admin, use the fallback.
   */
  const mapUrl =
    map?.content ||
    "https://www.google.com/maps?q=Famagusta,Cyprus&output=embed";

  /* ================= CONTACT INFO ITEMS ================= */

  const contactItems =
    contactInfo?.items?.length > 0
      ? contactInfo.items
      : [
          {
            title: "Address",
            description: "Famagusta, Cyprus",
          },
          {
            title: "Email",
            description: "info@ehca.org",
          },
          {
            title: "Phone",
            description: "+90 XXX XXX XXXX",
          },
          {
            title: "Working Hours",
            description: "Monday - Friday: 9AM - 5PM",
          },
        ];

  return (
    <div className="font-sans text-gray-800">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative h-[100vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            hero?.image || "/slide/banner8.png"
          })`,
        }}
      >
        {/* Overlay */}

        <div className="absolute inset-0 bg-blue-950/60" />

        {/* Hero Content */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            {heroTitle}
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 leading-8">
            {heroContent}
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section className="py-24 px-6 md:px-20 bg-gray-50">

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* =================================================
              LEFT - CONTACT INFORMATION
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <span className="text-pink-500 font-semibold uppercase tracking-wider">
              Contact EHCA
            </span>

            <h2 className="text-4xl font-bold text-blue-900 mt-3 mb-6">
              {contactTitle}
            </h2>

            <p className="text-gray-600 leading-8 mb-10">
              {contactContent}
            </p>

            <div className="space-y-8">

              {contactItems.map((item, index) => (
                <div key={index}>

                  {item.title && (
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      {item.title}
                    </h3>
                  )}

                  {item.description && (
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  )}

                </div>
              ))}

            </div>

          </motion.div>

          {/* =================================================
              RIGHT - CONTACT FORM
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-2xl rounded-3xl p-8"
          >

            <span className="text-pink-500 font-semibold uppercase tracking-wider">
              Contact Form
            </span>

            <h2 className="text-3xl font-bold text-blue-900 mt-3 mb-3">
              {formTitle}
            </h2>

            <p className="text-gray-600 mb-8">
              {formContent}
            </p>

            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="mb-5">

                <label className="block mb-2 font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />

              </div>

              {/* EMAIL */}

              <div className="mb-5">

                <label className="block mb-2 font-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />

              </div>

              {/* PHONE */}

              <div className="mb-5">

                <label className="block mb-2 font-semibold">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />

              </div>

              {/* SUBJECT */}

              <div className="mb-5">

                <label className="block mb-2 font-semibold">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Enter message subject"
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />

              </div>

              {/* MESSAGE */}

              <div className="mb-6">

                <label className="block mb-2 font-semibold">
                  Message
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Write your message"
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          MAP
      ===================================================== */}

      <section className="pb-24 px-6 md:px-20">

        <div className="mb-8 text-center">

          <span className="text-pink-500 font-semibold uppercase tracking-wider">
            Find Us
          </span>

          <h2 className="text-4xl font-bold text-blue-900 mt-3">
            Our Location
          </h2>

        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl">

          <iframe
            title="EHCA Location"
            src={mapUrl}
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            className="border-0"
          />

        </div>

      </section>

    </div>
  );
}