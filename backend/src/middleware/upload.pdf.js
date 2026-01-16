import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    if (file.mimetype !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }

    return {
      folder: "upskillr/pdfs",
      resource_type: "raw", // ✅ REQUIRED for PDFs
      public_id: `${Date.now()}-${file.originalname
        .replace(/\s+/g, "_")
        .replace(".pdf", "")}`
    };
  }
});

export const uploadPDF = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});
