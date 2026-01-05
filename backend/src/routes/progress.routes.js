import express from "express";
import {
  completeLesson,
  resumeCourse
} from "../controllers/progress.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/lesson-complete", protect, completeLesson);
router.get("/:courseId/resume", protect, resumeCourse);

export default router;
