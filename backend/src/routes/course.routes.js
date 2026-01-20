import express from "express";
import{
    getAllCourses,
    getCourseById,
    getCoursePlayer
} from "../controllers/course.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { learnerOnly } from "../middleware/learner.middleware.js";
import { getLessonsByCourse } from "../controllers/lesson.controller.js";
import { getRecommendedCourses } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/",getAllCourses);
router.get("/recommended",protect, getRecommendedCourses);
router.get("/:courseId",getCourseById);
router.get("/:courseId/player", protect, getCoursePlayer);

//List Lessons (locked Preview)
router.get("/:courseId/lessons",protect,getLessonsByCourse)
router.get("/:courseId/player", protect, learnerOnly, getCoursePlayer);

export default router;