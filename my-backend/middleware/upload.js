import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

/* ==========================
   CLOUDINARY STORAGE
========================== */

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "ehca-projects",

    resource_type: "image",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    public_id: `${Date.now()}-${file.originalname
      .split(".")[0]
      .replace(/\s+/g, "-")
      .toLowerCase()}`,
  }),
});

/* ==========================
   MULTER INSTANCE
========================== */

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter(req, file, cb) {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed."
        ),
        false
      );
    }
  },
});

/* ==========================
   EXPORT
========================== */

export default upload;