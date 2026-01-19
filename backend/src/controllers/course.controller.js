import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Lesson from "../models/Lesson.js"; // ✅ CRITICAL: Import Lesson model
import Progress from "../models/Progress.js";

/**
 * @route   GET /api/courses
 * @desc    Get all published courses (Manual Lesson Fetching)
 * @access  Public
 */
export const getAllCourses = async (req, res) => {
  try {
    const { category } = req.query;
    let query = { status: "published" };

    if (category && category !== "All Categories") {
      query.category = category;
    }

    // 1. Fetch courses as plain JS objects (using .lean())
    const courses = await Course.find(query)
      .populate("instructorId", "name")
      .lean(); 

    // 2. Manually find lessons for each course
    const coursesWithLessons = await Promise.all(
      courses.map(async (course) => {
        const lessons = await Lesson.find({ courseId: course._id }).select("title");
        return { ...course, lessons }; // ✅ Add the lessons array to the course
      })
    );

    console.log(`COURSES FOUND: ${coursesWithLessons.length}`);
    res.status(200).json(coursesWithLessons);

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

    // 1. Fetch Course (using .lean())
    const course = await Course.findById(courseId)
      .populate("instructorId", "name")
      .lean();

    if (!course || course.status !== "published") {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2. Manually Fetch Lessons
    const lessons = await Lesson.find({ courseId: course._id }).select("title");

    // 3. Combine and Send
    res.status(200).json({ ...course, lessons });

  } catch (error) {
    console.error("Error fetching course:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCourseThumbnail = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).select("thumbnail");

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      thumbnail: course.thumbnail || ""
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/**
 * @route   GET /api/courses/recommended
 * @desc    Get recommended courses (Now WITH lessons)
 */
export const getRecommendedCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    const enrolled = await Enrollment.find({ userId }).select("courseId");
    const enrolledIds = enrolled.map(e => e.courseId.toString());

    const courses = await Course.find({
      _id: { $nin: enrolledIds },
      status: "published"
    })
      .sort({ rating: -1 })
      .select("title thumbnail difficulty rating totalLessons instructorId")
      .populate("instructorId", "name")
      .limit(8)
      .lean();

    const formatted = await Promise.all(courses.map(async (c) => {
      const lessons = await Lesson.find({ courseId: c._id }).select("title").limit(5);

      return {
        _id: c._id,
        title: c.title,
        thumbnail: c.thumbnail?.url || null,
        level: c.difficulty || "Beginner",
        duration: `${c.totalLessons || 10}h`,
        
        // ✅ SMART LOGIC:
        // 1. If DB has a rating (e.g., 4.2), use it.
        // 2. If DB is 0, send null (so frontend can decide to show "New" or hidden)
        // 3. OR: Replace `null` with `4.5` if you want to fake it for the demo.
        rating: c.rating > 0 ? c.rating : null, 

        lessons: lessons,
        instructor: c.instructorId?.name || "Upskillr Instructor"
      };
    }));

    res.json(formatted);
  } catch (err) {
    console.error("RECOMMENDED ERROR:", err);
    res.status(500).json({ message: "Failed to load recommended courses" });
  }
};

/**
 * @desc    Get Course Player Data (Lessons + User Progress)
 * @route   GET /api/courses/:courseId/player
 */
export const getCoursePlayer = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    // 1. Fetch Course Details
    const course = await Course.findById(courseId).select("title").lean();
    if (!course) return res.status(404).json({ message: "Course not found" });

    // 2. Fetch All Lessons for this Course
    const lessons = await Lesson.find({ courseId })
      .select("title video duration resources contentMarkdown")
      .sort({ createdAt: 1 })
      .lean();

    // 3. ✅ CRITICAL: Fetch User's Progress for this Course
    const progress = await Progress.findOne({ userId, courseId });

    // 4. Send everything together
    res.json({
      course,
      lessons,
      // If progress exists, send the saved list. If not, send empty array.
      completedLessonIds: progress ? progress.completedLessons : [],
      lastAccessedLesson: progress ? progress.lastAccessedLessonId : null
    });

  } catch (error) {
    console.error("Player Load Error:", error);
    res.status(500).json({ message: "Failed to load course player" });
  }
};