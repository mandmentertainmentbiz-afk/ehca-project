import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/ehcalg.PNG";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { token, setToken } = useAuth(); // ✅ GLOBAL AUTH
  const location = useLocation();
  const navigate = useNavigate();

  /* ✅ SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScrolled(scrollY > 50);
      setScrollProgress((scrollY / height) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ✅ LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Donate", path: "/donate" },
  ];

  return (
    <>
      {/* SCROLL BAR */}
      <div
        className="fixed top-0 left-0 h-1 bg-pink-500 z-[60]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-16">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <motion.img
              src={logo}
              alt="logo"
              className="h-12 md:h-16"
              animate={{
                scale: scrolled ? 0.9 : 1,
                rotate: scrolled ? 360 : 0,
              }}
              transition={{ duration: 0.6 }}
            />

            <span className="font-bold text-lg md:text-4xl text-[#1F3C88]">
              EHCA NGO
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-8 items-center font-medium">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;

              return (
                <Link key={i} to={link.path} className="relative group">
                  <span
                    className={
                      isActive
                        ? "text-pink-500"
                        : "text-gray-700 hover:text-pink-500"
                    }
                  >
                    {link.name}
                  </span>

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-pink-500 transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            {/* ✅ AUTH UI */}
            {token ? (
              <>
                <Link to="/admin" className="text-blue-600 font-semibold">
                  Dashboard
                </Link>  
              </>
            ) : (
              <Link> </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div
            className="md:hidden cursor-pointer z-[60]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-[#1F3C88]" />
              <span className="block w-6 h-0.5 bg-[#1F3C88]" />
              <span className="block w-6 h-0.5 bg-[#1F3C88]" />
            </div>
          </div>
        </div>
      </nav>
         <div className="h-20 md:h-28"></div>
      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-white z-50 p-8 flex flex-col gap-6"
          >
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {token ? (
              <>
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
          </motion.div>
        </>
      )}
    </>
  );
}