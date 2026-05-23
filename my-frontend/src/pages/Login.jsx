import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://ehca-backend-1.onrender.com/api/auth/login",
        form
      );

      const token = res.data.token;

      // ✅ Save token
      localStorage.setItem("token", token);

      // ✅ Update context
      setToken(token);

      alert("✅ Login successful");

      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("❌ Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-6 bg-white shadow rounded w-80" onSubmit={handleLogin}>
        <h2 className="text-xl mb-4 text-center font-bold">Admin Login</h2>

        <input
          type="email"
          required
          placeholder="Email"
          className="block mb-3 p-2 border w-full"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          required
          placeholder="Password"
          className="block mb-3 p-2 border w-full"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-blue-900 text-white px-4 py-2 w-full hover:bg-blue-800">
          Login
        </button>
      </form>
    </div>
  );
}               