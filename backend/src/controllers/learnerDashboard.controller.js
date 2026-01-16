import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";
import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";

export const getLearnerDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const enrollments = await Enrollment.find({ userId }).populate("courseId");
    const progresses = await Progress.find({ userId });

    let totalLessonsDone = 0;
    let certificates = 0;
    let totalWatchTime = 0;
    let continueLearning = [];

    for (const enroll of enrollments) {
      const course = enroll.courseId;

      const lessonCount = await Lesson.countDocuments({ courseId: course._id });
      const progress = progresses.find(
        p => p.courseId.toString() === course._id.toString()
      );

      if (progress) {
        totalLessonsDone += progress.completedLessons.length;
        totalWatchTime += progress.watchTime || 0;

        if (progress.completedLessons.length === lessonCount) {
          certificates++;
        } else {
          continueLearning.push({
            courseId: course._id,
            title: course.title,
            thumbnail: course.thumbnail?.url,
            completed: progress.completedLessons.length,
            total: lessonCount,
            lastLesson: progress.lastAccessedLessonId
          });
        }
      }
    }

    res.json({
      stats: {
        hoursLearned: Math.round(totalWatchTime / 3600),
        lessonsDone: totalLessonsDone,
        certificates,
        dayStreak: req.user.streak || 1
      },
      continueLearning
    });

  } catch (err) {
    res.status(500).json({ message: "Dashboard load failed" });
  }
};
