import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/* ==========================
   AXIOS INSTANCE
========================== */

const pageContentAPI = axios.create({
  baseURL: `${API_URL}/page-content`,
});

/* ==========================
   ATTACH ADMIN TOKEN
========================== */

pageContentAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ==========================
   GET ALL PAGE CONTENT
========================== */

export const getAllPageContents = async () => {
  const response = await pageContentAPI.get("/");
  return response.data;
};

/* ==========================
   GET PAGE CONTENT
========================== */

export const getPageContent = async (page) => {
  const response = await pageContentAPI.get(`/${page}`);
  return response.data;
};

/* ==========================
   CREATE CONTENT
========================== */

export const createPageContent = async (data) => {
  const response = await pageContentAPI.post("/", data);
  return response.data;
};

/* ==========================
   UPDATE CONTENT
========================== */

export const updatePageContent = async (
  id,
  data
) => {
  const response = await pageContentAPI.put(
    `/${id}`,
    data
  );

  return response.data;
};

/* ==========================
   UPDATE SECTION ORDER
========================== */

export const updateSectionOrder = async (
  sections
) => {
  const response = await pageContentAPI.put(
    "/reorder/all",
    {
      sections,
    }
  );

  return response.data;
};

/* ==========================
   DELETE CONTENT
========================== */

export const deletePageContent = async (
  id
) => {
  const response = await pageContentAPI.delete(
    `/${id}`
  );

  return response.data;
};

/* ==========================
   UPLOAD IMAGE
========================== */

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
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data.imageUrl;
};

/* ==========================
   EXPORT SERVICE
========================== */

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