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

  return (return (
  <section className={`py-20 bg-white ${className}`}>
    <div className="container mx-auto px-6 lg:px-20">

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Image */}

        <div>
          {showImage && data.image && (
            <img
              src={data.image}
              alt={data.title}
              className="w-full rounded-3xl shadow-2xl object-cover"
            />
          )}
        </div>

        {/* Right Content */}

        <div>

          {showSubtitle && (
            <p className="uppercase text-pink-500 font-semibold tracking-wider">
              {data.subtitle}
            </p>
          )}

          {showTitle && (
            <h2 className="text-5xl font-bold text-blue-900 mt-2 mb-6">
              {data.title}
            </h2>
          )}

          {showContent && (
            <p className="text-gray-600 leading-8 mb-8">
              {data.content}
            </p>
          )}

          {showItems && data.items?.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {data.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-pink-500">✓</span>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          )}

          {showButton && data.buttonText && (
            <a
              href={data.buttonLink}
              className="inline-block bg-blue-900 text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition"
            >
              {data.buttonText}
            </a>
          )}

        </div>

      </div>

    </div>
  </section>
);
}