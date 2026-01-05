import express from "express";
import{
    getAllCourses,
    getCourseById
} from "../controllers/course.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { getLessonsByCourse } from "../controllers/lesson.controller.js";


const router = express.Router();

router.get("/",getAllCourses);
router.get("/:courseId",getCourseById);

//List Lessons (locked Preview)
router.get("/:courseId/lessons",protect,getLessonsByCourse)

export default router;