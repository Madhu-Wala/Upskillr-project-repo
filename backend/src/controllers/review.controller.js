import Rating from "../models/Rating.js";
import Progress from "../models/Progress.js";
import Course from "../models/Course.js";   

export const addCourseReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;
    const { rating, feedback } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }

    // 1️⃣ Check course completion
    const progress = await Progress.findOne({
      userId,
      courseId,
      completedAt: { $exists: true }
    });

    if (!progress) {
      return res.status(403).json({
        message: "Complete the course to leave a review"
      });
    }

    // 2️⃣ Create review
    const review = await Rating.create({
      userId,
      courseId,
      rating,
      feedback
    });

    res.status(201).json({
      message: "Review submitted successfully",
      review
    });

  } catch (error) {
    // Duplicate review
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already reviewed this course"
      });
    }

    console.error("ADD REVIEW ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await Rating.find({ courseId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);

  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getInstructorReviews = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const courses = await Course.find({ instructorId }).select("_id");
    const courseIds = courses.map(c => c._id);

    const reviews = await Rating.find({
      courseId: { $in: courseIds }
    })
      .populate("userId", "name")
      .populate("courseId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);

  } catch (error) {
    console.error("INSTRUCTOR REVIEWS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
