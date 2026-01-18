import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { deleteFromCloudinary } from "../services/cloudinary.service.js";

/* ============================
   COURSE THUMBNAIL
============================ */

export const uploadCourseThumbnail = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const course = await Course.findOne({ _id: courseId, instructorId });
    if (!course) return res.status(403).json({ message: "Unauthorized" });

    course.thumbnail = {
      url: req.file.path,
      publicId: req.file.filename // Cloudinary public_id
    };

    await course.save();

    res.json({
      message: "Thumbnail uploaded",
      thumbnail: course.thumbnail
    });

  } catch (err) {
    console.error("UPLOAD THUMBNAIL ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};


export const replaceCourseThumbnail = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const course = await Course.findOne({ _id: courseId, instructorId });
    if (!course) return res.status(403).json({ message: "Unauthorized" });

    // 🔥 Delete old thumbnail
    if (course.thumbnail?.publicId) {
      await deleteFromCloudinary(course.thumbnail.publicId, "image");
    }

    // ✅ Save new one
    course.thumbnail = {
      url: req.file.path,
      publicId: req.file.filename
    };

    await course.save();

    res.json({
      message: "Thumbnail replaced",
      thumbnail: course.thumbnail
    });

  } catch (err) {
    console.error("REPLACE THUMBNAIL ERROR:", err);
    res.status(500).json({ message: "Replace failed" });
  }
};


export const deleteCourseThumbnail = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user._id;

    const course = await Course.findOne({ _id: courseId, instructorId });
    if (!course) return res.status(403).json({ message: "Unauthorized" });

    if (course.thumbnail?.publicId) {
      await deleteFromCloudinary(course.thumbnail.publicId, "image");
    }

    course.thumbnail = undefined;
    await course.save();

    res.json({ message: "Thumbnail deleted" });

  } catch (err) {
    console.error("DELETE THUMBNAIL ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};


/* ============================
   LESSON VIDEO
============================ */

export const uploadLessonVideo = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const instructorId = req.user._id;

    // 1. Debugging logs (Terminal check karo)
    console.log("Lesson ID:", lessonId);
    console.log("File received:", req.file);

    // 1️⃣ File check (Zaroori hai!)
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided or invalid format" });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const course = await Course.findOne({ _id: lesson.courseId, instructorId });
    if (!course) return res.status(403).json({ message: "Unauthorized" });

    lesson.video = {
      url: req.file.path,
      publicId: req.file.filename
    };

    await lesson.save();

    res.json({
      message: "Video uploaded",
      video: lesson.video
    });

  } catch (err) {
    console.error("UPLOAD VIDEO ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};


export const replaceLessonVideo = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    if (lesson.video?.publicId) {
      await deleteFromCloudinary(lesson.video.publicId, "video");
    }

    lesson.video = {
      url: req.file.path,
      publicId: req.file.filename
    };

    await lesson.save();

    res.json({
      message: "Video replaced",
      video: lesson.video
    });

  } catch (err) {
    console.error("REPLACE VIDEO ERROR:", err);
    res.status(500).json({ message: "Replace failed" });
  }
};

export const deleteLessonVideo = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const instructorId = req.user._id;

    // 1. Find lesson
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // 2. Ensure instructor owns the course
    const course = await Course.findOne({
      _id: lesson.courseId,
      instructorId
    });
    if (!course) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 3. If no video exists
    if (!lesson.video || !lesson.video.publicId) {
      return res.status(400).json({ message: "No video to delete" });
    }

    // 4. Delete video from Cloudinary
    await deleteFromCloudinary(lesson.video.publicId, "video");

    // 5. Remove video from lesson
    lesson.video = {url:"", publicId: "" };
    await lesson.save();

    res.json({
      message: "Video deleted successfully"
    });

  } catch (err) {
    console.error("DELETE VIDEO ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};



/* ============================
   LESSON PDF
============================ */

export const uploadLessonPDF = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    // supports single or multiple PDFs
    const files = req.files || [req.file];

    files.forEach(file => {
      lesson.resources.push({
        name: file.originalname,
        url: file.path,
        publicId: file.filename
      });
    });

    await lesson.save();

    res.json({
      message: "PDFs uploaded",
      resources: lesson.resources
    });

  } catch (err) {
    console.error("UPLOAD PDF ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};




export const replaceLessonPDF = async (req, res) => {
  try {
    const { lessonId, resourceId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const resource = lesson.resources.id(resourceId);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    // 🔥 Delete old PDF from Cloudinary
    if (resource.publicId) {
      await deleteFromCloudinary(resource.publicId, "raw");
    }

    // 🔁 Replace with new PDF
    resource.name = req.file.originalname;
    resource.url = req.file.path;
    resource.publicId = req.file.filename;

    await lesson.save();

    res.json({
      message: "PDF replaced",
      resource
    });

  } catch (err) {
    console.error("REPLACE PDF ERROR:", err);
    res.status(500).json({ message: "Replace failed" });
  }
};



export const deleteLessonPDF = async (req, res) => {
  try {
    const { lessonId, resourceId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const resource = lesson.resources.id(resourceId);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    // 🔥 Delete from Cloudinary
    if (resource.publicId) {
      await deleteFromCloudinary(resource.publicId, "raw");
    }

    lesson.resources.pull(resourceId);
    await lesson.save();

    res.json({
      message: "PDF deleted",
      resources: lesson.resources
    });

  } catch (err) {
    console.error("DELETE PDF ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};