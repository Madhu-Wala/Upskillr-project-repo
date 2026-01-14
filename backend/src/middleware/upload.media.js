import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "upskillr/misc";

    // if (file.mimetype.startsWith("image")) folder = "upskillr/thumbnails";
    // if (file.mimetype.startsWith("video")) folder = "upskillr/videos";
    // 1. Check for Videos
    if (file.mimetype.startsWith("video")) {
      folder = "upskillr/videos";
    } 
    // 2. Differentiate between Course Thumbnails and Quiz Images
    else if (file.mimetype.startsWith("image")) {
      // Check the fieldname used in the frontend FormData
      if (file.fieldname === "thumbnail") {
        folder = "upskillr/thumbnails";
      } else {
        folder = "upskillr/quiz_assets";
      }
    }
    return {
      folder,
      resource_type: "auto",
      allowed_formats: ["jpg", "png", "jpeg", "mp4", "pdf"]
    };
  }
});

export const uploadMedia = multer({ storage });