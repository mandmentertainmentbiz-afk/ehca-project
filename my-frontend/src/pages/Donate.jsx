import { useState } from "react";
import { motion } from "framer-motion";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    paymentMethod: "bank",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SELECT AMOUNT ================= */
  const selectAmount = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  /* ================= CUSTOM AMOUNT ================= */
  const handleCustomAmount = (e) => {
    const value = e.target.value;

    setCustomAmount(value);
    setAmount(value);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount) {
      alert("Please select donation amount");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://ehca-backend-1.onrender.com/api/donations",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            amount,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Donation request failed"
        );
      }

      alert(
        "Donation request submitted successfully"
      );

      /* ================= RESET ================= */
      setAmount("");
      setCustomAmount("");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        paymentMethod: "bank",
      });

    } catch (err) {
      console.error(err);

      alert(
        err.message ||
          "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans text-gray-800">

      {/* ================= HERO ================= */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/smile.PNG')",
        }}
      >
        <div className="absolute inset-0 bg-blue-950/40" />

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
          className="relative z-10 px-6"
        >
          <p className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            Donate
          </p>

          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Your generosity helps us provide
            care, education and hope to
            vulnerable communities.
          </p>
        </motion.div>
      </section>

      {/* ================= DONATION SECTION ================= */}
      <section className="py-24 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ================= LEFT ================= */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Make A Difference
            </h2>

            <p className="text-gray-600 leading-8 mb-8">
              Every donation helps EHCA support
              children, families and communities
              through education, healthcare and
              empowerment initiatives.
            </p>

            {/* ================= IMPACT ================= */}
            <div className="space-y-6">

              <div className="bg-gray-50 p-6 rounded-2xl shadow">
                <h3 className="text-2xl font-bold text-pink-500 mb-2">
                  $25
                </h3>

                <p className="text-gray-600">
                  Provides school materials for
                  a child
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl shadow">
                <h3 className="text-2xl font-bold text-pink-500 mb-2">
                  $50
                </h3>

                <p className="text-gray-600">
                  Supports healthcare outreach
                  programs
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl shadow">
                <h3 className="text-2xl font-bold text-pink-500 mb-2">
                  $100
                </h3>

                <p className="text-gray-600">
                  Helps sponsor community
                  development projects
                </p>
              </div>

            </div>
          </motion.div>

          {/* ================= FORM ================= */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="bg-white shadow-2xl rounded-3xl p-8"
          >
            <h2 className="text-3xl font-bold mb-8">
              Donation Form
            </h2>

            <form onSubmit={handleSubmit}>

              {/* ================= AMOUNT ================= */}
              <div className="mb-8">
                <label className="block mb-4 font-bold text-lg">
                  Select Amount
                </label>

                <div className="grid grid-cols-2 gap-4 mb-4">

                  {[25, 50, 100, 250].map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          selectAmount(value)
                        }
                        className={`p-4 rounded-xl border font-bold transition ${
                          Number(amount) === value
                            ? "bg-pink-500 text-white border-pink-500"
                            : "bg-white hover:border-pink-500"
                        }`}
                      >
                        ${value}
                      </button>
                    )
                  )}
                </div>

                <input
                  type="number"
                  placeholder="Custom Amount"
                  value={customAmount}
                  onChange={
                    handleCustomAmount
                  }
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* ================= NAME ================= */}
              <div className="mb-5">
                <label className="block mb-2 font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* ================= EMAIL ================= */}
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

              {/* ================= PHONE ================= */}
              <div className="mb-5">
                <label className="block mb-2 font-semibold">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* ================= PAYMENT ================= */}
              <div className="mb-5">
                <label className="block mb-2 font-semibold">
                  Payment Method
                </label>

                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
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

              {/* ================= MESSAGE ================= */}
              <div className="mb-6">
                <label className="block mb-2 font-semibold">
                  Message
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Optional message"
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* ================= BUTTON ================= */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition"
              >
                {loading
                  ? "Processing..."
                  : "Donate Now"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-blue-950 text-white text-center px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl font-extrabold mb-6">
            Together We Can Change Lives
          </h2>

          <p className="text-gray-300 text-lg leading-8 mb-10">
            Your support enables EHCA to
            continue delivering hope, care
            and sustainable community impact.
          </p>

          <button className="bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-2xl font-bold transition">
            Become A Sponsor
          </button>
        </motion.div>
      </section>
    </div>
  );
}