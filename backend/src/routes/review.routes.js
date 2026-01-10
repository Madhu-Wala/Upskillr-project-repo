import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  addCourseReview,
  getCourseReviews
} from "../controllers/review.controller.js";

const router = express.Router();

router.post(
  "/courses/:courseId/review",
  protect,
  addCourseReview
);

router.get(
  "/courses/:courseId/reviews",
  getCourseReviews
);

export default router;
