import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

/**
 * @route POST /api/instructor/courses
 * @desc Create a new course
 * @access Instructor
 */
export const createCourse = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const { title, description, category, difficulty, thumbnail } = req.body;

    if (!title || !description || !category || !difficulty) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      difficulty,
      thumbnail,
      instructorId,
      status: "draft"
    });

    res.status(201).json(course);

  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE COURSE
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE COURSE
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.courseId,
      { $set: req.body }, // Updates only the fields sent in the request
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



/**
 * @route PUT /api/instructor/courses/:courseId/publish
 * @desc Publish a course
 * @access Instructor
 */
export const publishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user._id;

    const course = await Course.findOne({
      _id: courseId,
      instructorId
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found or you do not own it"
      });
    }

    if (course.lessonsCount === 0) {
      return res.status(400).json({
        message: "Add at least one lesson before publishing"
      });
    }

    course.status = "published";
    course.publishedAt = new Date();
    await course.save();

    res.status(200).json({
      message: "Course published successfully",
      course
    });

  } catch (error) {
    console.error("PUBLISH COURSE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route GET /api/instructor/courses
 * @desc View instructor courses with enrollment count
 * @access Instructor
 */
export const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const courses = await Course.aggregate([
      // 1. Find courses belonging to this instructor
      { $match: { instructorId } },

      // 2. Lookup Enrollments AND the Student Details inside them
      {
        $lookup: {
          from: "enrollments",
          let: { courseId: "$_id" },
          pipeline: [
            // Match enrollment to this specific course
            { $match: { $expr: { $eq: ["$courseId", "$$courseId"] } } },
            
            // Nested Lookup: Get User details for this enrollment
            {
              $lookup: {
                from: "users",       // Assumes your users collection is named "users"
                localField: "userId", // ✅ MATCHED YOUR SCHEMA (was studentId)
                foreignField: "_id",
                as: "studentDetails"
              }
            },
            
            // Flatten the studentDetails array (since lookup returns an array)
            { $unwind: "$studentDetails" },

            // Select only the fields we need for the frontend
            {
              $project: {
                _id: "$studentDetails._id",
                name: "$studentDetails.name",
                email: "$studentDetails.email",
                avatar: "$studentDetails.avatar",
                progress: 1,           // Keep progress if you add it to enrollment schema later
                enrolledAt: "$createdAt" // Enrollment date
              }
            }
          ],
          as: "students" // This creates the 'students' array the frontend expects
        }
      },

      // 3. Add the count field based on the array length
      {
        $addFields: {
          enrollmentsCount: { $size: "$students" }
        }
      },

      // 4. Sort newest first
      { $sort: { createdAt: -1 } }
    ]);

    res.status(200).json(courses);

  } catch (error) {
    console.error("INSTRUCTOR COURSES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

import Lesson from "../models/Lesson.js"; // Import your Lesson model
import Quiz from "../models/Quiz.js";     // Import your Quiz model

/**
 * @route DELETE /api/instructor/courses/:courseId
 * @desc Delete course, lessons, quizzes, and enrollments
 * @access Instructor
 */
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user._id;

    // 1. Verify Ownership (Security Check)
    const course = await Course.findOne({ _id: courseId, instructorId });

    if (!course) {
      return res.status(404).json({
        message: "Course not found or you are not authorized"
      });
    }

    // 2. Perform Cascade Deletion
    // Ek saath sab saaf karo (Parallel Execution for speed)
    await Promise.all([
      Lesson.deleteMany({ courseId: courseId }),     // Delete all lessons
      Quiz.deleteMany({ courseId: courseId }),       // Delete all quizzes 
      Enrollment.deleteMany({ courseId: courseId }), // Clear enrollment records
    ]);

    // 3. Delete the Course itself
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
      success: true,
      message: "Course and all related content (Lessons, Quizzes, Enrollments) deleted successfully"
    });

  } catch (error) {
    console.error("CASCADE DELETE ERROR:", error);
    res.status(500).json({ message: "Server error during deletion" });
  }
};