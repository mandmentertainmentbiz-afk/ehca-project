import { useEffect, useState } from "react";
import {
  updatePageContent,
  uploadImage,
} from "../../services/pageContentService";

export default function ContentEditor({
  section,
  onClose,
  onSaved,
}) {
  /* ==========================
     FORM STATE
  ========================== */

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");

  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [items, setItems] = useState([]);

  /* ==========================
     UI STATE
  ========================== */

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ==========================
     LOAD SECTION DATA
  ========================== */

  useEffect(() => {
    if (!section) return;

    setTitle(section.title || "");
    setSubtitle(section.subtitle || "");
    setContent(section.content || "");

    setButtonText(section.buttonText || "");
    setButtonLink(section.buttonLink || "");

    setImage(section.image || "");
    setImageFile(null);

    setItems(
      Array.isArray(section.items)
        ? [...section.items]
        : []
    );

    setError("");
    setSuccess("");
  }, [section]);

  useEffect(() => {
  return () => {
    if (image?.startsWith("blob:")) {
      URL.revokeObjectURL(image);
    }
  };
}, [image]);

  /* ==========================
     IMAGE HANDLER
  ========================== */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const preview = URL.createObjectURL(file);
    setImage(preview);
  };

  /* ==========================
     ITEM HANDLERS
  ========================== */

  const handleItemChange = (
    index,
    field,
    value
  ) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        title: "",
        description: "",
      },
    ]);
  };

  const removeItem = (index) => {
    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* ==========================
     SAVE CONTENT
  ========================== */

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      let imageUrl = section.image || "";

      /* Upload new image if selected */
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      /* Clean items */
      const cleanedItems = items
        .filter(
          (item) =>
            item.title?.trim() ||
            item.description?.trim()
        )
        .map((item) => ({
          title: item.title?.trim() || "",
          description:
            item.description?.trim() || "",
        }));

      /* Payload */
      const payload = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        content: content.trim(),
        buttonText: buttonText.trim(),
        buttonLink: buttonLink.trim(),
        image: imageUrl,
        items: cleanedItems,
      };

      /* Update section */
      await updatePageContent(
        section._id,
        payload
      );

      setSuccess(
        "Content updated successfully."
      );

      setImageFile(null);

      if (onSaved) {
        onSaved();
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to update content."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ==========================
     RENDER
  ========================== */

  if (!section) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        background: "rgba(0,0,0,.55)",
        overflowY: "auto",
      }}
    >
      <div
        className="modal-dialog modal-xl modal-dialog-scrollable"
      >
        <div className="modal-content">

          {/* HEADER */}

          <div className="modal-header">

            <div>

              <h4 className="mb-1">
                Edit Section
              </h4>

              <small className="text-muted">
                {section.page.toUpperCase()} /
                {" "}
                {section.section}
              </small>

            </div>

            <button
              className="btn-close"
              onClick={onClose}
            />

          </div>

          {/* BODY */}

          <div className="modal-body">

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                {success}
              </div>
            )}

            {/* TITLE */}

            <div className="mb-4">

              <label className="form-label fw-bold">
                Title
              </label>

              <input
                className="form-control"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>

            {/* SUBTITLE */}

            <div className="mb-4">

              <label className="form-label fw-bold">
                Subtitle
              </label>

              <input
                className="form-control"
                value={subtitle}
                onChange={(e) =>
                  setSubtitle(e.target.value)
                }
              />

            </div>

            {/* CONTENT */}

            <div className="mb-4">

              <label className="form-label fw-bold">
                Content
              </label>

              <textarea
                rows="7"
                className="form-control"
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
              />

            </div>

            {/* IMAGE */}

            <div className="mb-4">

              <label className="form-label fw-bold">
                Image
              </label>

              {image && (

                <div className="mb-3">

                  <img
                    src={image}
                    alt=""
                    className="img-fluid rounded"
                    style={{
                      maxHeight: 220,
                    }}
                  />

                </div>

              )}

              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />

            </div>

            {/* BUTTON */}

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label fw-bold">
                  Button Text
                </label>

                <input
                  className="form-control"
                  value={buttonText}
                  onChange={(e) =>
                    setButtonText(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label fw-bold">
                  Button Link
                </label>

                <input
                  className="form-control"
                  value={buttonLink}
                  onChange={(e) =>
                    setButtonLink(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* ================= ITEMS ================= */}

            <hr className="my-4" />

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Section Items</h5>

              <button
                type="button"
                className="btn btn-success"
                onClick={addItem}
              >
                + Add Item
              </button>
            </div>

            {items.length === 0 && (
              <div className="alert alert-secondary">
                No items added.
              </div>
            )}

            {items.map((item, index) => (
              <div
                className="card mb-3"
                key={index}
              >
                <div className="card-body">

                  <div className="row">

                    <div className="col-md-5">
                      <label className="form-label">
                        Item Title
                      </label>

                      <input
                        className="form-control"
                        value={item.title}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        Description
                      </label>

                      <textarea
                        rows="2"
                        className="form-control"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="col-md-1 d-flex align-items-end">
                      <button
                        type="button"
                        className="btn btn-danger w-100"
                        onClick={() =>
                          removeItem(index)
                        }
                      >
                        ×
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* ================= FOOTER ================= */}

          <div className="modal-footer">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn btn-primary"
              disabled={saving}
              onClick={handleSave}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}