import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/* ==========================================
   AXIOS INSTANCE
========================================== */

const pageContentAPI = axios.create({
  baseURL: `${API_URL}/page-content`,
  withCredentials: true,
});

/* ==========================================
   ATTACH ADMIN TOKEN
========================================== */

pageContentAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ==========================================
   GET ALL PAGE CONTENT
========================================== */

export const getAllPageContents = async () => {
  const { data } = await pageContentAPI.get("/");
  return data;
};

/* ==========================================
   GET CONTENT FOR A PAGE
   Example:
   /api/page-content/page/home
========================================== */

export const getPageContent = async (page) => {
  const { data } = await pageContentAPI.get(
    `/page/${page}`
  );

  return data;
};

/* ==========================================
   CREATE CONTENT
========================================== */

export const createPageContent = async (content) => {
  const { data } = await pageContentAPI.post(
    "/",
    content
  );

  return data;
};

/* ==========================================
   UPDATE CONTENT
========================================== */

export const updatePageContent = async (
  id,
  updates
) => {
  const { data } = await pageContentAPI.put(
    `/${id}`,
    updates
  );

  return data;
};

/* ==========================================
   UPDATE SECTION ORDER
========================================== */

export const updateSectionOrder = async (
  sections
) => {
  const { data } = await pageContentAPI.put(
    "/reorder/all",
    {
      sections,
    }
  );

  return data;
};

/* ==========================================
   DELETE CONTENT
========================================== */

export const deletePageContent = async (
  id
) => {
  const { data } = await pageContentAPI.delete(
    `/${id}`
  );

  return data;
};

/* ==========================================
   UPLOAD IMAGE
========================================== */

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const token = localStorage.getItem("token");

  const { data } = await axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  return (
    data.imageUrl ||
    data.image ||
    ""
  );
};

/* ==========================================
   EXPORT SERVICE
========================================== */

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