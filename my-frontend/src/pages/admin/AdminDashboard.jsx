import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  /* ================= LOAD PROJECTS ================= */
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ================= DELETE ================= */
const handleDelete = async (id) => {
  if (!window.confirm("Delete this project?")) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/projects/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ IMPORTANT
        },
      }
    );

    // ✅ Remove instantly from UI
    setProjects((prev) =>
      prev.filter((p) => p._id !== id)
    );

    alert("✅ Project deleted successfully");

  } catch (err) {
    console.error("DELETE ERROR:", err);

    if (err.response) {
      alert(err.response.data.error || "❌ Delete failed");
    } else {
      alert("❌ Server not responding");
    }
  }
};

/* ================= EDIT ================= */
const handleEdit = (project) => {
  setEditing({ ...project }); // ✅ safer copy
};

/* ================= UPDATE ================= */
const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.put(
      `http://localhost:5000/api/projects/${editing._id}`,
      editing,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ IMPORTANT
        },
      }
    );

    // ✅ Update UI instantly
    setProjects((prev) =>
      prev.map((p) =>
        p._id === editing._id
          ? res.data.project || res.data
          : p
      )
    );

    alert("✅ Project updated successfully");

    // ✅ Close edit form
    setEditing(null);

  } catch (err) {
    console.error("UPDATE ERROR:", err);

    if (err.response) {
      alert(err.response.data.error || "❌ Update failed");
    } else {
      alert("❌ Server not responding");
    }
  }
};

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      
      <div className="grid md:grid-cols-3 gap-6 p-6">

  <Link to="/admin/add">
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold">
        Add Projects
      </h2>

      <p>Manage NGO projects</p>
    </div>
  </Link>

  <Link to="/admin/members">
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold">
        Membership Requests
      </h2>

      <p>
        Approve members and partners
      </p>
    </div>
  </Link>

  <Link
  to="/admin/donations"
  className="bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold">
  Manage Donations
  </h2>
</Link>

</div>

      {/* ================= EDIT FORM ================= */}
      {editing && (
        <form
          onSubmit={handleUpdate}
          className="mb-10 p-6 bg-gray-100 rounded"
        >
          <h2 className="text-xl mb-4">Edit Project</h2>

          <input
            value={editing.title}
            onChange={(e) =>
              setEditing({ ...editing, title: e.target.value })
            }
            className="block mb-3 p-2 border w-full"
          />

          <input
            value={editing.desc}
            onChange={(e) =>
              setEditing({ ...editing, desc: e.target.value })
            }
            className="block mb-3 p-2 border w-full"
          />

          <input
            type="date"
            value={editing.date}
            onChange={(e) =>
              setEditing({ ...editing, date: e.target.value })
            }
            className="block mb-3 p-2 border w-full"
          />

          <button className="bg-green-600 text-white px-4 py-2 mr-2">
            Update
          </button>

          <button
            type="button"
            onClick={() => setEditing(null)}
            className="bg-gray-500 text-white px-4 py-2"
          >
            Cancel
          </button>
        </form>
      )}

      {/* ================= PROJECT LIST ================= */}
      {projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow p-4 rounded"
            >
              <h3 className="font-bold">{p.title}</h3>
              <p>{p.desc}</p>
              <p className="text-sm text-blue-600">{p.date}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-600 text-white px-3 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}