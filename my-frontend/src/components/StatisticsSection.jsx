import { motion } from "framer-motion";
import {
  FaUsers,
  FaHandsHelping,
  FaHeartbeat,
  FaGraduationCap,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers size={35} />,
    number: "5,000+",
    title: "Lives Impacted",
  },
  {
    icon: <FaHandsHelping size={35} />,
    number: "50+",
    title: "Communities Reached",
  },
  {
    icon: <FaHeartbeat size={35} />,
    number: "200+",
    title: "Healthcare Outreach",
  },
  {
    icon: <FaGraduationCap size={35} />,
    number: "1,000+",
    title: "Children Supported",
  },
];

export default function StatisticsSection() {
  return (
    <section className="bg-white py-16 -mt-12 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100"
            >
              <div className="text-pink-500 flex justify-center mb-4">
                {item.icon}
              </div>

              <h2 className="text-4xl font-bold text-blue-900">
                {item.number}
              </h2>

              <p className="mt-3 text-gray-600 font-medium">
                {item.title}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}