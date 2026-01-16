import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "upskillr/misc";
    let resource_type = "image";   // default

    // 🎥 Videos
    if (file.mimetype.startsWith("video")) {
      folder = "upskillr/videos";
      resource_type = "video";
    }

    // 🖼 Images
    else if (file.mimetype.startsWith("image")) {
      if (file.fieldname === "thumbnail") {
        folder = "upskillr/thumbnails";
      } else {
        folder = "upskillr/quiz_assets";
      }
      resource_type = "image";
    }

    else {
      throw new Error("Only images & videos allowed here");
    }

    return {
      folder,
      resource_type,
      allowed_formats: ["jpg", "jpeg", "png", "mp4", "webm", "mov"],
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "")}`
    };
  }
});

export const uploadMedia = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image") ||
      file.mimetype.startsWith("video")
    ) cb(null, true);
    else cb(new Error("Only images & videos allowed"), false);
  }
});
