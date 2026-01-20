import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import Progress from "../models/Progress.js";

/**
 * @route   GET /api/learners/my-courses
 * @desc    Get learner enrolled courses with real progress
 * @access  Private (Learner)
 */
export const getMyCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Fetch enrollments
    const enrollments = await Enrollment.find({ userId })
      .populate({
        path: "courseId",
        select: "title thumbnail category difficulty instructorId",
        populate: {
          path: "instructorId",
          select: "firstName lastName name"
        }
      })
      .sort({ createdAt: -1 })
      .lean();

    const courses = [];

    for (const enrollment of enrollments) {
      const course = enrollment.courseId;

      // ✅ FIX: Check if course exists. If deleted, skip this enrollment.
      if (!course) {
        continue; 
      }

      // 2. Count total lessons in course
      const totalLessons = await Lesson.countDocuments({
        courseId: course._id
      });

      // 3. Get progress
      const progress = await Progress.findOne({
        userId,
        courseId: course._id
      }).lean();

      const completedLessons = progress?.completedLessons || [];
      const completedLessonsCount = completedLessons.length;

      let progressPercent = 0;
      if (totalLessons > 0) {
        progressPercent = Math.round(
          (completedLessonsCount / totalLessons) * 100
        );
      }

      courses.push({
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail || null,
        instructor: course.instructorId?.firstName && course.instructorId?.lastName 
          ? `${course.instructorId.firstName} ${course.instructorId.lastName}`
          : course.instructorId?.name || "Upskillr Team",
        category: course.category,
        difficulty: course.difficulty,

        lessonsCount: totalLessons,
        completedLessons,
        completedLessonsCount,
        progressPercent,
        completed: progressPercent === 100,

        lastAccessedLesson: progress?.lastAccessedLessonId || null,
        enrolledAt: enrollment.createdAt
      });
    }

    res.status(200).json(courses);

  } catch (error) {
    console.error("MY COURSES ERROR:", error);
    res.status(500).json({ message: "Failed to load courses" });
  }
};