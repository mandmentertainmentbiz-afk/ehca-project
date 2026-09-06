import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  FolderOpen,
  Users,
  HeartHandshake,
  Globe,
} from "lucide-react";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  

  /* ================= LOAD PROJECTS ================= */
  const fetchProjects = async () => {
    try {
      const res = await axios.get(
  "https://ehca-project-1.onrender.com/api/projects"
);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ================= ADMIN CREDENTIALS ================= */
  const [credentials, setCredentials] = useState({
    currentPassword: "",
    newEmail: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [updatingCredentials, setUpdatingCredentials] = useState(false);

  /* ================= HANDLE CREDENTIAL INPUT ================= */
  const handleCredentialsChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= UPDATE ADMIN CREDENTIALS ================= */
  const handleUpdateCredentials = async (e) => {
    e.preventDefault();

    if (!credentials.currentPassword) {
      alert("Please enter your current password.");
      return;
    }

    if (
      !credentials.newEmail &&
      !credentials.newPassword
    ) {
      alert("Please enter a new email or new password.");
      return;
    }

    if (
      credentials.newPassword &&
      credentials.newPassword.length < 8
    ) {
      alert("New password must be at least 8 characters.");
      return;
    }

    if (
      credentials.newPassword &&
      credentials.newPassword !==
        credentials.confirmPassword
    ) {
      alert("New passwords do not match.");
      return;
    }

    try {
      setUpdatingCredentials(true);

      const res = await axios.put(
        "https://ehca-project-1.onrender.com/api/auth/change-credentials",
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        res.data.message ||
          "Login details updated successfully."
      );

      // Clear the form
      setCredentials({
        currentPassword: "",
        newEmail: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Remove old login token
      localStorage.removeItem("token");

      // Send admin to login
      navigate("/login");

    } catch (err) {
      console.error(
        "CHANGE CREDENTIALS ERROR:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Failed to update login details."
      );

    } finally {
      setUpdatingCredentials(false);
    }
  };

  /* ================= DELETE ================= */
const handleDelete = async (id) => {
  if (!window.confirm("Delete this project?")) return;

  try {
    await axios.delete(
      `https://ehca-project-1.onrender.com/api/projects/${id}`,
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
      `https://ehca-project-1.onrender.com/api/projects/${editing._id}`,
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
    <div className="p-10"><br></br><br></br>
      <div className="mb-8">
  <h1 className="text-4xl font-bold text-gray-800">
    Welcome back 👋
  </h1>

  <p className="text-gray-500 mt-2">
    Manage your NGO website, members, donations and content from one place.
  </p>
</div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

  <Link to="/admin/add">
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border-l-4 border-blue-600">
      <FolderOpen className="w-10 h-10 text-blue-600 mb-3" />
      <h3 className="text-3xl font-bold">{projects.length}</h3>
      <p className="text-gray-600">Projects</p>
    </div>
  </Link>

  <Link to="/admin/members">
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border-l-4 border-green-600">
      <Users className="w-10 h-10 text-green-600 mb-3" />
      <h3 className="text-3xl font-bold">Members</h3>
      <p className="text-gray-600">Manage Memberships</p>
    </div>
  </Link>

  <Link to="/admin/donations">
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border-l-4 border-yellow-500">
      <HeartHandshake className="w-10 h-10 text-yellow-500 mb-3" />
      <h3 className="text-3xl font-bold">Donations</h3>
      <p className="text-gray-600">View Donations</p>
    </div>
  </Link>

  <Link to="/admin/website-content">
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border-l-4 border-purple-600">
      <Globe className="w-10 h-10 text-purple-600 mb-3" />
      <h3 className="text-3xl font-bold">Website</h3>
      <p className="text-gray-600">Content Manager</p>
    </div>
  </Link>

</div>

{/* ================= ADMIN SECURITY ================= */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10 border-l-4 border-red-600">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            🔐 Admin Login & Security
          </h2>

          <p className="text-gray-500 mt-1">
            Change the email address and password used to
            access the admin dashboard.
          </p>
        </div>

        <form
          onSubmit={handleUpdateCredentials}
          className="max-w-2xl"
        >

          {/* CURRENT PASSWORD */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={credentials.currentPassword}
              onChange={handleCredentialsChange}
              placeholder="Enter your current password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* NEW EMAIL */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              New Login Email
            </label>

            <input
              type="email"
              name="newEmail"
              value={credentials.newEmail}
              onChange={handleCredentialsChange}
              placeholder="Enter new admin email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-sm text-gray-500 mt-1">
              Leave blank if you don't want to change the email.
            </p>
          </div>

          {/* NEW PASSWORD */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={credentials.newPassword}
              onChange={handleCredentialsChange}
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-sm text-gray-500 mt-1">
              Minimum 8 characters. Leave blank if you don't
              want to change the password.
            </p>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleCredentialsChange}
              placeholder="Confirm new password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={updatingCredentials}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            {updatingCredentials
              ? "Updating..."
              : "Update Login Details"}
          </button>

        </form>
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