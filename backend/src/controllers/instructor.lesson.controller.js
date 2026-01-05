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
    const { title, videoURL, order, resources } = req.body;

    // 🔍 Validate input
    if (!title || !videoURL || order === undefined) {
      return res.status(400).json({
        message: "title, videoURL and order are required"
      });
    }

    // 🔍 Verify course ownership
    const course = await Course.findOne({
      _id: courseId,
      instructorId
    });

    if (!course) {
      return res.status(403).json({
        message: "You do not own this course"
      });
    }

    // ✅ Create lesson
    const lesson = await Lesson.create({
      courseId,
      title,
      videoURL,
      order,
      resources: resources || []
    });

    // ✅ Safe increment
    course.lessonsCount = (course.lessonsCount || 0) + 1;
    await course.save();

    res.status(201).json(lesson);

  } catch (error) {
    console.error("CREATE LESSON ERROR FULL:", error);
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * @route PUT /api/instructor/lessons/:lessonId
 * @desc Update a lesson
 * @access Instructor
 */

export const updateLesson = async(req,res) => {
  try{
    const instructorId = req.user._id;
    const { lessonId } = req.params;
    const { title, videoURL, order, resources} = req.body;

    //1. Find Lesson  
    const lesson = await Lesson.findById(lessonId);
    if(!lesson){
      return res.status(404).json({message:"Lesson Not Found!"});
    }

    // 2. Verify Course Ownership
    const course = await Course.findOne({
      _id: lesson.courseId,
      instructorId
    });
    
    if(!course){
      return res.status(403).json({message:"You do not own this course!"});
    }

    //3.Update fields safely
    if(title !== undefined) lesson.title = title;
    if(videoURL !== undefined) lesson.videoURL = videoURL;
    if(order !== undefined) lesson.order = order;
    if(resources !== undefined) lesson.resources = resources;

    await lesson.save();
    res.status(200).json(lesson);

  }catch(error){
    console.error("UPDATE LESSON ERROR: ",error);
    res.status(500).json({message:"Server error"});
  }
};

/**
 * @route DELETE /api/instructor/lessons/:lessonId
 * @desc Delete a Lesson
 * @access Instructor
 */

export const deleteLesson = async(req,res) => {
  try{
    const instructorId = req.user._id;
    const { lessonId } = req.params;

    //1. Find Lesson
    const lesson = await Lesson.findById(lessonId);
    if(!lesson){
      return res.status(404).json({message:"Lesson Not Found!"});
    }

    // 2. Verify Course Ownership
    const course = await Course.findOne({
      _id: lesson.courseId,
      instructorId
    });
    
    if(!course){
      return res.status(403).json({message:"You do not own this course!"});
    }

    //3. Delete a Lesson
    await Lesson.findByIdAndDelete(lessonId);

    //4. Decrement lessonCount safely
    course.lessonsCount = Math.max((course.lessonsCount || 1) -1, 0);
    await course.save();

    return res.status(200).json({message:"Lesson deleted successfully!"});

  }catch(error){
    console.error("DELETE LESSON ERROR: ",error);
    res.status(500).json({message:"Server error"});
  }
};
