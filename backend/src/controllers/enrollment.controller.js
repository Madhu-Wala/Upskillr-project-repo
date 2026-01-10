import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";

/**
 * @route   POST /api/enrollments/:courseId
 * @desc    Enroll learner in a course
 * @access  Private (Learner)
 */
export const enrollInCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    // 1️⃣ Check course exists & is published
    const course = await Course.findOne({
      _id: courseId,
      status: "published"
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2️⃣ Prevent duplicate enrollment
    const alreadyEnrolled = await Enrollment.findOne({ userId, courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    // 3️⃣ Create enrollment
    const enrollment = await Enrollment.create({
      userId,
      courseId
    });

    // 4️⃣ ✅ CREATE PROGRESS (THIS FIXES YOUR ISSUE)
    await Progress.create({
      userId,
      courseId,
      completedLessons: [],
      quizAttempts: [],
      progressPercent: 0
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment
    });

  } catch (error) {
    console.error("ENROLL ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   GET /api/enrollments/my
 * @desc    Get logged-in user's enrollments
 * @access  Private
 */
export const getMyEnrollments = async (req, res) => {
  try {
    const userId = req.user._id;

    const enrollments = await Enrollment.find({ userId })
      .populate("courseId", "title category difficulty");

    res.status(200).json(enrollments);
  } catch (error) {
    console.error("FETCH ENROLLMENTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
