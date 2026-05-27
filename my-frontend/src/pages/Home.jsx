import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

/* ================= API ================= */
const API_URL = "https://ehca-project-1.onrender.com";


/* ================= HERO ================= */
const HeroSlider = () => {
  const images = [
    "/images/banner8.png",
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.jpg",
  ];

  const [index, setIndex] = useState(0);

  const savedTitle =
    localStorage.getItem("title");

  const savedDesc =
    localStorage.getItem("desc");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(
        (prev) => (prev + 1) % images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[index]})`,
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-800/40 to-pink-500/30" />

      {/* CONTENT */}
      <div className="relative z-10 px-6 md:px-20 max-w-3xl text-white">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            {savedTitle ||
              "Elevate Hope & Care Association"}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {savedDesc ||
              "Transforming lives through love, care and education."}
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-xl font-semibold transition">
              Donate Now
            </button>

            <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-900 transition">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ================= HOME ================= */
export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] =
    useState(true);

  /* ================= FETCH PROJECTS ================= */
                
useEffect(() => {
  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/projects`
      );

      console.log("PROJECTS:", res.data);

      setProjects(res.data || []);

    } catch (err) {
      console.error("Fetch error:", err);

      if (err.response) {
        console.error("Response:", err.response.data);
      }

      setProjects([]);

    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

  /* ================= DATE ================= */
  const now = new Date();

  /* ================= OUR PROJECTS ================= */
  const ourProjects = projects.filter(
    (p) =>
      p.category?.toLowerCase() ===
      "project"
  );

  /* ================= ONGOING ================= */
  const ongoingProjects = projects.filter(
    (p) => {
      const projectDate = new Date(p.date);

      projectDate.setHours(
        23,
        59,
        59,
        999
      );

      return (
        p.category?.toLowerCase() ===
          "ongoing" && now <= projectDate
      );
    }
  );

  /* ================= UPCOMING ================= */
  const upcomingProjects =
    projects.filter(
      (p) =>
        p.category?.toLowerCase() ===
        "upcoming"
    );

  /* ================= PAST EVENTS ================= */
  const pastEvents = projects.filter(
    (p) => {
      const projectDate = new Date(p.date);

      projectDate.setHours(
        23,
        59,
        59,
        999
      );

      return (
        now > projectDate &&
        p.category?.toLowerCase() !==
          "project"
      );
    }
  );

  /* ================= NEXT UPCOMING ================= */
  const nextProject =
    [...upcomingProjects].sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    )[0] || null;

  /* ================= IMAGE URL ================= */
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${API_URL}${imagePath}`;
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="font-sans text-gray-800">
      <HeroSlider />

      {/* ================= OUR PROJECTS ================= */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-4">
          Our Projects
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Projects and initiatives we have
          carried out across communities.
        </p>

        {ourProjects.length === 0 ? (
          <p className="text-center text-gray-500">
            No projects available 22222
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {ourProjects.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {p.image && (
                  <img
  src={`${API_URL}${p.image}`}
  alt={p.title}
  className="w-full h-56 object-cover"
/>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {p.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {p.shortDesc || p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= ONGOING ================= */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-4">
          Ongoing Projects
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Current programs actively changing
          lives.
        </p>

        {ongoingProjects.length === 0 ? (
          <p className="text-center text-gray-500">
            No ongoing projects
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {ongoingProjects.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden shadow-lg bg-gray-50"
              >
                {p.image && (
                  <img
  src={`${API_URL}${p.image}`}
  alt={p.title}
  className="w-full h-56 object-cover"
/>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {p.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {p.shortDesc || p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= UPCOMING ================= */}
      <section className="py-20 px-6 md:px-20 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-4">
          Upcoming Projects
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Future outreach and impact programs.
        </p>

        {upcomingProjects.length === 0 ? (
          <p className="text-center text-gray-500">
            No upcoming projects
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingProjects.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {p.image && (
                  <img
  src={`${API_URL}${p.image}`}
  alt={p.title}
  className="w-full h-56 object-cover"
/>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {p.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {p.shortDesc || p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}