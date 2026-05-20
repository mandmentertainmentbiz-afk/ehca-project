import { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    date: "",
    image: null,

    // EXTRA FIELDS
    category: "project",
    status: "active",
    featured: false,
    donationGoal: "",
    location: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files[0]
          : type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!token) {
      alert("❌ You are not logged in");
      return;
    }

    if (!form.title || !form.desc || !form.date) {
      alert("❌ Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // REQUIRED
      formData.append("title", form.title.trim());
      formData.append("desc", form.desc.trim());
      formData.append("date", form.date);

      // OPTIONAL
      formData.append("category", form.category);
      formData.append("status", form.status);
      formData.append("featured", form.featured);
      formData.append(
        "donationGoal",
        Number(form.donationGoal) || 0
      );
      formData.append("location", form.location.trim());

      // TAGS
      formData.append("tags", form.tags);

      // IMAGE
      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await axios.post(
        "http://localhost:5000/api/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ SUCCESS:", res.data);

      alert("✅ Project added successfully");

      // RESET FORM
      setForm({
        title: "",
        desc: "",
        date: "",
        image: null,

        category: "project",
        status: "active",
        featured: false,
        donationGoal: "",
        location: "",
        tags: "",
      });

      // RESET FILE INPUT
      if (fileRef.current) {
        fileRef.current.value = "";
      }

      navigate("/admin");

    } catch (err) {
      console.error("❌ FULL ERROR:", err);

      if (err.response) {
        console.log("❌ BACKEND ERROR:", err.response.data);

        alert(
          err.response.data?.message ||
          err.response.data?.error ||
          "❌ Server Error"
        );
      } else {
        alert("❌ Network error or backend not running");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Project
        </h2>

        {/* TITLE */}
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Project Title"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="desc"
          value={form.desc}
          placeholder="Description"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          rows={4}
          required
        />

        {/* DATE */}
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="project">Our Project</option>
          <option value="ongoing">Ongoing</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past Event</option>
        </select>

        {/* STATUS */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="draft">Draft</option>
        </select>

        {/* LOCATION */}
        <input
          type="text"
          name="location"
          value={form.location}
          placeholder="Project Location"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* DONATION GOAL */}
        <input
          type="number"
          name="donationGoal"
          value={form.donationGoal}
          placeholder="Donation Goal"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* TAGS */}
        <input
          type="text"
          name="tags"
          value={form.tags}
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        {/* FEATURED */}
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured Project
        </label>

        {/* IMAGE */}
        <input
          type="file"
          name="image"
          ref={fileRef}
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-4"
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-900 text-white w-full py-2 rounded hover:bg-blue-800 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}