import express from "express";
import { getLessonById } from "../controllers/lesson.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Locked lesson access
router.get("/:lessonId", protect, getLessonById);

export default router;
