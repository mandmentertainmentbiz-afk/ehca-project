import { useState } from "react";

export default function Admin() {
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [description, setDescription] = useState(localStorage.getItem("desc") || "");

  const handleSave = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("desc", description);
    alert("Content Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-secondary">
        Admin Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-xl">
        <label className="block mb-2 font-semibold">
          Hero Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded mb-4"
          placeholder="Enter Title"
        />

        <label className="block mb-2 font-semibold">
          Hero Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded mb-4"
          placeholder="Enter Description"
        />

        <button
          onClick={handleSave}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}