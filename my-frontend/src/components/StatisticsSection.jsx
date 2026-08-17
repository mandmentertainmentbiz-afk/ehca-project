import { motion } from "framer-motion";
import {
  FaUsers,
  FaHandsHelping,
  FaHeartbeat,
  FaGraduationCap,
  FaGlobe,
  FaChild,
  FaHeart,
  FaSchool,
} from "react-icons/fa";

import useSection from "../hooks/useSection";

/* ================= ICONS ================= */

const iconMap = {
  users: FaUsers,
  communities: FaHandsHelping,
  healthcare: FaHeartbeat,
  education: FaGraduationCap,
  globe: FaGlobe,
  children: FaChild,
  heart: FaHeart,
  school: FaSchool,
};

/* ================= COMPONENT ================= */

export default function StatisticsSection() {
  const impact = useSection("home", "impact");

  /* ================= DEFAULT CONTENT ================= */

  const fallbackStats = [
    {
      icon: "users",
      number: "5,000+",
      title: "Lives Impacted",
    },
    {
      icon: "communities",
      number: "50+",
      title: "Communities Reached",
    },
    {
      icon: "healthcare",
      number: "200+",
      title: "Healthcare Outreach",
    },
    {
      icon: "education",
      number: "1,000+",
      title: "Children Supported",
    },
  ];

  /*
   * Keep the design fixed.
   * Only the content comes from the admin.
   */
  const stats =
    impact?.items && impact.items.length > 0
      ? impact.items
      : fallbackStats;

  return (
    <section className="bg-white py-16 -mt-12 relative z-20">
      <div className="container mx-auto px-6">

        {/* ================= STATISTICS ================= */}

        <div className="grid md:grid-cols-4 gap-6">

          {stats.map((item, index) => {

            const Icon =
              iconMap[item.icon?.toLowerCase()] || FaUsers;

            const number =
              item.number ||
              item.description ||
              "";

            const title =
              item.title ||
              item.label ||
              "";

            return (
              <motion.div
                key={item._id || index}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100"
              >

                {/* ICON — DESIGN STAYS FIXED */}
                <div className="text-pink-500 flex justify-center mb-4">
                  <Icon size={35} />
                </div>

                {/* NUMBER — ADMIN EDITABLE */}
                <h2 className="text-4xl font-bold text-blue-900">
                  {number}
                </h2>

                {/* TITLE — ADMIN EDITABLE */}
                <p className="mt-3 text-gray-600 font-medium">
                  {title}
                </p>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}