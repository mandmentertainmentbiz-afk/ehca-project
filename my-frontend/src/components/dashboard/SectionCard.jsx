import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Pencil,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

import ContentEditor from "./ContentEditor";

import {
  deletePageContent,
} from "../../services/pageContentService";

const API_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") ||
  "https://ehca-project-1.onrender.com";

export default function SectionCard({
  section,
  index,
  total,
  dragHandleProps,
  onMoveUp,
  onMoveDown,
  onUpdated,
  onDeleted,
}) {
  const [showEditor, setShowEditor] =
    useState(false);

  const [collapsed, setCollapsed] =
    useState(true);

  const imageUrl = section.image
    ? section.image.startsWith("http")
      ? section.image
      : `${API_URL}${section.image}`
    : null;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${section.title || "Untitled Section"}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deletePageContent(section._id);

      alert(
        "Section deleted successfully."
      );

      if (onDeleted) {
        onDeleted();
      }
    } catch (err) {
      console.error(err);

      alert(
        "Failed to delete section."
      );
    }
  };

  return (
    <>
      <div className="card shadow-sm border-0 mb-4">

        {/* ================= HEADER ================= */}

        <div className="card-header bg-white">

          <div className="d-flex justify-content-between align-items-center">

            <div className="d-flex align-items-center gap-3">

              <div
  {...dragHandleProps}
  className="cursor-grab"
  title="Drag to reorder"
>
  <GripVertical
    size={18}
    className="text-secondary"
  />
</div>

              <button
                className="btn btn-sm btn-light"
                onClick={() =>
                  setCollapsed(
                    (prev) => !prev
                  )
                }
              >
                {collapsed ? (
                  <ChevronRight
                    size={18}
                  />
                ) : (
                  <ChevronDown
                    size={18}
                  />
                )}
              </button>

              <div>

                <h5 className="mb-1 text-capitalize">
                  {section.section?.replace(/-/g, " ") || "Unnamed Section"}
                </h5>

                <div className="d-flex flex-wrap gap-2">

                  <span className="badge bg-primary">
                    {section.page || "Unknown"}
                  </span>

                  <span className="badge bg-secondary">
                    Order {section.order}
                  </span>

                  <span
                    className={`badge ${
                      section.isActive
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {section.isActive !== false
  ? "Active"
  : "Hidden"}
                  </span>

                </div>

              </div>

            </div>

            <div className="d-flex gap-2">

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
                disabled={
                  index === total - 1
                }
                onClick={onMoveDown}
                title="Move Down"
              >
                ↓
              </button>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() =>
                  setShowEditor(true)
                }
                title="Edit Section"
              >
                <Pencil size={16} />
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
                title="Delete Section"
              >
                <Trash2 size={16} />
              </button>

            </div>

          </div>

        </div>

        {/* ================= BODY ================= */}

        {!collapsed && (
          <div className="card-body">
            {/* ================= IMAGE ================= */}

            {imageUrl ? (
              <div className="mb-4">
                <img
                  src={imageUrl}
                  alt={section.title || "Section"}
                  className="rounded shadow-sm"
                  style={{
                    width: "100%",
                    maxHeight: "280px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : (
              <div className="text-center py-4 border rounded bg-light">

                <ImageIcon
                  size={40}
                  className="text-secondary"
                />

                <p className="text-muted mt-2 mb-0">
                  No image uploaded
                </p>

              </div>
            )}

            {/* ================= TITLE ================= */}

            <h3 className="fw-bold mb-2">
              {section.title || "No Title"}
            </h3>

            {/* ================= SUBTITLE ================= */}

            {section.subtitle && (
              <h6 className="text-muted mb-3">
                {section.subtitle}
              </h6>
            )}

            {/* ================= CONTENT ================= */}

            <div className="mb-4">

              {section.content ? (
                <p
                  className="text-muted mb-0"
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {section.content}
                </p>
              ) : (
                <p className="text-muted fst-italic mb-0">
                  No content available.
                </p>
              )}

            </div>

            {/* ================= ITEMS ================= */}

            {section.items?.length > 0 && (

              <div className="mt-4">

                <h5 className="fw-bold mb-3">
                  Section Items
                </h5>

                <div className="row">

                  {section.items.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="col-lg-6 mb-3"
                      >

                        <div className="card h-100 border-0 shadow-sm">

                          {item.image && (

                            <img
                              src={
                                item.image.startsWith("http")
                                  ? item.image
                                  : `${API_URL}${item.image}`
                              }
                              alt={item.title}
                              className="card-img-top"
                              style={{
                                height: "180px",
                                objectFit: "cover",
                              }}
                            />

                          )}

                          <div className="card-body">

                            <h6 className="fw-bold">
                              {item.title || "Untitled"}
                            </h6>

                            <p className="text-muted mb-0">
                              {item.description ||
                                "No description."}
                            </p>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

            {/* ================= CALL TO ACTION ================= */}

            {(section.buttonText ||
              section.buttonLink) && (

              <div className="mt-4">

                <hr />

                <h5 className="fw-bold mb-3">
                  Call To Action
                </h5>

                <div className="d-flex flex-wrap gap-2">

                  {section.buttonText && (

                    <span className="badge bg-success fs-6">
                      {section.buttonText}
                    </span>

                  )}

                  {section.buttonLink && (

                    <span className="badge bg-secondary fs-6">
                      {section.buttonLink}
                    </span>

                  )}

                </div>

              </div>

            )}

            </div>
        )}

      </div>

      {/* ================= CONTENT EDITOR ================= */}

      {showEditor && (
        <ContentEditor
          section={section}
          onClose={() => setShowEditor(false)}
          onSaved={() => {
            setShowEditor(false);

            if (onUpdated) {
              onUpdated();
            }
          }}
        />
      )}

    </>
  );
}