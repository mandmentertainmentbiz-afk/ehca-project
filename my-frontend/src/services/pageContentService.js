import axios from "axios";

  const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ehca-project-1.onrender.com/api";

// ===============================
// CREATE AXIOS INSTANCE
// ===============================
const api = axios.create({
  baseURL: `${API_URL}/page-content`,
  withCredentials: true,
});

// Automatically attach admin token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ===============================
// GET ALL PAGE CONTENT
// ===============================
export const getAllPageContents = async () => {
  const response = await api.get("/");
  return response.data;
};

// ===============================
// GET CONTENT FOR ONE PAGE
// ===============================
export const getPageContent = async (page) => {
  const response = await api.get(`/page/${page}`);
  return response.data;
};

// ===============================
// CREATE CONTENT
// ===============================
export const createPageContent = async (data) => {
  const response = await api.post("/", data);
  return response.data;
};

// ===============================
// UPDATE CONTENT
// ===============================
export const updatePageContent = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `${API_URL}/page-content/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
// ===============================
// DELETE CONTENT
// ===============================
export const deletePageContent = async (
  id
) => {
  const response = await api.delete(
    `/${id}`
  );

  return response.data;
};

// ===============================
// UPLOAD IMAGE TO CLOUDINARY
// ===============================
export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (
    response.data.imageUrl ||
    response.data.image ||
    ""
  );
};


// ===============================
// UPDATE SECTION ORDER
// ===============================
export const updateSectionOrder = async (sections) => {
  const response = await api.put("/reorder/all", {
    sections,
  });

  return response.data;
};

// ===============================
// EXPORT SERVICE
// ===============================
const pageContentService = {
  getAllPageContents,
  getPageContent,
  createPageContent,
  updatePageContent,
  updateSectionOrder,
  deletePageContent,
  uploadImage,
};

export default pageContentService;