import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

/* ================= HERO ================= */
const HeroSlider = () => {
const images = [
"/images/banner8.png",
"/images/img1.jpg",
"/images/img2.jpg",
"/images/img3.jpg",
];

const [index, setIndex] = useState(0);

const savedTitle = localStorage.getItem("title");
const savedDesc = localStorage.getItem("desc");

useEffect(() => {
const interval = setInterval(() => {
setIndex((prev) => (prev + 1) % images.length);
}, 5000);

return () => clearInterval(interval);

}, [images.length]);

return (
<section className="relative min-h-screen flex items-center overflow-hidden">
{/* BACKGROUND */}
<div
className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
style={{
backgroundImage: url(${images[index]}),
}}
/>

{/* OVERLAY */}  
  <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-800/30 to-pink-500/30" />  

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
const [loading, setLoading] = useState(true);

/* ================= FETCH PROJECTS ================= */
useEffect(() => {
const fetchProjects = async () => {
try {
const res = await axios.get(
"https://ehca-project-1.onrender.com/api/projects"
);

setProjects(res.data || []);  

  } catch (err) {  
    console.error("Fetch error:", err);  
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
p.category === "project"
);

/* ================= ONGOING PROJECTS ================= */
const ongoingProjects = projects.filter((p) => {
const projectDate = new Date(p.date);

// Event still active until end of current day  
projectDate.setHours(23, 59, 59, 999);  

return (  
  p.category === "ongoing" &&  
  now <= projectDate  
);

});

/* ================= UPCOMING PROJECTS ================= */
const upcomingProjects = projects.filter(
(p) => p.category === "upcoming"
);

/* ================= PAST EVENTS ================= */
const pastEvents = projects.filter((p) => {
const projectDate = new Date(p.date);

// Event becomes past AFTER 11:59PM  
projectDate.setHours(23, 59, 59, 999);  

return (  
  now > projectDate &&  
  p.category !== "project"  
);

});

/* ================= NEXT UPCOMING ================= */
const nextProject =
[...upcomingProjects]
.sort(
(a, b) =>
new Date(a.date) -
new Date(b.date)
)[0] || null;

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
      Projects and initiatives we have carried out  
      across communities.  
    </p>  

    {ourProjects.length === 0 ? (  
      <p className="text-center text-gray-500">  
        No projects available  
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
                src={`https://ehca-backend-1.onrender.com${p.image}`}  
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

              <button className="text-blue-700 font-semibold hover:text-blue-900 transition">  
                Read More →  
              </button>  
            </div>  
          </motion.div>  
        ))}  
      </div>  
    )}  
  </section>  

  {/* ================= ABOUT ================= */}  
  <section className="py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-12">  
    <motion.img  
      initial={{ opacity: 0, x: -40 }}  
      whileInView={{ opacity: 1, x: 0 }}  
      transition={{ duration: 0.8 }}  
      src="../../images/ehca2.jpeg"  
      alt="about"  
      className="rounded-3xl shadow-2xl w-full md:w-1/2 md:h-110"  
    />  

    <motion.div  
      initial={{ opacity: 0, x: 40 }}  
      whileInView={{ opacity: 1, x: 0 }}  
      transition={{ duration: 0.8 }}  
      className="max-w-xl"  
    >  
      <h2 className="text-4xl font-bold mb-6">  
        Who We Are  
      </h2>  

      <p className="text-gray-600 leading-8 mb-6">  
        EHCA is committed to empowering children  
        and communities through education,  
        healthcare, emotional support and  
        sustainable development initiatives.  
      </p>  

      <button className="bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition">  
        Learn More  
      </button>  
    </motion.div>  
  </section>  

  {/* ================= ONGOING ================= */}  
  <section className="py-20 px-6 md:px-20 bg-white">  
    <h2 className="text-4xl font-bold text-center mb-4">  
      Ongoing Projects  
    </h2>  

    <p className="text-center text-gray-500 mb-12">  
      Current programs actively changing lives.  
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
                src={`https://ehca-backend-1.onrender.com${p.image}`}  
                alt={p.title}  
                className="w-full h-56 object-cover"  
              />  
            )}  

            <div className="p-6">  
              <div className="flex justify-between items-center mb-3">  
                <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">  
                  Active  
                </span>  

                <span className="text-sm text-gray-500">  
                  {new Date(  
                    p.date  
                  ).toLocaleDateString()}  
                </span>  
              </div>  

              <h3 className="text-xl font-bold mb-2">  
                {p.title}  
              </h3>  

              <p className="text-gray-600 mb-4 line-clamp-3">  
                {p.shortDesc || p.desc}  
              </p>  

              <button className="text-blue-700 font-semibold hover:text-blue-900 transition">  
                Read More →  
              </button>  
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
                src={`https://ehca-backend-1.onrender.com${p.image}`}  
                alt={p.title}  
                className="w-full h-56 object-cover"  
              />  
            )}  

            <div className="p-6">  
              <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">  
                Upcoming  
              </span>  

              <h3 className="text-xl font-bold mt-4 mb-2">  
                {p.title}  
              </h3>  

              <p className="text-gray-600 mb-4 line-clamp-3">  
                {p.shortDesc || p.desc}  
              </p>  

              <p className="text-blue-700 font-semibold mb-4">  
                {new Date(  
                  p.date  
                ).toLocaleDateString()}  
              </p>  

              <button className="text-blue-700 font-semibold hover:text-blue-900 transition">  
                Read More →  
              </button>  
            </div>  
          </div>  
        ))}  
      </div>  
    )}  
  </section>  

  {/* ================= PAST EVENTS ================= */}  
  <section className="py-20 px-6 md:px-20">  
    <h2 className="text-4xl font-bold text-center mb-4">  
      Past Events & Gallery  
    </h2>  

    <p className="text-center text-gray-500 mb-12">  
      Moments and achievements from previous  
      outreach events.  
    </p>  

    {pastEvents.length === 0 ? (  
      <p className="text-center text-gray-500">  
        No past events  
      </p>  
    ) : (  
      <div className="grid md:grid-cols-3 gap-6">  
        {pastEvents.map((p) => (  
          <motion.div  
            key={p._id}  
            whileHover={{ scale: 1.03 }}  
            className="relative overflow-hidden rounded-2xl shadow-lg group"  
          >  
            {p.image ? (  
              <img  
                src={`https://ehca-backend-1.onrender.com${p.image}`}  
                alt={p.title}  
                className="h-72 w-full object-cover"  
              />  
            ) : (  
              <div className="h-72 bg-gray-300 flex items-center justify-center text-gray-600">  
                No Image  
              </div>  
            )}  

            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center text-white p-6">  
              <h3 className="text-2xl font-bold mb-2">  
                {p.title}  
              </h3>  

              <p className="mb-3 line-clamp-4">  
                {p.shortDesc || p.desc}  
              </p>  

              <span className="text-sm text-gray-300">  
                {new Date(  
                  p.date  
                ).toLocaleDateString()}  
              </span>  
            </div>  
          </motion.div>  
        ))}  
      </div>  
    )}  
  </section>  

  {/* ================= CTA ================= */}  
  <section  
    className="relative text-white text-center py-24 px-6 bg-cover bg-center"  
    style={{  
      backgroundImage:  
        "url('/images/smile.PNG')",  
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
  <section className="py-20 bg-gray-50 text-center">  
    <h2 className="text-4xl font-bold mb-12">  
      Our Impact  
    </h2>  

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">  
      {[  
        "500+ Children",  
        "20+ Communities",  
        "15+ Years",  
      ].map((item, i) => (  
        <motion.div  
          key={i}  
          whileHover={{ scale: 1.05 }}  
          className="bg-white p-10 rounded-3xl shadow-lg"  
        >  
          <h3 className="text-4xl font-extrabold text-yellow-500 mb-3">  
            {item}  
          </h3>  

          <p className="text-gray-600">  
            Lives impacted positively  
          </p>  
        </motion.div>  
      ))}  
    </div>  
  </section>  
</div>

);
}