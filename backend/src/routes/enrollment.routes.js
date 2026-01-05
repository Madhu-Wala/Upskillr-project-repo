import express from "express";
import {
  enrollInCourse,
  getMyEnrollments
} from "../controllers/enrollment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Enroll in a course
router.post("/:courseId", protect, enrollInCourse);

// Get logged-in user's enrollments
router.get("/my", protect, getMyEnrollments);

export default router;
