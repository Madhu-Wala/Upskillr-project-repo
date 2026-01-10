import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

/**
 * @route   POST /api/instructor/courses/:courseId/lessons
 * @desc    Add lesson to course
 * @access  Instructor
 */
export const createLesson = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const { courseId } = req.params;
    const { title, videoURL, contentMarkdown, resources } = req.body;

    // 1️⃣ Validate input
    if (!title || !videoURL) {
      return res.status(400).json({
        success: false,
        message: "title and videoURL are required"
      });
    }

    // 2️⃣ Verify course ownership
    const course = await Course.findOne({
      _id: courseId,
      instructorId
    });

    if (!course) {
      return res.status(403).json({
        success: false,
        message: "You do not own this course"
      });
    }

    // 3️⃣ Auto-generate lesson order
    const lessonCount = await Lesson.countDocuments({ courseId });
    const order = lessonCount + 1;

    // 4️⃣ Create lesson
    const lesson = await Lesson.create({
      courseId,
      title,
      videoURL,
      contentMarkdown,
      order,
      resources: resources || []
    });

    // 5️⃣ Increment lessons count safely
    course.lessonsCount = lessonCount + 1;
    await course.save();

    return res.status(201).json({
      success: true,
      data: lesson,
      message: "Lesson created successfully"
    });

  } catch (error) {
    console.error("CREATE LESSON ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * @route   PUT /api/instructor/lessons/:lessonId
 * @desc    Update a lesson
 * @access  Instructor
 */
export const updateLesson = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const { lessonId } = req.params;
    const { title, videoURL, contentMarkdown, resources } = req.body;

    // 1️⃣ Find lesson
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found"
      });
    }

    // 2️⃣ Verify course ownership
    const course = await Course.findOne({
      _id: lesson.courseId,
      instructorId
    });

    if (!course) {
      return res.status(403).json({
        success: false,
        message: "You do not own this course"
      });
    }

    // 3️⃣ Update fields safely
    if (title !== undefined) lesson.title = title;
    if (videoURL !== undefined) lesson.videoURL = videoURL;
    if (contentMarkdown !== undefined) lesson.contentMarkdown = contentMarkdown;
    if (resources !== undefined) lesson.resources = resources;

    await lesson.save();

    return res.status(200).json({
      success: true,
      data: lesson,
      message: "Lesson updated successfully"
    });

  } catch (error) {
    console.error("UPDATE LESSON ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * @route   DELETE /api/instructor/lessons/:lessonId
 * @desc    Delete a lesson
 * @access  Instructor
 */
export const deleteLesson = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const { lessonId } = req.params;

    // 1️⃣ Find lesson
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found"
      });
    }

    // 2️⃣ Verify course ownership
    const course = await Course.findOne({
      _id: lesson.courseId,
      instructorId
    });

    if (!course) {
      return res.status(403).json({
        success: false,
        message: "You do not own this course"
      });
    }

    // 3️⃣ Delete lesson
    await Lesson.findByIdAndDelete(lessonId);

    // 4️⃣ Decrement lessons count safely
    course.lessonsCount = Math.max((course.lessonsCount || 1) - 1, 0);
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Lesson deleted successfully"
    });

  } catch (error) {
    console.error("DELETE LESSON ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * @route   GET /api/instructor/courses/:courseId/lessons
 * @desc    Get all lessons for instructor's course
 * @access  Instructor
 */
export const getInstructorCourseLessons = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const { courseId } = req.params;

    // 1️⃣ Verify instructor owns the course
    const course = await Course.findOne({
      _id: courseId,
      instructorId
    });

    if (!course) {
      return res.status(403).json({
        success: false,
        message: "You do not own this course"
      });
    }

    // 2️⃣ Fetch lessons ordered correctly
    const lessons = await Lesson.find({ courseId })
      .sort({ order: 1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      data: lessons
    });

  } catch (error) {
    console.error("GET INSTRUCTOR LESSONS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};