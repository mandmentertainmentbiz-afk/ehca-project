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
    <section className={className}>

      {showTitle && data.title && (
        <h2>{data.title}</h2>
      )}

      {showSubtitle && data.subtitle && (
        <h5>{data.subtitle}</h5>
      )}

      {showImage && data.image && (
        <div className="mb-4">
          <img
            src={data.image}
            alt={data.title}
            className="img-fluid rounded"
          />
        </div>
      )}

      {showContent && data.content && (
        <p>{data.content}</p>
      )}

      {showItems &&
        data.items &&
        data.items.length > 0 && (
          <div className="row">

            {data.items.map((item, index) => (

              <div
                key={index}
                className="col-md-4 mb-4"
              >

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid rounded mb-3"
                  />
                )}

                {item.title && (
                  <h5>{item.title}</h5>
                )}

                {item.description && (
                  <p>{item.description}</p>
                )}

              </div>

            ))}

          </div>
        )}

      {showButton &&
        data.buttonText &&
        data.buttonLink && (
          <a
            href={data.buttonLink}
            className="btn btn-primary mt-3"
          >
            {data.buttonText}
          </a>
        )}

    </section>
  );
}