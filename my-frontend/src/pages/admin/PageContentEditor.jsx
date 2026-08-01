import { useEffect, useState } from "react";
import axios from "axios";

export default function PageContentEditor() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      const res = await axios.get(`${API}/page-content`);
      setContents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id, field, value) => {
    const updated = contents.map((item) =>
      item._id === id ? { ...item, [field]: value } : item
    );

    setContents(updated);
  };

  const saveContent = async (item) => {
    try {
      const token = localStorage.getItem("token");

await axios.put(
  `${API}/page-content/${item._id}`,
  item,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert("Content updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Website Content Editor</h2>

      {contents.map((item) => (
        <div className="card mb-4" key={item._id}>
          <div className="card-body">

            <h5>{item.section}</h5>

            <label className="form-label mt-3">
              Title
            </label>

            <input
              className="form-control"
              value={item.title || ""}
              onChange={(e) =>
                updateContent(item._id, "title", e.target.value)
              }
            />

            <label className="form-label mt-3">
              Content
            </label>

            <textarea
              rows="6"
              className="form-control"
              value={item.content || ""}
              onChange={(e) =>
                updateContent(item._id, "content", e.target.value)
              }
            />

            <button
              className="btn btn-primary mt-3"
              onClick={() => saveContent(item)}
            >
              Save Changes
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}