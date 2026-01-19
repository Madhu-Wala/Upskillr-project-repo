import express from "express";
import { getLessonById } from "../controllers/lesson.controller.js";
import { downloadLessonPDF } from "../controllers/lesson.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import Lesson from "../models/Lesson.js";

const router = express.Router();

/* =========================
   CHECK IF LESSON EXISTS
========================= */
router.get("/:lessonId/exists", protect, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const exists = await Lesson.exists({ _id: lessonId });
    res.status(200).json({ exists: !!exists });
  } catch (err) {
    res.status(400).json({ exists: false });
  }
});
router.get("/:lessonId/resources/:resourceId/download", protect, downloadLessonPDF);

/* =========================
   GET LESSON BY ID
========================= */
router.get("/:lessonId", protect, getLessonById);

export default router;
