import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { instructorOnly } from "../middleware/instructor.middleware.js";

import {
  createCourse,
  publishCourse,
  getInstructorCourses,getCourseById,
  updateCourse
} from "../controllers/instructor.course.controller.js";
import {
  createLesson,
  updateLesson,
  deleteLesson,
  getInstructorCourseLessons
} from "../controllers/instructor.lesson.controller.js";

import {
  createQuizForLesson,
  addQuestionToQuiz
} from "../controllers/instructor.quiz.controller.js";

import { getInstructorAnalytics } from "../controllers/instructor.controller.js";
import { getCourseThumbnail } from "../controllers/course.controller.js";
import { getInstructorReviews } from "../controllers/review.controller.js";

import {
  uploadCourseThumbnail,
  replaceCourseThumbnail,deleteCourseThumbnail,
  uploadLessonVideo,
  replaceLessonVideo,
  deleteLessonVideo,
  uploadLessonPDF,
  replaceLessonPDF,
  deleteLessonPDF
} from "../controllers/upload.controller.js";

import { uploadMedia } from "../middleware/upload.media.js";
import { uploadPDF } from "../middleware/upload.pdf.js";


const router = express.Router();

/* =======================
   COURSE ROUTES
======================= */

router.post(
  "/courses",
  protect,
  instructorOnly,
  createCourse
);

router.put(
  "/courses/:courseId/publish",
  protect,
  instructorOnly,
  publishCourse
);
// Get a single course (used for syncing Step 1-5)
router.get(
  "/courses/:courseId",
  protect,
  instructorOnly,
  getCourseById
);

// Update course details (used when clicking "Continue" in Step 1)
router.put(
  "/courses/:courseId",
  protect,
  instructorOnly,
  updateCourse
);

router.get(
  "/courses",
  protect,
  instructorOnly,
  getInstructorCourses
);

router.get(
  "/courses/:courseId/thumbnail",
  protect,
  instructorOnly,
  getCourseThumbnail
);

/* =======================
   LESSON ROUTES
======================= */

router.post(
  "/courses/:courseId/lessons",
  protect,
  instructorOnly,
  createLesson
);

router.put(
  "/lessons/:lessonId",
  protect,
  instructorOnly,
  updateLesson
);

router.delete(
  "/lessons/:lessonId",
  protect,
  instructorOnly,
  deleteLesson
);

router.get(
  "/courses/:courseId/lessons",
  protect,
  instructorOnly,
  getInstructorCourseLessons
);

/* =======================
   QUIZ ROUTES
======================= */

router.post(
  "/lessons/:lessonId/quiz",
  protect,
  instructorOnly,
  createQuizForLesson
);

router.post(
  "/quizzes/:quizId/questions",
  protect,
  instructorOnly,
  addQuestionToQuiz
);

/* =======================
   UPLOAD ROUTES
======================= */

// ===============================
// COURSE THUMBNAIL
// ===============================
router.post(
  "/courses/:courseId/thumbnail",
  protect,
  instructorOnly,
  uploadMedia.single("thumbnail"),
  uploadCourseThumbnail
);

router.put(
  "/courses/:courseId/thumbnail",
  protect,
  instructorOnly,
  uploadMedia.single("thumbnail"),
  replaceCourseThumbnail
);

router.delete(
  "/courses/:courseId/thumbnail",
  protect,
  instructorOnly,
  deleteCourseThumbnail
);

// ===============================
// LESSON VIDEO
// ===============================
router.post(
  "/lessons/:lessonId/video",
  protect,
  instructorOnly,
  uploadMedia.single("video"),     // 👈 MUST be "video"
  uploadLessonVideo
);

router.put(
  "/lessons/:lessonId/video",
  protect,
  instructorOnly,
  uploadMedia.single("video"),     // 👈 MUST be "video"
  replaceLessonVideo
);

router.delete(
  "/lessons/:lessonId/video",
  protect,
  instructorOnly,
  deleteLessonVideo // Add this
);


// ===============================
// LESSON PDF
// ===============================
router.post(
  "/lessons/:lessonId/pdf",
  protect,
  instructorOnly,
  uploadPDF.array("files", 5),   // 👈 multiple PDFs
  uploadLessonPDF
);

router.put(
  "/lessons/:lessonId/pdf/:resourceId",
  protect,
  instructorOnly,
  uploadPDF.single("file"),      // 👈 single replacement
  replaceLessonPDF
);

router.delete(
  "/lessons/:lessonId/pdf/:resourceId",
  protect,
  instructorOnly,
  deleteLessonPDF
);

//quiz diagram image
router.post(
  "/upload-misc",
  protect,
  instructorOnly,
  uploadMedia.single("file"), 
  (req, res) => {
    // If multer didn't find a file, just return an empty string for the URL
    if (!req.file) {
      return res.json({ url: "" });
    }
    // Otherwise, return the Cloudinary URL
    res.json({ url: req.file.path || req.file.secure_url });
  }
);



/* =======================
   FEEDBACK
======================= */

router.get(
  "/reviews",
  protect,
  instructorOnly,
  getInstructorReviews
);

/* =======================
   ANALYTICS
======================= */

router.get(
  "/analytics",
  protect,
  instructorOnly,
  getInstructorAnalytics
);

router.get("/test", (req, res) => {
  res.json({ message: "Instructor routes working" });
});


export default router;
