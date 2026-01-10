import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";

/**
 * @route   GET /api/instructor/analytics
 * @desc    Instructor analytics dashboard
 * @access  Private (Instructor)
 */
export const getInstructorAnalytics = async (req, res) => {
  try {
    const instructorId = req.user._id;

    // 1️⃣ Instructor courses
    const courses = await Course.find({ instructorId }).select("_id status");
    const courseIds = courses.map(c => c._id);

    const totalCourses = courses.length;
    const publishedCourses = courses.filter(
      c => c.status === "published"
    ).length;

    // 2️⃣ Total students (distinct enrollments)
    const totalStudents = await Enrollment.countDocuments({
      courseId: { $in: courseIds }
    });

    // 3️⃣ Quiz analytics
    const progressDocs = await Progress.find({
      courseId: { $in: courseIds },
      "quizAttempts.0": { $exists: true }
    });

    let totalAttempts = 0;
    let totalScore = 0;
    let passedAttempts = 0;

    progressDocs.forEach(progress => {
      progress.quizAttempts.forEach(attempt => {
        totalAttempts++;
        totalScore += attempt.score;
        if (attempt.score >= 60) passedAttempts++;
      });
    });

    const averageScore =
      totalAttempts === 0
        ? 0
        : Math.round(totalScore / totalAttempts);

    const passRate =
      totalAttempts === 0
        ? 0
        : Math.round((passedAttempts / totalAttempts) * 100);

    res.status(200).json({
      success: true,
      data: {
        totalCourses,
        publishedCourses,
        totalStudents,
        quizAnalytics: {
          totalAttempts,
          averageScore,
          passRate
        }
      }
    });

  } catch (error) {
    console.error("INSTRUCTOR ANALYTICS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
