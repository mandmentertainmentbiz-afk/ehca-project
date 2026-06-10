import { useState } from "react";
import { motion } from "framer-motion";

export default function Donate() {
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

/* ================= API URL ================= */
const API_URL =
import.meta.env.VITE_API_URL ||
"https://ehca-project-1.onrender.com";

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
setCustomAmount(e.target.value);
setAmount(e.target.value);
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
    `${API_URL}/api/donations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        amount: Number(amount),
        paymentMethod: form.paymentMethod,
        message: form.message.trim(),
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
    data.message ||
      "Donation submitted successfully"
  );

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
  console.error(
    "DONATION ERROR:",
    error
  );

  alert(
    error.message ||
      "Unable to connect to server"
  );
} finally {
  setLoading(false);
}

};

return (
<div className="font-sans text-gray-800">

  {/* HERO */}
  <section
    className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
    style={{
      backgroundImage:
        "url('/slide/smile.PNG')",
    }}
  >
    <div className="absolute inset-0 bg-blue-950/80" />

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 px-6"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
        Donate
      </h1>

      <p className="text-xl text-gray-200 max-w-3xl mx-auto">
        Your generosity helps us provide care,
        education and hope to vulnerable
        communities.
      </p>
    </motion.div>
  </section>

  {/* DONATION SECTION */}
  <section className="py-24 px-6 md:px-20">
    <div className="grid md:grid-cols-2 gap-12 items-start">

      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6">
          Make A Difference
        </h2>

        <p className="text-gray-600 leading-8 mb-8">
          Every donation helps EHCA support
          children, families and communities.
        </p>
      </motion.div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-3xl p-8"
      >
        <h2 className="text-3xl font-bold mb-8">
          Donation Form
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-8">
            <label className="block mb-4 font-bold">
              Select Amount
            </label>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {[25, 50, 100, 250].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    selectAmount(value)
                  }
                  className={`p-4 rounded-xl border font-bold ${
                    amount == value
                      ? "bg-pink-500 text-white"
                      : ""
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Custom Amount"
              value={customAmount}
              onChange={handleCustomAmount}
              className="w-full border rounded-xl p-4"
            />
          </div>

          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full border rounded-xl p-4 mb-4"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border rounded-xl p-4 mb-4"
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border rounded-xl p-4 mb-4"
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 mb-4"
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

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            placeholder="Optional message"
            className="w-full border rounded-xl p-4 mb-6"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl disabled:opacity-50"
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