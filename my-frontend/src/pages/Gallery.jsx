import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://ehca-project-1.onrender.com";

export default function Gallery() {
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API_URL}/api/projects`
        );

        const allProjects = Array.isArray(res.data)
          ? res.data
          : res.data.projects || [];

        // ONLY PAST EVENTS
        const past = allProjects
          .filter(
            (p) =>
              p.category?.toLowerCase() === "past" ||
              p.isPastEvent === true
          )
          .sort(
            (a, b) =>
              new Date(b.date) - new Date(a.date)
          );

        setPastEvents(past);

      } catch (err) {
        console.error(
          "❌ Failed to fetch gallery:",
          err
        );
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading Gallery...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6 md:px-20 bg-gray-50">
      <h1 className="text-5xl font-bold text-center mb-4">
        Gallery
      </h1>

      <p className="text-center text-gray-500 mb-12">
        Our past events and community outreach programs.
      </p>

      {pastEvents.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No past events available.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {pastEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {event.image ? (
                <img
                  src={getImageUrl(event.image)}
                  alt={event.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "/images/no-image.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}

              <div className="p-5">
                <h3 className="font-bold text-xl mb-2">
                  {event.title}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  {event.date
                    ? new Date(
                        event.date
                      ).toLocaleDateString()
                    : "No Date"}
                </p>

                <p className="text-gray-600 line-clamp-4">
                  {event.shortDesc || event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}