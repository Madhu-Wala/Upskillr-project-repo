import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { instructorOnly } from "../middleware/instructor.middleware.js";

import {
  createCourse,
  publishCourse,
  getInstructorCourses
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

import { getInstructorReviews } from "../controllers/review.controller.js";

import {
  uploadCourseThumbnail,
  replaceCourseThumbnail,
  uploadLessonVideo,
  replaceLessonVideo,
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

router.get(
  "/courses",
  protect,
  instructorOnly,
  getInstructorCourses
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

// Course Thumbnail
router.post(
  "/courses/:courseId/thumbnail",
  protect,
  instructorOnly,
  uploadMedia.single("file"),
  uploadCourseThumbnail
);

router.put(
  "/courses/:courseId/thumbnail",
  protect,
  instructorOnly,
  uploadMedia.single("file"),
  replaceCourseThumbnail
);

// Lesson Video
router.post(
  "/lessons/:lessonId/video",
  protect,
  instructorOnly,
  uploadMedia.single("file"),
  uploadLessonVideo
);

router.put(
  "/lessons/:lessonId/video",
  protect,
  instructorOnly,
  uploadMedia.single("file"),
  replaceLessonVideo
);

// Lesson PDF
router.post(
  "/lessons/:lessonId/pdf",
  protect,
  instructorOnly,
  uploadPDF.single("file"),
  uploadLessonPDF
);

router.put(
  "/lessons/:lessonId/pdf/:resourceIndex",
  protect,
  instructorOnly,
  uploadPDF.single("file"),
  replaceLessonPDF
);


router.delete(
  "/lessons/:lessonId/pdf/:resourceIndex",
  protect,
  instructorOnly,
  deleteLessonPDF
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
