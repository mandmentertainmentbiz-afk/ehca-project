import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     API URL
     ===================================================== */

  const API_URL = import.meta.env.VITE_API_URL;

  /* =====================================================
     FETCH PROJECTS
     ===================================================== */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/projects`);

        setProjects(response.data || []);
      } catch (err) {
        console.error("Projects fetch error:", err);

        setError(
          "Unable to load projects at the moment. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [API_URL]);

  /* =====================================================
     IMAGE URL
     ===================================================== */

  const getImageUrl = (image) => {
    if (!image) {
      return "/images/banner5.png";
    }

    /*
     * If the database already contains a complete URL,
     * use it directly.
     */
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    /*
     * Images uploaded by your backend are stored in:
     *
     * /public/uploads
     *
     * The backend serves them through:
     *
     * /uploads
     */
    const backendUrl = API_URL.replace(/\/api\/?$/, "");

    if (image.startsWith("/")) {
      return `${backendUrl}${image}`;
    }

    return `${backendUrl}/uploads/${image}`;
  };

  /* =====================================================
     DATE FORMAT
     ===================================================== */

  const formatDate = (date) => {
    if (!date) return "";

    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  /* =====================================================
     LOADING
     ===================================================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-600 text-lg">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     PAGE
     ===================================================== */

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">

      {/* =================================================
          HERO
          ================================================= */}

      <section className="relative min-h-[55vh] flex items-center justify-center text-center overflow-hidden">

        {/* Background image */}

        <img
          src="/images/banner5.png"
          alt="EHCA Projects"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-blue-950/70" />

        {/* Hero content */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 max-w-4xl"
        >
          <span className="text-pink-400 font-semibold uppercase tracking-[0.25em]">
            EHCA
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-4 mb-6">
            Our Projects
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 leading-8">
            Discover the projects and initiatives through which EHCA
            is making a positive difference in our communities.
          </p>
        </motion.div>

      </section>

      {/* =================================================
          PROJECTS SECTION
          ================================================= */}

      <section className="py-20 px-6 md:px-12 lg:px-20">

        <div className="max-w-7xl mx-auto">

          {/* Section heading */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="text-pink-500 font-semibold uppercase tracking-wider">
              What We Do
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mt-3 mb-5">
              Our Work in Action
            </h2>

            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-8">
              Every project represents an opportunity to support people,
              strengthen communities and create lasting positive change.
            </p>
          </motion.div>

          {/* =================================================
              ERROR
              ================================================= */}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-center mb-10">
              {error}
            </div>
          )}

          {/* =================================================
              NO PROJECTS
              ================================================= */}

          {!error && projects.length === 0 && (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                No Projects Available
              </h3>

              <p className="text-gray-600">
                Our projects will appear here once they are added
                through the administration dashboard.
              </p>
            </div>
          )}

          {/* =================================================
              PROJECT GRID
              ================================================= */}

          {projects.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {projects.map((project, index) => (
                <motion.article
                  key={project._id || project.id || index}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >

                  {/* =================================================
                      PROJECT IMAGE
                      ================================================= */}

                  <div className="relative h-64 overflow-hidden">

                    <img
                      src={getImageUrl(project.image)}
                      alt={project.title || "EHCA Project"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "/images/banner5.png";
                      }}
                    />

                    {/* Image overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent" />

                  </div>

                  {/* =================================================
                      PROJECT CONTENT
                      ================================================= */}

                  <div className="p-7">

                    {/* Date */}

                    {(project.date || project.createdAt) && (
                      <p className="text-sm text-pink-500 font-semibold mb-3">
                        {formatDate(project.date || project.createdAt)}
                      </p>
                    )}

                    {/* Title */}

                    <h3 className="text-2xl font-bold text-blue-900 mb-4">
                      {project.title || "Untitled Project"}
                    </h3>

                    {/* Description */}

                    <p className="text-gray-600 leading-7">
                      {project.description ||
                        project.content ||
                        "More information about this project will be available soon."}
                    </p>

                  </div>

                </motion.article>
              ))}

            </div>
          )}

        </div>

      </section>

      {/* =====================================================
          SUPPORT SECTION
          ===================================================== */}

      <section className="py-20 px-6 md:px-20 bg-blue-950">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >

          <span className="text-pink-400 font-semibold uppercase tracking-wider">
            Make A Difference
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Support Our Projects
          </h2>

          <p className="text-gray-200 text-lg md:text-xl leading-8 max-w-3xl mx-auto mb-10">
            Your support helps us continue our projects and reach
            more people in need. Together, we can create stronger
            communities and a better future.
          </p>

          <a
            href="/donate"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg"
          >
            Support Us
          </a>

        </motion.div>

      </section>

    </div>
  );
}