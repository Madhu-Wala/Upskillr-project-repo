import Progress from "../models/Progress.js";
import Lesson from "../models/Lesson.js";

/**
 * @route   POST /api/progress/lesson-complete
 * @desc    Mark lesson as completed
 * @access  Private
 */
export const completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const userId = req.user._id;

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = await Progress.create({
        userId,
        courseId,
        completedLessons: []
      });
    }

    const alreadyCompleted = progress.completedLessons.some(
      (id) => id.toString() === lessonId
    );

    if (!alreadyCompleted) {
      progress.completedLessons.push(lessonId);
    }

    const totalLessons = await Lesson.countDocuments({ courseId });

    if (totalLessons > 0) {
      progress.progressPercent = Math.round(
        (progress.completedLessons.length / totalLessons) * 100
      );
    } else {
      progress.progressPercent = 0;
    }

    progress.lastAccessedLessonId = lessonId;
    progress.lastAccessedAt = new Date();

    if (progress.progressPercent === 100) {
      progress.completedAt = new Date();
    }

    await progress.save();

    res.status(200).json(progress);
  } catch (error) {
    console.error("Complete lesson error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/progress/:courseId/resume
 * @desc    Resume last accessed lesson
 * @access  Private
 */
export const resumeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const progress = await Progress.findOne({ userId, courseId })
      .populate("lastAccessedLessonId");

    if (!progress || !progress.lastAccessedLessonId) {
      return res.status(404).json({
        message: "No progress found for this course"
      });
    }

    res.status(200).json(progress.lastAccessedLessonId);
  } catch (error) {
    console.error("Resume course error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
