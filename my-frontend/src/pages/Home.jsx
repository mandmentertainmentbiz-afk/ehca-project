import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

import DynamicSection from "../components/DynamicSection";
import useSection from "../hooks/useSection";
import StatisticsSection from "../components/StatisticsSection";

/* ================= API ================= */
const API_URL = "https://ehca-project-1.onrender.com";

/* ================= HERO ================= */
const HeroSlider = () => {
  const hero = useSection("home", "hero");

  const images = [
    "/slide/banner8.png",
    "/slide/img1.jpg", 
    "/slide/img2.jpg",
    "/slide/img3.jpg",
  ];

  const about = useSection("home", "about");
  const impact = useSection("home", "impact");

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slider */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[index]})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-800/40 to-pink-500/30" />

      {/* Hero Content */}
      <div className="relative z-10 px-6 md:px-20 max-w-3xl text-white">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            {hero?.title || "Elevate Hope & Care Association"}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {hero?.content ||
              "Transforming lives through love, care and education."}
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              to={hero?.buttonLink || "/donate"}
              className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-xl font-semibold transition"
            >
              {hero?.buttonText || "Donate Now"}
            </Link>

            <Link
              to="/about"
              className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-900 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ================= HOME ================= */
export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API_URL}/api/projects`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("✅ PROJECTS:", res.data);

        setProjects(
          Array.isArray(res.data)
            ? res.data
            : res.data.projects || []
        );
      } catch (err) {
        console.error(
          "❌ Fetch error:",
          err.response?.data || err.message
        );

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
    (p) => p.category?.toLowerCase() === "project"
  );

  /* ================= ONGOING ================= */
  const ongoingProjects = projects.filter((p) => {
    const projectDate = new Date(p.date);

    projectDate.setHours(23, 59, 59, 999);

    return (
      p.category?.toLowerCase() === "ongoing" &&
      now <= projectDate
    );
  });

  /* ================= UPCOMING ================= */
  const upcomingProjects = projects.filter(
    (p) => p.category?.toLowerCase() === "upcoming"
  );

  /* ================= PAST EVENTS ================= */
  const pastEvents = projects.filter((p) => {
    const projectDate = new Date(p.date);

    projectDate.setHours(23, 59, 59, 999);

    return (
      now > projectDate &&
      p.category?.toLowerCase() !== "project"
    );
  });

  /* ================= FEATURED PAST EVENTS ================= */
  const featuredPastEvents = pastEvents.slice(0, 3);

  /* ================= NEXT UPCOMING ================= */
  const nextProject =
    [...upcomingProjects].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    )[0] || null;

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800">
      <HeroSlider />

<StatisticsSection />

{/* Continue with Our Projects... */}
      {/* ================= OUR PROJECTS ================= */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-4">
          Our Projects
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Projects and initiatives we have carried out across communities.
        </p>

        {ourProjects.length === 0 ? (
          <p className="text-center text-gray-500">
            No projects available.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {ourProjects.map((project) => (
              <motion.div
                key={project._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-3">
                    {project.shortDesc || project.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-24 bg-white">
  <div className="container mx-auto px-6 md:px-20">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* Left Image */}

      <div>
        <img
  src={about?.image || "/slide/about.PNG"}
  alt={about?.title}
  className="rounded-3xl shadow-2xl w-full object-cover"
/>
      </div>

      {/* Right Content */}

      <div>

        <span className="text-pink-500 font-semibold uppercase tracking-wider">
          About EHCA
        </span>

        <h2 className="text-5xl font-bold mt-3 mb-6 text-blue-900">
  {about?.title || "Empowering Hope. Transforming Lives."}
</h2>

<p className="text-gray-600 leading-8 mb-8">
  {about?.content || "Default About text"}
</p>

        <div className="grid grid-cols-2 gap-4 mb-8">

          <div className="flex items-center gap-3">
            <span className="text-pink-500 text-xl">✓</span>
            Community Development
          </div>

          <div className="flex items-center gap-3">
            <span className="text-pink-500 text-xl">✓</span>
            Healthcare Outreach
          </div>

          <div className="flex items-center gap-3">
            <span className="text-pink-500 text-xl">✓</span>
            Education Support
          </div>

          <div className="flex items-center gap-3">
            <span className="text-pink-500 text-xl">✓</span>
            Youth Empowerment
          </div>

        </div>

        <div className="flex gap-4">

          <Link
  to={about?.buttonLink || "/about"}
  className="bg-blue-900 text-white px-8 py-3 rounded-xl"
>
  {about?.buttonText || "Read More"}
</Link>

          <Link
            to="/donate"
            className="border-2 border-pink-500 text-pink-500 px-8 py-3 rounded-xl hover:bg-pink-500 hover:text-white transition"
          >
            Donate
          </Link>

        </div>

      </div>

    </div>

  </div>
</section>

      {/* ================= ONGOING PROJECTS ================= */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-4">
          Ongoing Projects
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Current programs actively changing lives.
        </p>

        {ongoingProjects.length === 0 ? (
          <p className="text-center text-gray-500">
            No ongoing projects.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {ongoingProjects.map((project) => (
              <motion.div
                key={project._id}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden shadow-lg bg-gray-50"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-3">
                    {project.shortDesc || project.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= UPCOMING PROJECTS ================= */}
      <section className="py-20 px-6 md:px-20 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-4">
          Upcoming Projects
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Future outreach and impact programs.
        </p>

        {upcomingProjects.length === 0 ? (
          <p className="text-center text-gray-500">
            No upcoming projects.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingProjects.map((project) => (
              <motion.div
                key={project._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-3">
                    {project.shortDesc || project.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= PAST EVENTS ================= */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-4">
          Past Events & Gallery
        </h2>

        <p className="text-center text-gray-500 mb-12">
          Moments and achievements from previous outreach events.
        </p>

        {featuredPastEvents.length === 0 ? (
          <p className="text-center text-gray-500">
            No past events available.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPastEvents.map((project) => (
                <motion.div
                  key={project._id}
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden rounded-2xl shadow-lg group bg-white"
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-72 w-full object-cover"
                      onError={(e) => {
                        e.target.src = "/images/no-image.jpg";
                      }}
                    />
                  ) : (
                    <div className="h-72 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image Available
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center text-center text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      {project.title}
                    </h3>

                    <p className="mb-3 line-clamp-4">
                      {project.shortDesc || project.desc}
                    </p>

                    <span className="text-sm text-gray-300">
                      {project.date
                        ? new Date(project.date).toLocaleDateString()
                        : "No Date"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/gallery"
                className="inline-block bg-blue-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
              >
                View Full Gallery
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ================= WHAT WE DO ================= */}
      <DynamicSection
        page="home"
        section="what-we-do"
      />

      <section  
          className="relative text-white text-center py-24 px-6 bg-cover bg-center"  
          style={{  
            backgroundImage:  
              "url('/slide/smile.PNG')",  
          }}  
        >  
          <div className="absolute inset-0 bg-blue-950/40" />  
      
          <div className="relative z-10 max-w-3xl mx-auto">  
            <h2 className="text-5xl font-extrabold mb-6">  
              Be the Reason a Child Smiles Today  
            </h2>  
      
            <p className="text-lg text-gray-200 mb-10">  
              Your support can transform lives and help  
              communities grow through love, care and  
              education.  
            </p>  
      
            {nextProject && (  
              <div className="bg-white/70000 p-8 rounded-2xl mb-8">  
                <h3 className="text-3xl font-bold mb-3">  
                  {nextProject.title}  
                </h3>  
      
                <p className="mb-3">  
                  {nextProject.shortDesc ||  
                    nextProject.desc}  
                </p>  
      
                <p className="text-pink-200">  
                  Upcoming Date:{" "}  
                  {new Date(  
                    nextProject.date  
                  ).toLocaleDateString()}  
                </p>  
              </div>  
            )}  
      
            <button className="bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-xl font-bold transition">  
              Donate Now  
            </button>  
          </div>  
        </section>  

      {/* ================= IMPACT ================= */}
      
    </div>
  );
}