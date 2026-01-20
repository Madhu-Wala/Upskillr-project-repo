import express from "express";
import {
  getQuizForLesson,
  submitQuiz,
  getQuizStatus,      // ✅ NEW: For checking if user already attempted
  getQuizSolutions,   // ✅ NEW: For "View Solutions" red/green boxes
  checkQuizExists     // ✅ NEW: To decide if "Attempt Quiz" button appears
} from "../controllers/quiz.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// 1. Get Quiz (Start Attempt)
router.get("/lessons/:lessonId/quiz", protect, getQuizForLesson);

// 2. Check if a lesson actually has a quiz (UI Logic)
router.get("/lessons/:lessonId/exists", protect, checkQuizExists);

// 3. Submit Quiz Answers
router.post("/quizzes/:quizId/submit", protect, submitQuiz);

// 4. Check Status (Did I pass? Did I attempt?)
router.get("/quizzes/:quizId/status", protect, getQuizStatus);

// 5. Get Answers (Only allowed after attempting)
router.get("/quizzes/:quizId/solutions", protect, getQuizSolutions);

export default router;