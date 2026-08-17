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
/*

Get Impact section from admin/database

Example:

page = home

section = impact
*/
const impact = useSection("home", "impact");


/*

Fallback content.

This is used only if the database has no impact data.
*/
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

Get items from database.

Your admin Impact section should contain:

items: [

{

title: "Lives Impacted",

description: "5,000+",

icon: "users"

}

]
*/
const stats =
impact?.items && impact.items.length > 0
? impact.items
: fallbackStats;


return (
<section className="bg-white py-16 -mt-12 relative z-20">

  <div className="container mx-auto px-6">  {/* OUR IMPACT TITLE */}  
<h2 className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-12">

{impact?.title || "Our Impact"}

</h2>  {/* STATISTICS */}  
<div className="grid md:grid-cols-4 gap-6">  

      {stats.map((item, index) => {  
        /*  
         * Get icon from database.  
         *  
         * If admin enters:  
         * icon: "users"  
         *  
         * it will use FaUsers.  
         */  
        const Icon =  
          iconMap[item.icon?.toLowerCase()] || FaUsers;  

        /*  
         * Support both:  
         *  
         * number  
         *  
         * OR  
         *  
         * description  
         *  
         * depending on how your existing database is structured.  
         */  
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
            transition={{  
              duration: 0.2,  
            }}  
            className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100"  
          >  

            {/* ICON */}  
            <div className="text-pink-500 flex justify-center mb-4">  
              <Icon size={35} />  
            </div>  

            {/* NUMBER */}  
            <h2 className="text-4xl font-bold text-blue-900">  
              {number}  
            </h2>  

            {/* TITLE */}  
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