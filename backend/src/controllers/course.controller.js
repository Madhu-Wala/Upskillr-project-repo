import Course from "../models/Course.js";

/**
 * @route   GET /api/courses
 * @desc    Get all published courses
 * @access  Public
 */
export const getAllCourses = async (req, res) => {
  try {
    const count = await Course.countDocuments();
    console.log("COURSES COUNT:", count);
// Fetch category from query parameters
    const { category } = req.query;
    let query = { status: "published" };

    if (category && category !== "All Categories") {
      query.category = category;
    }
// Fetch courses from the database based on the query
    const courses = await Course.find(query)
      .populate("instructorId", "name");

    console.log("COURSES FOUND:", courses);

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



/**
 * @route   GET /api/courses/:courseId
 * @desc    Get course details
 * @access  Public
 */
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .populate("instructorId", "name");

    if (!course || course.status !== "published") {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
export const getCourseThumbnail = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Use .select() to only fetch the thumbnail field
    const course = await Course.findById(courseId).select("thumbnail");

    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: "Course not found" 
      });
    }

    res.status(200).json({
      success: true,
      thumbnail: course.thumbnail || "" // Return empty string if no thumbnail yet
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server error fetching thumbnail",
      error: error.message 
    });
  }
};