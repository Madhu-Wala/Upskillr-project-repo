import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

/**
 * @route   GET /api/lessons/:lessonId
 * @desc    Get lesson (locked unless enrolled)
 * @access  Private
 */
export const getLessonById = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;
    const { lessonId } = req.params;

    // 1. Find lesson
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // 2. Find course
    const course = await Course.findById(lesson.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 3. Instructor can always access own course lessons
    if (role === "instructor" && course.instructorId.equals(userId)) {
      return res.status(200).json(lesson);
    }

    // 4. Learner must be enrolled
    const enrollment = await Enrollment.findOne({
      userId,
      courseId: lesson.courseId
    });

    if (!enrollment) {
      return res.status(403).json({
        message: "You must enroll in this course to access lessons"
      });
    }

    // 5. Access granted
    res.status(200).json(lesson);

  } catch (error) {
    console.error("GET LESSON ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * @route /api/courses/:courseId/lessons
 * @desc Get lessons list with lock status
 * @access Private
 */

export const getLessonsByCourse = async(req,res) => {
    try{
        const { courseId } = req.params;
        const userId = req.user._id;
        const role = req.user.role;

        //1.Verify course
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({message:"Course Not Found!"});
        }

        //2. Fetch lessons (metadata only)
        const lessons = await Lesson.find({courseId})
            .select("_id title order")
            .sort({ order: 1 })
            .lean();

        //3. Instructor Owns Course -> unlocks all
        if(role == "instructor" && course.instructorId.equals(userId)){
            return res.status(200).json(
                lessons.map(lesson => ({
                    ...lesson,
                    isLocked: false
                }))
            );
        }

        //4. Check Enrollment
        const enrollment = await Enrollment.findOne({ userId, courseId })
        const isEnrolled = !!enrollment;

        //5. Attach lock flag
        const lessonWithLock = lessons.map(lesson => ({
            ...lesson,
            isLocked: !isEnrolled
        }));

        res.status(200).json(lessonWithLock);

    }catch(error){
        console.error("LESSON LIST ERROR: ",error);
        res.status(500).json({message:"Server Error"});
    }
};