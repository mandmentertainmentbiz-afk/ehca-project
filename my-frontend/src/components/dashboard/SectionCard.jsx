import { useState } from "react";
import ContentEditor from "./ContentEditor";

const API_URL = "https://ehca-project-1.onrender.com";

export default function SectionCard({
  section,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onUpdated,
}) {
  const [showEditor, setShowEditor] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const imageUrl = section.image
    ? section.image.startsWith("http")
      ? section.image
      : `${API_URL}${section.image}`
    : null;

  return (
    <>
      <div className="card shadow-sm border-0 mb-3">

        {/* ================= HEADER ================= */}

        <div className="card-header bg-white">

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h5 className="mb-1 text-capitalize">
                {expanded ? "▲" : "▼"}{" "}
                {section.section?.replace(/-/g, " ") ||
                  "Unnamed Section"}
              </h5>

              <small className="text-muted">
                {(section.page?.toUpperCase() || "UNKNOWN")} PAGE
              </small>

              <br />

              <small className="text-secondary">
                Order: {section.order}
              </small>

              <br />

              <small className="text-info">
                {section.items?.length || 0} Item(s)
              </small>

            </div>

            <div className="d-flex gap-2">

              <button
                className="btn btn-light btn-sm"
                onClick={() =>
                  setExpanded(!expanded)
                }
              >
                {expanded ? "Hide" : "Show"}
              </button>

              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={index === 0}
                onClick={onMoveUp}
                title="Move Up"
              >
                ↑
              </button>

              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={index === total - 1}
                onClick={onMoveDown}
                title="Move Down"
              >
                ↓
              </button>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowEditor(true)}
              >
                ✏ Edit
              </button>

            </div>

          </div>

        </div>

        {/* ================= BODY ================= */}

        {expanded && (

          <div className="card-body">

            {/* Image */}

            {imageUrl && (
              <div className="mb-4">

                <img
                  src={imageUrl}
                  alt={section.title || "Section"}
                  className="img-fluid rounded shadow-sm"
                  style={{
                    maxHeight: "250px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />

              </div>
            )}

            {/* Title */}

            <h4 className="fw-bold">
              {section.title || "No Title"}
            </h4>

            {/* Subtitle */}

            {section.subtitle && (
              <h6 className="text-muted mb-3">
                {section.subtitle}
              </h6>
            )}

            {/* Content */}

            <p className="text-muted">
              {section.content ||
                "No content available."}
            </p>

            {/* ================= ITEMS ================= */}

            {section.items?.length > 0 && (

              <div className="mt-4">

                <h6 className="fw-bold mb-3">
                  Items
                </h6>

                <div className="row">

                  {section.items.map(
                    (item, i) => (

                      <div
                        key={i}
                        className="col-md-6 mb-3"
                      >

                        <div className="border rounded p-3 h-100">

                          {item.image && (

                            <img
                              src={
                                item.image.startsWith(
                                  "http"
                                )
                                  ? item.image
                                  : `${API_URL}${item.image}`
                              }
                              alt={item.title}
                              className="img-fluid rounded mb-3"
                              style={{
                                height: "120px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />

                          )}

                          <h6 className="fw-bold">
                            {item.title}
                          </h6>

                          <p className="mb-0 text-muted">
                            {item.description}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

            {/* ================= CTA ================= */}

            {(section.buttonText ||
              section.buttonLink) && (

              <div className="mt-4">

                <h6 className="fw-bold">
                  Call To Action
                </h6>

                {section.buttonText && (
                  <span className="badge bg-success me-2">
                    {section.buttonText}
                  </span>
                )}

                {section.buttonLink && (
                  <span className="badge bg-secondary">
                    {section.buttonLink}
                  </span>
                )}

              </div>

            )}

          </div>

        )}

      </div>

      {/* ================= CONTENT EDITOR ================= */}

      {showEditor && (
        <ContentEditor
          section={section}
          onClose={() =>
            setShowEditor(false)
          }
          onSaved={() => {
            setShowEditor(false);
            onUpdated();
          }}
        />
      )}

    </>
  );
}