import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "upskillr/misc";

    if (file.mimetype.startsWith("image")) folder = "upskillr/thumbnails";
    if (file.mimetype.startsWith("video")) folder = "upskillr/videos";

    return {
      folder,
      resource_type: "auto"
    };
  }
});

export const uploadMedia = multer({ storage });