import { useState } from "react";
import { motion } from "framer-motion";
import useSection from "../hooks/useSection";

export default function Donate() {
  /* =====================================================
     DYNAMIC ADMIN CONTENT
     These connect to:
     Admin → Website Content → Donate
     ===================================================== */

  const hero = useSection("donate", "hero");
  const donationOptions = useSection(
    "donate",
    "donation-options"
  );
  const donationInfo = useSection(
    "donate",
    "donation-info"
  );
  const cta = useSection("donate", "cta");

  /* =====================================================
     FORM STATE
     ===================================================== */

  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    paymentMethod: "bank",
  });

  /* =====================================================
     API
     ===================================================== */

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://ehca-project-1.onrender.com";

  /* =====================================================
     HANDLE FORM CHANGE
     ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     SELECT DONATION AMOUNT
     ===================================================== */

  const selectAmount = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  /* =====================================================
     CUSTOM AMOUNT
     ===================================================== */

  const handleCustomAmount = (e) => {
    const value = e.target.value;

    setCustomAmount(value);
    setAmount(value);
  };

  /* =====================================================
     SUBMIT DONATION
     ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please select a donation amount.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        amount: Number(amount),
        paymentMethod: form.paymentMethod,
        message: form.message.trim(),
      };

      console.log("SENDING DONATION:", payload);

      const response = await fetch(
        `${API_URL}/api/donations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log("SERVER RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Failed to submit donation"
        );
      }

      alert("Donation submitted successfully.");

      /* RESET */

      setAmount("");
      setCustomAmount("");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        paymentMethod: "bank",
      });
    } catch (error) {
      console.error("DONATION ERROR:", error);

      alert(
        error.message ||
          "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FALLBACK CONTENT
     ===================================================== */

  const heroTitle =
    hero?.title || "Donate";

  const heroContent =
    hero?.content ||
    "Your generosity helps us provide care, education and hope to vulnerable communities.";

  const heroImage =
    hero?.image || "/slide/smile.PNG";

  const infoTitle =
    donationInfo?.title ||
    "Make A Difference";

  const infoContent =
    donationInfo?.content ||
    "Every donation helps EHCA support children, families and communities.";

  const formTitle =
    donationOptions?.title ||
    "Donation Options";

  const formContent =
    donationOptions?.content ||
    "Choose an amount that you would like to donate.";

  const ctaTitle =
    cta?.title ||
    "Your Support Creates Hope";

  const ctaContent =
    cta?.content ||
    "Together we can transform lives and create stronger communities.";

  /* =====================================================
     DONATION OPTIONS FROM ADMIN
     ===================================================== */

  const adminAmounts =
    donationOptions?.items
      ?.map((item) => {
        const value = Number(
          item.value ||
            item.amount ||
            item.title
        );

        return Number.isFinite(value)
          ? value
          : null;
      })
      .filter(Boolean) || [];

  const donationAmounts =
    adminAmounts.length > 0
      ? adminAmounts
      : [25, 50, 100, 250];

  return (
    <div className="font-sans text-gray-800">

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Overlay */}

        <div className="absolute inset-0 bg-blue-950/80" />

        {/* Content */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
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

      {/* =================================================
          DONATION SECTION
      ================================================= */}

      <section className="py-24 px-6 md:px-20 bg-gray-50">

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* =============================================
              LEFT - DONATION INFORMATION
          ============================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <span className="text-pink-500 font-semibold uppercase tracking-wider">
              Support EHCA
            </span>

            <h2 className="text-4xl font-bold text-blue-900 mt-3 mb-6">
              {infoTitle}
            </h2>

            <p className="text-gray-600 leading-8 mb-8">
              {infoContent}
            </p>

            {/* ADMIN DONATION INFO ITEMS */}

            {donationInfo?.items?.length > 0 && (
              <div className="space-y-5">

                {donationInfo.items.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start"
                    >

                      <span className="text-pink-500 text-xl font-bold">
                        ✓
                      </span>

                      <div>

                        {item.title && (
                          <h3 className="font-bold text-blue-900">
                            {item.title}
                          </h3>
                        )}

                        {item.description && (
                          <p className="text-gray-600">
                            {item.description}
                          </p>
                        )}

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

            {/* CTA */}

            <div className="mt-10 p-8 bg-blue-900 rounded-3xl text-white">

              <h3 className="text-2xl font-bold mb-3">
                {ctaTitle}
              </h3>

              <p className="text-gray-200 leading-7">
                {ctaContent}
              </p>

            </div>

          </motion.div>

          {/* =============================================
              RIGHT - DONATION FORM
          ============================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="bg-white shadow-2xl rounded-3xl p-8"
          >

            <span className="text-pink-500 font-semibold uppercase tracking-wider">
              Make a Donation
            </span>

            <h2 className="text-3xl font-bold text-blue-900 mt-3 mb-3">
              {formTitle}
            </h2>

            <p className="text-gray-600 mb-8">
              {formContent}
            </p>

            <form onSubmit={handleSubmit}>

              {/* =========================================
                  AMOUNT
              ========================================= */}

              <div className="mb-8">

                <label className="block mb-4 font-bold">
                  Select Amount
                </label>

                <div className="grid grid-cols-2 gap-4 mb-4">

                  {donationAmounts.map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          selectAmount(value)
                        }
                        className={`p-4 rounded-xl border font-bold transition ${
                          Number(amount) ===
                          Number(value)
                            ? "bg-pink-500 text-white border-pink-500"
                            : "bg-white hover:bg-pink-50"
                        }`}
                      >
                        ${value}
                      </button>
                    )
                  )}

                </div>

                {/* CUSTOM AMOUNT */}

                <input
                  type="number"
                  min="1"
                  placeholder="Custom Amount"
                  value={customAmount}
                  onChange={handleCustomAmount}
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />

              </div>

              {/* =========================================
                  FULL NAME
              ========================================= */}

              <div className="mb-4">

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />

              </div>

              {/* =========================================
                  EMAIL
              ========================================= */}

              <div className="mb-4">

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />

              </div>

              {/* =========================================
                  PHONE
              ========================================= */}

              <div className="mb-4">

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />

              </div>

              {/* =========================================
                  PAYMENT METHOD
              ========================================= */}

              <div className="mb-4">

                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                >

                  <option value="bank">
                    Bank Transfer
                  </option>

                  <option value="paypal">
                    PayPal
                  </option>

                  <option value="card">
                    Debit/Credit Card
                  </option>

                </select>

              </div>

              {/* =========================================
                  MESSAGE
              ========================================= */}

              <div className="mb-6">

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Optional message"
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />

              </div>

              {/* =========================================
                  SUBMIT
              ========================================= */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition disabled:opacity-50"
              >
                {loading
                  ? "Submitting..."
                  : "Donate Now"}
              </button>

            </form>

          </motion.div>

        </div>

      </section>

    </div>
  );
}