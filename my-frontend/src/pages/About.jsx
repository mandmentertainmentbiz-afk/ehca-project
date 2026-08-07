import { motion } from "framer-motion";
import SupportMissionForm from "../components/SupportMissionForm";
import useSection from "../hooks/useSection";
import DynamicSection from "../components/DynamicSection";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function About() {

  const about = useSection("about", "about");
  const impact = useSection("about", "impact");
  return (
    <div className="font-sans text-gray-800">

      {/* ================= HERO ================= */}
      <section
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/slide/banner8.png')",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-blue-950/60" />

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            About EHCA
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 leading-8">
            Elevate Hope & Care Association is committed
            to transforming lives through compassion,
            education, healthcare and community support.
          </p>
        </motion.div>
      </section>

      {/* ================= WHO WE ARE ================= */}
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
                Who we are
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

      {/* ================= MISSION & VISION ================= */}
      <section className="py-20 bg-gray-50 px-6 md:px-20">
        
        <div className="grid md:grid-cols-2 gap-10">

          {/* MISSION */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-3xl shadow-lg"
          >
            <h3 className="text-3xl font-bold mb-6 text-blue-900">
              Our Mission
            </h3>

            <p className="text-gray-600 leading-8">
              To uplift communities through education,
              healthcare, emotional support and
              humanitarian outreach programs that
              create lasting impact.
            </p>
          </motion.div>

          {/* VISION */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-3xl shadow-lg"
          >
            <h3 className="text-3xl font-bold mb-6 text-pink-500">
              Our Vision
            </h3>

            <p className="text-gray-600 leading-8">
              A world where every child and community
              has access to care, hope, dignity and
              opportunities for a better future.
            </p>
          </motion.div>

        </div>

      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-20 px-6 md:px-20">

        <h2 className="text-4xl font-bold text-center mb-14">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

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
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
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

      </section>

      {/* ================= IMPACT ================= */}
      <section className="py-20 bg-blue-900 text-white text-center">

        <h2 className="text-4xl font-bold mb-12">
          Our Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20">

          {[
            {
              number: "500+",
              label: "Children Supported",
            },
            {
              number: "20+",
              label: "Communities Reached",
            },
            {
              number: "15+",
              label: "Years of Service",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-10 rounded-3xl"
            >
              <h3 className="text-5xl font-extrabold mb-4 text-yellow-400">
                {item.number}
              </h3>

              <p className="text-lg">
                {item.label}
              </p>
            </motion.div>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 px-6 bg-gray-50 text-center">

        <h2 className="text-5xl font-extrabold mb-6">
          Join Us in Making a Difference
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-lg leading-8">
          Together we can transform lives and create
          hope for children and communities in need.
        </p>

        {/* FORM */}
        <div className="max-w-4xl mx-auto">
          <SupportMissionForm />
        </div>

      </section>

    </div>
  );
}