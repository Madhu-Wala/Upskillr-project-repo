import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { extractPublicId } from "../utils/cloudinary.util.js";
import { deleteFromCloudinary } from "../services/cloudinary.service.js";

/* ============================
   COURSE THUMBNAIL
============================ */

export const uploadCourseThumbnail = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const { courseId } = req.params;

    const course = await Course.findOne({ _id: courseId, instructorId });
    if (!course) return res.status(403).json({ message: "Unauthorized" });

    course.thumbnail = req.file.path;
    await course.save();

    res.json({
      message: "Thumbnail uploaded",
      thumbnail: course.thumbnail
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const replaceCourseThumbnail = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const { courseId } = req.params;

    const course = await Course.findOne({ _id: courseId, instructorId });
    if (!course) return res.status(403).json({ message: "Unauthorized" });

    if (course.thumbnail) {
      const publicId = extractPublicId(course.thumbnail);
      await deleteFromCloudinary(publicId, "image");
    }

    course.thumbnail = req.file.path;
    await course.save();

    res.json({
      message: "Thumbnail replaced",
      thumbnail: course.thumbnail
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Replace failed" });
  }
};

/* ============================
   LESSON VIDEO
============================ */

export const uploadLessonVideo = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const course = await Course.findOne({
      _id: lesson.courseId,
      instructorId
    });
    if (!course) return res.status(403).json({ message: "Unauthorized" });

    lesson.videoURL = req.file.path;
    await lesson.save();

    res.json({
      message: "Video uploaded",
      videoURL: lesson.videoURL
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const replaceLessonVideo = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    if (lesson.videoURL) {
      const publicId = extractPublicId(lesson.videoURL);
      await deleteFromCloudinary(publicId, "video");
    }

    lesson.videoURL = req.file.path;
    await lesson.save();

    res.json({
      message: "Video replaced",
      videoURL: lesson.videoURL
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Replace failed" });
  }
};

/* ============================
   LESSON PDF (STREAM UPLOAD)
============================ */

export const uploadLessonPDF = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "upskillr/pdfs",
        resource_type: "raw"
      },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        lesson.resources.push({
          name: req.file.originalname,
          url: result.secure_url,
          publicId: result.public_id
        });

        await lesson.save();

        res.json({
          message: "PDF uploaded",
          resource: lesson.resources.at(-1)
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const replaceLessonPDF = async (req, res) => {
  try {
    const { lessonId, resourceIndex } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const resource = lesson.resources[resourceIndex];
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // 🔥 Delete old PDF from Cloudinary
    await deleteFromCloudinary(resource.publicId, "raw");

    // 🔄 Upload new PDF
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "upskillr/pdfs",
        resource_type: "raw"
      },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Upload failed" });
        }

        // 🔁 Replace in MongoDB
        lesson.resources[resourceIndex] = {
          name: req.file.originalname,
          url: result.secure_url,
          publicId: result.public_id
        };

        await lesson.save();

        res.json({
          message: "PDF replaced successfully",
          resource: lesson.resources[resourceIndex]
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteLessonPDF = async (req, res) => {
  try {
    const { lessonId, resourceIndex } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const resource = lesson.resources[resourceIndex];
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    await deleteFromCloudinary(resource.publicId, "raw");

    lesson.resources.splice(resourceIndex, 1);
    await lesson.save();

    res.json({ message: "PDF deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};
