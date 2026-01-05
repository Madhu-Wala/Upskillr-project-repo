import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

/**
 * @route POST /api/instructor/courses
 * @desc Create a new course
 * @access Private Instructor
 */

export const createCourse = async(req,res) => {
    try{
        const instructorId = req.user._id;

        const{
            title,
            description,
            category,
            difficulty,
            thumbnail
        } = req.body;

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
    }catch(error){
        console.error("CREATE COURSE ERROR: ",error);
        res.status(500).json({message:"Server error"});
    }
};

/**
 * @route PUT /api/instructor/courses/:courseId/publish
 * @desc Publish Course
 * @access Private Instructor
 */

export const publishCourse = async(req,res) => {
    try{
        const { courseId } = req.params;
        const instructorId = req.user._id;

        const course = await Course.findOne({
            _id: courseId,
            instructorId
        });

        if(!course){
            return res.status(404).json({message:"Course Not Found!"});
        }

        course.status = "published";
        course.publishedAt = new Date();
        await course.save();

        res.status(200).json({
            message: "Course Published Successfully!",
            course
        });

    }catch(error){
        console.error("PUBLISH COURSE ERROR: ",error);
        res.status(500).json({message:"Server Error"});
    }
}

/**
 * @route GET /api/instructor/courses
 * @desc View Courses
 * @access Instructor
 */

export const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const courses = await Course.aggregate([
      {
        $match: { instructorId }
      },
      {
        $lookup: {
          from: "enrollments",
          localField: "_id",
          foreignField: "courseId",
          as: "enrollments"
        }
      },
      {
        $addFields: {
          enrollmentsCount: { $size: "$enrollments" }
        }
      },
      {
        $project: {
          enrollments: 0 // remove array, keep count only
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    res.status(200).json(courses);

  } catch (error) {
    console.error("INSTRUCTOR COURSES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};