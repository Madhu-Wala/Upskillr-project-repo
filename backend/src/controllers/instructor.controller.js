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

    // 1. Fetch instructor courses
    const courses = await Course.find({ instructorId })
      .select("title status")
      .lean();

    // 2. Attach analytics per course
    const analytics = await Promise.all(
      courses.map(async (course) => {
        const totalEnrollments = await Enrollment.countDocuments({
          courseId: course._id
        });

        const completedCount = await Progress.countDocuments({
          courseId: course._id,
          progressPercent: 100
        });

        const progressStats = await Progress.aggregate([
          { $match: { courseId: course._id } },
          { $group: { _id: null, avgProgress: { $avg: "$progressPercent" } } }
        ]);

        return {
          _id: course._id,
          title: course.title,
          status: course.status,
          totalEnrollments,
          completedCount,
          averageProgress: Math.round(
            progressStats[0]?.avgProgress || 0
          )
        };
      })
    );

    res.status(200).json(analytics);

  } catch (error) {
    console.error("INSTRUCTOR ANALYTICS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
