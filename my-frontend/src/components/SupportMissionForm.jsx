import { useState } from "react";
import axios from "axios";

/* ================= API URL ================= */
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ehca-project-1.onrender.com";

export default function SupportMissionForm() {
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    organization: "",
    role: "member",
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

  /* ================= RESET FORM ================= */
  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      organization: "",
      role: "member",
      message: "",
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* ================= VALIDATION ================= */
    if (!form.fullName.trim()) {
      alert("Full name is required");
      return;
    }

    if (!form.email.trim()) {
      alert("Email is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country.trim(),
        organization: form.organization.trim(),
        role: form.role,
        message: form.message.trim(),
      };

      console.log("📤 SUBMITTING:", payload);

      const res = await axios.post(
        `${API_URL}/api/members`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      );

      console.log("✅ SUCCESS:", res.data);

      alert(
        res.data?.message ||
          "Request submitted successfully"
      );

      resetForm();

      setShowForm(false);

    } catch (err) {
      console.error(
        "❌ SUBMISSION ERROR:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Network error. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-white">

      {/* ================= BUTTON ================= */}
      {!showForm && (
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition shadow-lg"
          >
            Join Our Mission
          </button>
        </div>
      )}

      {/* ================= FORM ================= */}
      {showForm && (
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">

          {/* ================= LEFT ================= */}
          <div className="bg-blue-900 text-white p-10 flex flex-col justify-center">

            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Support Our Mission
            </h2>

            <p className="text-gray-200 leading-8 mb-8">
              Become part of EHCA by joining as a
              member or partnering with us to
              transform lives, empower children and
              strengthen communities.
            </p>

            <div className="space-y-6">

              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Join as a Member
                </h3>

                <p className="text-gray-300">
                  Volunteer, participate in outreach
                  programs and support humanitarian
                  projects.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Become a Partner
                </h3>

                <p className="text-gray-300">
                  Collaborate with EHCA through
                  sponsorship, funding and community
                  development initiatives.
                </p>
              </div>

            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="p-10 bg-gray-50">

            {/* CLOSE BUTTON */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-red-500 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              {/* FULL NAME */}
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
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-900"
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
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-900"
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
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* COUNTRY */}
              <div className="mb-5">
                <label className="block mb-2 font-semibold">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* ORGANIZATION */}
              <div className="mb-5">
                <label className="block mb-2 font-semibold">
                  Organization / Company
                </label>

                <input
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* ROLE */}
              <div className="mb-5">
                <label className="block mb-2 font-semibold">
                  I Want To
                </label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="member">
                    Join as Member
                  </option>

                  <option value="partner">
                    Partner with EHCA
                  </option>
                </select>
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
                  rows={5}
                  placeholder="Tell us more about your interest"
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition disabled:opacity-50"
              >
                {loading
                  ? "Submitting..."
                  : "Submit Request"}
              </button>

            </form>
          </div>
        </div>
      )}
    </section>
  );
}