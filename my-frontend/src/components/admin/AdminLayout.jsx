import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "260px" }}
      >
        <h3 className="mb-4">EHCA Admin</h3>

        <div className="d-flex flex-column gap-2">
          <Link className="btn btn-outline-light text-start" to="/admin">
            📊 Dashboard
          </Link>

          <Link className="btn btn-outline-light text-start" to="/admin/website-content">
            🌐 Website Content
          </Link>

          <Link className="btn btn-outline-light text-start" to="/admin/add">
            📁 Projects
          </Link>

          <Link className="btn btn-outline-light text-start" to="/admin/members">
            👥 Memberships
          </Link>

          <Link className="btn btn-outline-light text-start" to="/admin/donations">
            💰 Donations
          </Link>

          <button
            className="btn btn-danger mt-4"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>
    </div>
  );
}