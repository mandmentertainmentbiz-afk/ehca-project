import { motion } from "framer-motion";
import SupportMissionForm from "../components/SupportMissionForm";
import useSection from "../hooks/useSection";
import { Link } from "react-router-dom";

export default function About() {
  /* ================= ADMIN CONTENT ================= */

  const hero = useSection("about", "hero");
  const about = useSection("about", "about");
  const cta = useSection("about", "cta");
  const whoWeAre = useSection("about", "who-we-are");
  const mission = useSection("about", "mission");
  const vision = useSection("about", "vision");
  const coreValues = useSection("about", "core-values");
  const impact = useSection("about", "impact");

  return (
    <div className="font-sans text-gray-800">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            hero?.image || "/slide/banner8.png"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-blue-950/70" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6 max-w-4xl text-white"
        >
          <p className="text-pink-300 font-semibold uppercase tracking-widest mb-4">
            {hero?.subtitle || "Elevate Hope & Care Association"}
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            {hero?.title || "About EHCA"}
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 leading-8">
            {hero?.content ||
              "Transforming lives through compassion, education, healthcare and community support."}
          </p>

          {hero?.buttonText && (
            <Link
              to={hero?.buttonLink || "/contact"}
              className="inline-block mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              {hero.buttonText}
            </Link>
          )}
        </motion.div>
      </section>


      {/* =====================================================
          ABOUT EHCA
      ===================================================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-20">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={whoWeAre?.image || "/slide/about.PNG"}
                alt={whoWeAre?.title || "About EHCA"}
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </motion.div>


            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <span className="text-pink-500 font-semibold uppercase tracking-wider">
                {whoWeAre?.subtitle || "About EHCA"}
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-blue-900">
                {whoWeAre?.title ||
                  "Empowering Hope. Transforming Lives."}
              </h2>

              <p className="text-gray-600 leading-8 mb-8">
                {whoWeAre?.content ||
                  "Elevate Hope & Care Association is committed to improving lives through education, healthcare, compassion and community development."}
              </p>


              {/* ADMIN ITEMS */}
              {whoWeAre?.items?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

                  {whoWeAre.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="text-pink-500 text-xl font-bold">
                        ✓
                      </span>

                      <span className="text-gray-700">
                        {item.title}
                      </span>
                    </div>
                  ))}

                </div>
              )}


              {/* FALLBACK HIGHLIGHTS */}
              {!whoWeAre?.items?.length && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

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
              )}


              {/* BUTTON */}
              <div className="flex gap-4 flex-wrap">

                <Link
                  to={whoWeAre?.buttonLink || "/contact"}
                  className="bg-blue-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
                >
                  {whoWeAre?.buttonText || "Read More"}
                </Link>

                <Link
                  to="/donate"
                  className="border-2 border-pink-500 text-pink-500 px-8 py-3 rounded-xl font-semibold hover:bg-pink-500 hover:text-white transition"
                >
                  Donate
                </Link>

              </div>

            </motion.div>

          </div>

        </div>
      </section>


      {/* =====================================================
          WHO WE ARE
      ===================================================== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-20">

          <div className="max-w-4xl mx-auto text-center">

            <span className="text-pink-500 font-semibold uppercase tracking-wider">
              {whoWeAre?.subtitle || "Who We Are"}
            </span>

            <h2 className="text-4xl font-bold text-blue-900 mt-3 mb-6">
              {whoWeAre?.title || "Serving Communities With Purpose"}
            </h2>

            <p className="text-gray-600 leading-8 text-lg">
              {whoWeAre?.content ||
                "We work alongside communities to provide practical support, create opportunities and build a better future for children and vulnerable families."}
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          MISSION & VISION
      ===================================================== */}
      <section className="py-20 px-6 md:px-20 bg-white">

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* MISSION */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-50 p-10 rounded-3xl shadow-lg"
          >
            <span className="text-pink-500 font-semibold uppercase">
              {mission?.subtitle || "Our Mission"}
            </span>

            <h3 className="text-3xl font-bold mt-3 mb-6 text-blue-900">
              {mission?.title || "Our Mission"}
            </h3>

            <p className="text-gray-600 leading-8">
              {mission?.content ||
                "To uplift communities through education, healthcare, emotional support and humanitarian outreach programs that create lasting impact."}
            </p>
          </motion.div>


          {/* VISION */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-blue-900 p-10 rounded-3xl shadow-lg text-white"
          >
            <span className="text-pink-300 font-semibold uppercase">
              {vision?.subtitle || "Our Vision"}
            </span>

            <h3 className="text-3xl font-bold mt-3 mb-6">
              {vision?.title || "Our Vision"}
            </h3>

            <p className="text-blue-100 leading-8">
              {vision?.content ||
                "A world where every child and community has access to care, hope, dignity and opportunities for a better future."}
            </p>
          </motion.div>

        </div>

      </section>


      {/* =====================================================
          CORE VALUES
      ===================================================== */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">

            <span className="text-pink-500 font-semibold uppercase tracking-wider">
              {coreValues?.subtitle || "What Guides Us"}
            </span>

            <h2 className="text-4xl font-bold text-blue-900 mt-3">
              {coreValues?.title || "Our Core Values"}
            </h2>

            {coreValues?.content && (
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                {coreValues.content}
              </p>
            )}

          </div>


          {coreValues?.items?.length > 0 ? (

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {coreValues.items.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center"
                >

                  <h3 className="text-2xl font-bold mb-4 text-blue-900">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">
                    {item.description || item.content}
                  </p>

                </motion.div>
              ))}

            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {[
                {
                  title: "Compassion",
                  desc: "We serve with love and empathy.",
                },
                {
                  title: "Integrity",
                  desc: "We uphold honesty and transparency.",
                },
                {
                  title: "Empowerment",
                  desc: "We help communities become stronger.",
                },
                {
                  title: "Hope",
                  desc: "We inspire brighter futures.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg text-center"
                >

                  <h3 className="text-2xl font-bold mb-4 text-blue-900">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">
                    {item.desc}
                  </p>

                </motion.div>
              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          IMPACT
      ===================================================== */}
      <section className="py-24 bg-blue-950 text-white">

        <div className="max-w-6xl mx-auto px-6 md:px-20">

          <div className="text-center mb-14">

            <span className="text-pink-300 font-semibold uppercase tracking-wider">
              {impact?.subtitle || "Our Impact"}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              {impact?.title || "Making A Difference"}
            </h2>

            {impact?.content && (
              <p className="text-blue-100 max-w-2xl mx-auto mt-4">
                {impact.content}
              </p>
            )}

          </div>


          {impact?.items?.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {impact.items.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.04 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-3xl text-center border border-white/10"
                >

                  <h3 className="text-5xl font-extrabold mb-3 text-yellow-400">
                    {item.title}
                  </h3>

                  <p className="text-lg text-blue-100">
                    {item.description || item.content}
                  </p>

                </motion.div>
              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="py-24 px-6 bg-gray-50 text-center">

        <div className="max-w-4xl mx-auto">

          <span className="text-pink-500 font-semibold uppercase">
            {cta?.subtitle || "Get Involved"}
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mt-3 mb-6">
            {cta?.title || "Join Us in Making a Difference"}
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mb-10 text-lg leading-8">
            {cta?.content ||
              "Together we can transform lives and create hope for children and communities in need."}
          </p>

         

          

          <SupportMissionForm />

       
        </div>

      </section>

    </div>
  );
}