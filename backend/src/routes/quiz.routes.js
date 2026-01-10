import express from "express";
import {
  getQuizForLesson,
  submitQuiz
} from "../controllers/quiz.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { getCourseQuiz } from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/lessons/:lessonId/quiz", protect, getQuizForLesson);
router.post("/quizzes/:quizId/submit", protect, submitQuiz);
router.get("/:courseId", protect, getCourseQuiz);

export default router;
