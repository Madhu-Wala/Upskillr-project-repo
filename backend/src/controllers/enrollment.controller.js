import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

/**
 * @route   POST /api/enrollments/:courseId
 * @desc    Enroll learner in a course
 * @access  Private (Learner)
 */
export const enrollInCourse = async (req, res) => {
  try {
    const userId = req.user._id; // from JWT middleware
    const { courseId } = req.params;

    // 1. Check if course exists & is published
    const course = await Course.findOne({
      _id: courseId,
      status: "published"
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found or unpublished" });
    }

    // 2. Prevent duplicate enrollment
    const existingEnrollment = await Enrollment.findOne({
      userId,
      courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        message: "Already enrolled in this course"
      });
    }

    // 3. Create enrollment
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      status: "in-progress"
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
