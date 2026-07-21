import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const navigate = useNavigate();

  /* ================= AUTH ================= */
  const { token, setToken } = useAuth();

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");

    setToken(null);

    navigate("/");
  };

  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* ================= LOGO ================= */}
        <h2 className="text-3xl font-extrabold mb-3">
          EHCA NGO
        </h2>

        {/* ================= DESCRIPTION ================= */}
        <p className="text-gray-300 max-w-full mx-auto mb-6 leading-7 justify-center ">
          Empowering lives through love, care,
          education and sustainable community
          development initiatives.

          {/* ✅ AUTH UI */}
            {token ? (
              <>


                <button
                  onClick={handleLogout}
                  className="text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className=" text-white px-4 py-1 rounded"
              >
                Admin
              </Link>
            )}
        </p>

       
        

        {/* ================= QUICK LINKS ================= */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm md:text-base">
          <Link
            to="/"
            className="hover:text-pink-400 transition"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-pink-400 transition"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="hover:text-pink-400 transition"
          >
            Contact
          </Link>

          <Link
            to="/donate"
            className="hover:text-pink-400 transition"
          >
            Donate
          </Link>
        </div>

        {/* ================= SOCIAL ICONS ================= */}
<div className="flex justify-center gap-6 text-2xl mb-8">

  <a
    href="https://www.facebook.com/profile.php?id=61580481813493"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-500 transition"
  >
    <FaFacebook />
  </a>

  <a
    href="https://www.instagram.com/ehca.123?igsh=c2g4MnE1eWE4bWcw"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-500 transition"
  >
    <FaInstagram />
  </a>

  <a
    href="https://www.youtube.com/@sallyteneng"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-500 transition"
  >
    <FaYoutube />
  </a>

  <a
    href="https://www.tiktok.com/@stacysallyte"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-gray-300 transition"
  >
    <FaTiktok />
  </a>

</div>

        {/* ================= COPYRIGHT ================= */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EHCA NGO.
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}