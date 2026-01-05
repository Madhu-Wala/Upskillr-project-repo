import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";

/**
 * @route   GET /api/learners/my-courses
 * @desc    Get learner enrolled courses with progress
 * @access  Private (Learner)
 */
export const getMyCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Fetch enrollments
    const enrollments = await Enrollment.find({ userId })
      .populate({
        path: "courseId",
        select: "title thumbnail category difficulty"
      })
      .sort({ createdAt: -1 })
      .lean();

    // 2. Attach progress per course
    const coursesWithProgress = await Promise.all(
      enrollments.map(async (enrollment) => {
        const progress = await Progress.findOne({
          userId,
          courseId: enrollment.courseId._id
        })
          .populate("lastAccessedLessonId", "title")
          .lean();

        return {
          _id: enrollment.courseId._id,
          title: enrollment.courseId.title,
          thumbnail: enrollment.courseId.thumbnail,
          category: enrollment.courseId.category,
          difficulty: enrollment.courseId.difficulty,
          progressPercent: progress?.progressPercent || 0,
          lastAccessedLesson: progress?.lastAccessedLessonId || null,
          enrolledAt: enrollment.createdAt
        };
      })
    );

    res.status(200).json(coursesWithProgress);

  } catch (error) {
    console.error("MY COURSES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
