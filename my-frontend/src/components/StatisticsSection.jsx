import { motion } from "framer-motion";
import {
  FaUsers,
  FaHandsHelping,
  FaHeartbeat,
  FaGraduationCap,
} from "react-icons/fa";

import useSection from "../hooks/useSection";

/* =========================================================
   FIXED IMPACT DESIGN
   The icons and number of cards stay fixed.
   Only the content can come from the admin/database.
========================================================= */

const fixedCards = [
  {
    icon: FaUsers,
    defaultNumber: "5,000+",
    defaultTitle: "Lives Impacted",
  },
  {
    icon: FaHandsHelping,
    defaultNumber: "50+",
    defaultTitle: "Communities Reached",
  },
  {
    icon: FaHeartbeat,
    defaultNumber: "200+",
    defaultTitle: "Healthcare Outreach",
  },
  {
    icon: FaGraduationCap,
    defaultNumber: "1,000+",
    defaultTitle: "Children Supported",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function StatisticsSection() {
  /*
   * Get the Impact section from the admin/database.
   *
   * Expected:
   *
   * page: home
   * section: impact
   *
   * Example database data:
   *
   * {
   *   title: "Our Impact",
   *   items: [
   *     {
   *       number: "50,000+",
   *       title: "Lives Impacted"
   *     },
   *     {
   *       number: "10,000+",
   *       title: "Communities Reached"
   *     },
   *     {
   *       number: "200+",
   *       title: "Healthcare Outreach"
   *     },
   *     {
   *       number: "1,000+",
   *       title: "Children Supported"
   *     }
   *   ]
   * }
   */

  const impact = useSection("home", "impact");

  /* =========================================================
     MERGE DATABASE CONTENT WITH FIXED DESIGN
     
     IMPORTANT:
     We always create exactly FOUR cards.

     If the database contains only one item, the other
     three cards will still appear using their default values.
  ========================================================= */

  const cards = fixedCards.map((card, index) => {
    const adminItem = impact?.items?.[index];

    return {
      ...card,

      /*
       * Admin can change the number.
       * If no value exists, use the default.
       */
      number:
        adminItem?.number ??
        adminItem?.description ??
        card.defaultNumber,

      /*
       * Admin can change the title.
       * If no value exists, use the default.
       */
      title:
        adminItem?.title ??
        adminItem?.label ??
        card.defaultTitle,
    };
  });

  return (
    <section className="bg-white py-16 -mt-12 relative z-20">
      <div className="container mx-auto px-6">

        {/* =================================================
            OUR IMPACT TITLE
        ================================================= */}

        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12">
          {impact?.title || "Our Impact"}
        </h2>

        {/* =================================================
            IMPACT CARDS
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {cards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="
                  bg-white
                  rounded-2xl
                  shadow-xl
                  p-8
                  text-center
                  border
                  border-gray-100
                  transition-shadow
                  hover:shadow-2xl
                "
              >

                {/* =================================================
                    FIXED ICON

                    Admin cannot change this.
                    Each card always keeps its original icon.
                ================================================= */}

                <div className="text-pink-500 flex justify-center mb-4">
                  <Icon size={35} />
                </div>

                {/* =================================================
                    ADMIN EDITABLE NUMBER
                ================================================= */}

                <h2 className="text-4xl font-bold text-blue-900">
                  {item.number}
                </h2>

                {/* =================================================
                    ADMIN EDITABLE TITLE
                ================================================= */}

                <p className="mt-3 text-gray-600 font-medium">
                  {item.title}
                </p>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}