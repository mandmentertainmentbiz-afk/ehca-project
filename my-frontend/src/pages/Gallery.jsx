import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://ehca-project-1.onrender.com";

export default function Gallery() {
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/projects`
        );

        const allProjects = Array.isArray(res.data)
          ? res.data
          : res.data.projects || [];

        const past = allProjects.filter((p) => {
          if (!p.date) return false;

          return (
            new Date(p.date) < new Date() ||
            p.category?.toLowerCase() === "past"
          );
        });

        setPastEvents(past);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${API_URL}${imagePath}`;
  };

  return (
    <div className="min-h-screen py-20 px-6 md:px-20">
      <h1 className="text-5xl font-bold text-center mb-4">
        Gallery
      </h1>

      <p className="text-center text-gray-500 mb-12">
        Our past events and community outreach programs.
      </p>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
        {pastEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={getImageUrl(event.image)}
              alt={event.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">
              <h3 className="font-bold text-xl mb-2">
                {event.title}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {event.date
                  ? new Date(event.date).toLocaleDateString()
                  : "No Date"}
              </p>

              <p className="text-gray-600">
                {event.shortDesc || event.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}