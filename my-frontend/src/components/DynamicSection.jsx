import { Link } from "react-router-dom";
import useSection from "../hooks/useSection";

export default function DynamicSection({
  page,
  section,
  showTitle = true,
  showSubtitle = true,
  showContent = true,
  showImage = true,
  showButton = true,
  showItems = true,
  className = "",
}) {
  const data = useSection(page, section);

  if (!data) {
    return null;
  }

  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-6 lg:px-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE - IMAGE */}
          <div>
            {showImage && data.image ? (
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-auto rounded-3xl shadow-2xl object-cover"
              />
            ) : (
              <div className="bg-gray-200 rounded-3xl h-96 flex items-center justify-center">
                <span className="text-gray-500">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - CONTENT */}
          <div>

            {showSubtitle && data.subtitle && (
              <p className="uppercase text-pink-500 font-semibold tracking-wider mb-2">
                {data.subtitle}
              </p>
            )}

            {showTitle && data.title && (
              <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
                {data.title}
              </h2>
            )}

            {showContent && data.content && (
              <p className="text-gray-600 leading-8 mb-8">
                {data.content}
              </p>
            )}

            {/* ITEMS */}
            {showItems &&
              data.items &&
              data.items.length > 0 && (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                  {data.items.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <span className="text-pink-500 text-xl">
                        ✓
                      </span>

                      <div>
                        <h5 className="font-semibold text-gray-800">
                          {item.title}
                        </h5>

                        {item.description && (
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                  ))}

                </div>

              )}

            {/* BUTTON */}
            {showButton &&
              data.buttonText &&
              data.buttonLink && (

                <Link
                  to={data.buttonLink}
                  className="inline-block bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition duration-300"
                >
                  {data.buttonText}
                </Link>

              )}

          </div>

        </div>

      </div>
    </section>
  );
}