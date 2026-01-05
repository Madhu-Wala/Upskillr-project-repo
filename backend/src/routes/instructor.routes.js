import express, { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { instructorOnly } from "../middleware/instructor.middleware.js";
import { getInstructorCourses } from "../controllers/instructor.course.controller.js";
import { getInstructorAnalytics } from "../controllers/instructor.controller.js";

import{
    createCourse,
    publishCourse
} from "../controllers/instructor.course.controller.js";

import{
    createLesson
} from "../controllers/instructor.lesson.controller.js";
import router from "./auth.routes.js";

import{
    updateLesson,
    deleteLesson
} from "../controllers/instructor.lesson.controller.js";


const route = express.Router();


//Course APIs
router.post("/courses", protect, instructorOnly, createCourse);
router.put("/courses/:courseId/publish", protect, instructorOnly,publishCourse);

//Lesson APIs
router.post("/courses/:courseId/lessons", protect, instructorOnly, createLesson);

//Update Lesson
router.put("/lessons/:lessonId", protect, instructorOnly, updateLesson);

//Delete Lesson
router.delete("/lessons/:lessonId", protect, instructorOnly, deleteLesson);

//View instructor's courses
router.get("/courses", protect, instructorOnly, getInstructorCourses);

//Instructor Analytics
router.get("/analytics", protect, getInstructorAnalytics);

export default router;