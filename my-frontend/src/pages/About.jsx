import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import SupportMissionForm from "../components/SupportMissionForm";
import useSection from "../hooks/useSection";

export default function About() {
  // ================= DYNAMIC CONTENT =================
  const about = useSection("about", "about");
  const impact = useSection("about", "impact");

  return (
    <div className="font-sans text-gray-800">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/slide/banner8.png')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-950/70" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 max-w-4xl"
        >
          <p className="text-pink-400 font-semibold uppercase tracking-[0.25em] mb-4">
            About EHCA
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            Empowering Hope.
            <br />
            Transforming Lives.
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 leading-8">
            Elevate Hope & Care Association is committed to transforming
            lives through compassion, education, healthcare and community
            support.
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          WHO WE ARE / ABOUT
      ===================================================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={about?.image || "/slide/about.PNG"}
                alt={about?.title || "About EHCA"}
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />

              {/* Small decorative box */}
              <div className="absolute -bottom-6 -right-6 hidden md:block bg-pink-500 text-white p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-extrabold">EHCA</p>
                <p className="text-sm">
                  Serving with hope & care
                </p>
              </div>
            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >

              {/* Subtitle */}
              <p className="text-pink-500 font-semibold uppercase tracking-[0.2em] mb-3">
                {about?.subtitle || "Who We Are"}
              </p>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight mb-6">
                {about?.title || "Empowering Hope. Transforming Lives."}
              </h2>

              {/* Content */}
              <p className="text-gray-600 text-lg leading-8 mb-8">
                {about?.content ||
                  "Elevate Hope & Care Association is a non-profit organization committed to improving lives through education, healthcare, community development and humanitarian support."}
              </p>

              {/* Mission Highlights */}
              <div className="grid sm:grid-cols-2 gap-5 mb-10">

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center font-bold">
                    ✓
                  </span>

                  <div>
                    <h3 className="font-bold text-blue-900">
                      Community Development
                    </h3>

                    <p className="text-sm text-gray-500">
                      Building stronger communities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center font-bold">
                    ✓
                  </span>

                  <div>
                    <h3 className="font-bold text-blue-900">
                      Healthcare Outreach
                    </h3>

                    <p className="text-sm text-gray-500">
                      Bringing care closer to communities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center font-bold">
                    ✓
                  </span>

                  <div>
                    <h3 className="font-bold text-blue-900">
                      Education Support
                    </h3>

                    <p className="text-sm text-gray-500">
                      Creating opportunities for children.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center font-bold">
                    ✓
                  </span>

                  <div>
                    <h3 className="font-bold text-blue-900">
                      Youth Empowerment
                    </h3>

                    <p className="text-sm text-gray-500">
                      Helping young people build better futures.
                    </p>
                  </div>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">

                <Link
                  to={about?.buttonLink || "/about"}
                  className="inline-flex items-center justify-center bg-blue-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition shadow-lg"
                >
                  {about?.buttonText || "Read More"}
                </Link>

                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-xl font-semibold hover:bg-pink-500 hover:text-white transition"
                >
                  Support Our Mission
                </Link>

              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION & VISION
      ===================================================== */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <p className="text-pink-500 font-semibold uppercase tracking-[0.2em] mb-3">
              Our Purpose
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
              What Drives Us
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-10">

            {/* MISSION */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-10 md:p-12 rounded-3xl shadow-lg border-t-4 border-blue-900"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>

              <h3 className="text-3xl font-bold mb-5 text-blue-900">
                Our Mission
              </h3>

              <p className="text-gray-600 text-lg leading-8">
                To uplift communities through education, healthcare,
                emotional support and humanitarian outreach programs
                that create lasting impact.
              </p>
            </motion.div>

            {/* VISION */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-10 md:p-12 rounded-3xl shadow-lg border-t-4 border-pink-500"
            >
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🌍</span>
              </div>

              <h3 className="text-3xl font-bold mb-5 text-pink-500">
                Our Vision
              </h3>

              <p className="text-gray-600 text-lg leading-8">
                A world where every child and community has access
                to care, hope, dignity and opportunities for a better
                future.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CORE VALUES
      ===================================================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <p className="text-pink-500 font-semibold uppercase tracking-[0.2em] mb-3">
              What We Believe
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
              Our Core Values
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                title: "Compassion",
                desc: "We serve with love, empathy and genuine care.",
                icon: "❤️",
              },
              {
                title: "Integrity",
                desc: "We uphold honesty, accountability and transparency.",
                icon: "🤝",
              },
              {
                title: "Empowerment",
                desc: "We help individuals and communities become stronger.",
                icon: "💪",
              },
              {
                title: "Hope",
                desc: "We inspire brighter and more sustainable futures.",
                icon: "🌱",
              },
            ].map((item, index) => (

              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="bg-gray-50 p-8 rounded-3xl text-center shadow-md hover:shadow-xl transition"
              >

                <div className="text-4xl mb-5">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-blue-900">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.desc}
                </p>

              </motion.div>

            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          IMPACT
      ===================================================== */}
      <section className="relative py-24 bg-blue-950 text-white overflow-hidden">

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-500 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-20">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <p className="text-pink-400 font-semibold uppercase tracking-[0.2em] mb-3">
              {impact?.subtitle || "Our Impact"}
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
              {impact?.title || "Making a Difference"}
            </h2>

            {impact?.content && (
              <p className="text-blue-100 text-lg leading-8">
                {impact.content}
              </p>
            )}

          </div>

          {/* Dynamic Impact Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {impact?.items?.length > 0 ? (

              impact.items.map((item, index) => (

                <motion.div
                  key={index}
                  whileHover={{ scale: 1.04 }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-center"
                >

                  <h3 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
                    {item.title}
                  </h3>

                  <p className="text-blue-100">
                    {item.description}
                  </p>

                </motion.div>

              ))

            ) : (

              <>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-3xl text-center"
                >
                  <h3 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
                    500+
                  </h3>
                  <p className="text-blue-100">
                    Children Supported
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-3xl text-center"
                >
                  <h3 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
                    20+
                  </h3>
                  <p className="text-blue-100">
                    Communities Reached
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-3xl text-center"
                >
                  <h3 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
                    200+
                  </h3>
                  <p className="text-blue-100">
                    Healthcare Outreach
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-3xl text-center"
                >
                  <h3 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
                    1,000+
                  </h3>
                  <p className="text-blue-100">
                    Children Supported
                  </p>
                </motion.div>
              </>

            )}

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">

        <div className="container mx-auto text-center">

          <p className="text-pink-500 font-semibold uppercase tracking-[0.2em] mb-4">
            Get Involved
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">
            Join Us in Making a Difference
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-lg leading-8">
            Together we can transform lives and create hope for
            children, families and communities in need.
          </p>

          {/* FORM */}
          <div className="max-w-4xl mx-auto">
            <SupportMissionForm />
          </div>

        </div>

      </section>

    </div>
  );
}