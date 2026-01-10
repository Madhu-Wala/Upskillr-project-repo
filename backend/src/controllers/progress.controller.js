import Progress from "../models/Progress.js";
import Lesson from "../models/Lesson.js";

/**
 * @route   POST /api/progress/lesson-complete
 * @desc    Mark lesson as completed
 * @access  Private
 */
export const completeLesson = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId, lessonId } = req.body;

    if (!courseId || !lessonId) {
      return res.status(400).json({
        message: "courseId and lessonId are required"
      });
    }

    // 1️⃣ Find progress (enrollment check)
    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      return res.status(403).json({
        message: "You are not enrolled in this course"
      });
    }

    // 2️⃣ Prevent duplicate completion
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    // 3️⃣ Calculate progress %
    const totalLessons = await Lesson.countDocuments({ courseId });

    progress.progressPercent =
      totalLessons === 0
        ? 0
        : Math.round(
            (progress.completedLessons.length / totalLessons) * 100
          );

    // 4️⃣ Resume support
    progress.lastAccessedLessonId = lessonId;
    progress.lastAccessedAt = new Date();

    // 5️⃣ Auto-complete course
    if (progress.progressPercent === 100) {
      progress.completedAt = new Date();
    }

    await progress.save();

    res.status(200).json({
      message: "Lesson marked as completed",
      progress
    });

  } catch (error) {
    console.error("COMPLETE LESSON ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/progress/:courseId/resume
 * @desc    Resume next lesson for learner
 * @access  Learner
 */
export const resumeCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    // 1️⃣ Fetch progress
    const progress = await Progress.findOne({ userId, courseId });

    // 2️⃣ Fetch all lessons in order
    const lessons = await Lesson.find({ courseId })
      .sort({ order: 1 })
      .select("_id title order");

    if (lessons.length === 0) {
      return res.status(404).json({
        message: "No lessons found for this course"
      });
    }

    // 3️⃣ No progress → start from first lesson
    if (!progress || progress.completedLessons.length === 0) {
      return res.status(200).json({
        resumeLesson: lessons[0],
        status: "start"
      });
    }

    // 4️⃣ All lessons completed
    if (progress.completedLessons.length === lessons.length) {
      return res.status(200).json({
        status: "course_completed"
      });
    }

    // 5️⃣ Resume next lesson
    const lastLessonIndex = lessons.findIndex(
      lesson =>
        lesson._id.toString() ===
        progress.lastAccessedLessonId?.toString()
    );

    const nextLesson =
      lessons[lastLessonIndex + 1] || lessons[lessons.length - 1];

    return res.status(200).json({
      resumeLesson: nextLesson,
      status: "resume"
    });

  } catch (error) {
    console.error("RESUME COURSE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
