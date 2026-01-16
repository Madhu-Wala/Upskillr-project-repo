import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMyCourses } from "../controllers/learner.controller.js";
import { getLearnerDashboard } from "../controllers/learnerDashboard.controller.js";
import { learnerOnly } from "../middleware/learner.middleware.js";
const router = express.Router();

router.get("/my-courses", protect, getMyCourses);
router.get("/dashboard", protect, learnerOnly, getLearnerDashboard);

export default router;
