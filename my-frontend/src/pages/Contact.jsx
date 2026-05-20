import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Contact() {
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

      // OPTIONAL BACKEND
      // await axios.post(
      //   "http://localhost:5000/api/contact",
      //   form
      // );

      console.log(form);

      alert("Message sent successfully");

      // RESET
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

    } catch (err) {
      console.error(err);
      alert("Something went wrong");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans text-gray-800">

      {/* ================= HERO ================= */}
      <section
        className="relative h-[100vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/banner8.png')",
        }}
      >
        <div className="absolute inset-0 bg-blue-950/40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <p className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            Contact Us
          </p>

          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to
            support our mission, volunteer or partner
            with EHCA.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-24 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ================= LEFT INFO ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Get In Touch
            </h2>

            <p className="text-gray-600 leading-8 mb-10">
              Whether you want to support our projects,
              volunteer, donate or collaborate with us,
              our team is ready to connect with you.
            </p>

            <div className="space-y-8">

              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Address
                </h3>

                <p className="text-gray-600">
                  Famagusta, Cyprus
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Email
                </h3>

                <p className="text-gray-600">
                  info@ehca.org
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Phone
                </h3>

                <p className="text-gray-600">
                  +90 XXX XXX XXXX
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Working Hours
                </h3>

                <p className="text-gray-600">
                  Monday - Friday: 9AM - 5PM
                </p>
              </div>

            </div>
          </motion.div>

          {/* ================= FORM ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-2xl rounded-3xl p-8"
          >
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
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
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
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
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
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
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
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
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
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition disabled:opacity-50"
              >
                {loading
                  ? "Sending..."
                  : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="pb-24 px-6 md:px-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Famagusta,Cyprus&output=embed"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          />
        </div>
      </section>
    </div>
  );
}