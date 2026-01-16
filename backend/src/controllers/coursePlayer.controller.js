import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import Progress from "../models/Progress.js";

export const getCoursePlayer = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const lessons = await Lesson.find({ courseId }).sort({ order: 1 });

    if (!lessons.length) {
      return res.status(404).json({ message: "No lessons found for this course" });
    }

    const progress = await Progress.findOne({
      userId,
      courseId
    });

    const lastLessonId = progress?.lastAccessedLessonId || lessons[0]._id;

    res.json({
    course: {
        id: course._id,
        title: course.title
    },
    lessons,
    lastAccessedLesson: lastLessonId
    });

  } catch (error) {
    console.error("Course Player Error:", error);
    res.status(500).json({ message: "Failed to load course player" });
  }
};
