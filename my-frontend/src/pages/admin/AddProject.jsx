import { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value, files, type, checked } =
      e.target;

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

    if (!token) {
      alert("You must be logged in.");
      return;
    }

    if (
      !form.title.trim() ||
      !form.desc.trim() ||
      !form.date
    ) {
      alert(
        "Title, Description and Date are required."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "desc",
        form.desc.trim()
      );

      formData.append("date", form.date);

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "status",
        form.status
      );

      formData.append(
        "featured",
        form.featured
      );

      formData.append(
        "donationGoal",
        Number(form.donationGoal) || 0
      );

      formData.append(
        "location",
        form.location.trim()
      );

      formData.append(
        "tags",
        form.tags.trim()
      );

      /* CLOUDINARY IMAGE */
      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      const response = await axios.post(
        "https://ehca-project-1.onrender.com/api/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Project Created:",
        response.data
      );

      alert(
        "Project added successfully."
      );

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

      if (fileRef.current) {
        fileRef.current.value = "";
      }

      navigate("/admin");
    } catch (error) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        "Failed to create project";

      alert(message);
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

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />

        <textarea
          name="desc"
          placeholder="Project Description"
          value={form.desc}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          rows="5"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        >
          <option value="project">
            Project
          </option>
          <option value="ongoing">
            Ongoing
          </option>
          <option value="upcoming">
            Upcoming
          </option>
          <option value="past">
            Past
          </option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        >
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
          <option value="draft">
            Draft
          </option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        />

        <input
          type="number"
          name="donationGoal"
          placeholder="Donation Goal"
          value={form.donationGoal}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        />

        <input
          type="text"
          name="tags"
          placeholder="education, charity, health"
          value={form.tags}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        />

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured Project
        </label>

        <input
          type="file"
          name="image"
          accept="image/*"
          ref={fileRef}
          onChange={handleChange}
          className="w-full mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-800 disabled:opacity-50"
        >
          {loading
            ? "Uploading to Cloudinary..."
            : "Add Project"}
        </button>
      </form>
    </div>
  );
}