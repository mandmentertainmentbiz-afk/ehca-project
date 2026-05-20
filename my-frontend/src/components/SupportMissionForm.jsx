import { useState } from "react";
import axios from "axios";

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

  /* ================= SUBMIT ================= */
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    // ✅ VALIDATION
    if (!form.fullName.trim()) {
      alert("Full name is required");
      return;
    }

    if (!form.email.trim()) {
      alert("Email is required");
      return;
    }

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      country: form.country,
      organization: form.organization,
      role: form.role,
      message: form.message,
    };

    console.log("SUBMITTING:", payload);

    const res = await axios.post(
      "http://localhost:5000/api/members",
      payload
    );

    console.log("SUCCESS:", res.data);

    alert(
      res.data.message ||
        "Request submitted successfully"
    );

    // ✅ RESET FORM
    setForm({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      organization: "",
      role: "member",
      message: "",
    });

    // ✅ HIDE FORM
    setShowForm(false);

  } catch (err) {
    console.error(
      "❌ SUBMISSION ERROR:",
      err
    );

    console.log(err.response?.data);

    alert(
      err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong"
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
            Support Our Mission
          </button>
        </div>
      )}

      {/* ================= FORM ================= */}
      {showForm && (
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">

          {/* ================= LEFT SIDE ================= */}
          <div className="bg-blue-900 text-white p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Support Our Mission
            </h2>

            <p className="text-gray-200 leading-8 mb-8">
              Become part of EHCA by joining as a member
              or partnering with us to transform lives,
              empower children and strengthen communities.
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

          {/* ================= RIGHT SIDE ================= */}
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

              {/* BUTTON */}
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