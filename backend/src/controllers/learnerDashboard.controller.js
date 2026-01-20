import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";
import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";

export const getLearnerDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Fetch all enrollments for this user
    const enrollments = await Enrollment.find({ userId })
      .populate('courseId', 'title thumbnail') 
      .lean();

    let lessonsDone = 0;
    let certificates = 0; // ✅ Initialize certificate count
    let dayStreak = 0;    // Placeholder for streak logic

    const continueLearning = [];

    // 2. Loop through every course the user is enrolled in
    for (const enrollment of enrollments) {
      const course = enrollment.courseId;

      // Safety check: Skip if course was deleted
      if (!course) continue;

      // Get user's progress for this course
      const progress = await Progress.findOne({ userId, courseId: course._id }).lean();
      
      const completedCount = progress?.completedLessons?.length || 0;
      
      // Get actual total lessons in this course
      const totalLessons = await Lesson.countDocuments({ courseId: course._id });

      lessonsDone += completedCount;

      // ✅ CERTIFICATE LOGIC:
      // If the course has lessons AND the user has completed ALL of them
      if (totalLessons > 0 && completedCount === totalLessons) {
        certificates++;
      }
      
      // ✅ CONTINUE LEARNING LOGIC:
      // Only show in "Continue Learning" if started but NOT finished
      else if (totalLessons > 0 && completedCount < totalLessons) {
        continueLearning.push({
          courseId: course._id,
          title: course.title,
          thumbnail: course.thumbnail,
          completed: completedCount,
          total: totalLessons
        });
      }
    }

    // 3. Send Response
    res.status(200).json({
      stats: {
        lessonsDone,
        certificates, // ✅ Sends the calculated count to frontend
        dayStreak
      },
      continueLearning
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};