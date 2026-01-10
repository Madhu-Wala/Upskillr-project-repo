import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import lessonRoutes from "./routes/lesson.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import instructorRoutes from "./routes/instructor.routes.js";
import learnerRoutes from "./routes/learner.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import reviewRoutes from "./routes/review.routes.js"; 

// Middleware
import { protect } from "./middleware/auth.middleware.js";

const app = express();

/* =========================
   GLOBAL MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   ROUTES
========================= */

// Auth routes
app.use("/api/auth", authRoutes);

// Course & lesson routes
app.use("/api/courses", courseRoutes);
app.use("/api/courses", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/learners",learnerRoutes);

//quiz routes
app.use("/api",quizRoutes);
app.use("/api/quizzes", quizRoutes);

//review routes
app.use("/api", reviewRoutes);

// Protected test route
app.get("/api/profile", protect, (req, res) => {
  res.status(200).json(req.user);
});

// Health check (ALWAYS keep this)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Upskillr backend is running"
  });
});

/* =========================
   404 HANDLER (IMPORTANT)
========================= */



app.use((req, res) => {
  console.error("❌ Route not found:", req.method, req.originalUrl);
  res.status(404).json({
    message: "Route not found"
  });
});

export default app;
