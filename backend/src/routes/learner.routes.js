import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMyCourses } from "../controllers/learner.controller.js";

const router = express.Router();

router.get("/my-courses", protect, getMyCourses);

export default router;
