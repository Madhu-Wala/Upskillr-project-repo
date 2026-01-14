import Quiz from "../models/Quiz.js";
import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

// export const createQuizForLesson = async(req,res) => {
//     try{
//         const instructorId = req.user._id;
//         const { lessonId } = req.params;

//         const lesson = await Lesson.findById(lessonId);
//         if(!lesson){
//             return res.status(404).json({message:"Lesson Not Found"});
//         }

//         const course = await Course.findOne({
//             _id: lesson.courseId,
//             instructorId
//         });

//         if(!course){
//             return res.status(403).json({message: "Unauthorized"});
//         }

//         const quiz = await Quiz.create({
//             lessonId,
//             courseId: lesson.courseId,
//             questions: []
//         });

//         res.status(201).json(quiz);
//     }catch(error){
//         res.status(500).json({ message: "Server error" });
//     }
// };

export const createQuizForLesson = async (req, res) => {
  try {
    const instructorId = req.user._id;
    const { lessonId } = req.params;
    const { title, totalMarks } = req.body; // Extract title and totalMarks from frontend

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson Not Found" });

    const course = await Course.findOne({
      _id: lesson.courseId,
      instructorId
    });

    if (!course) return res.status(403).json({ message: "Unauthorized" });

    const quiz = await Quiz.create({
      lessonId,
      courseId: lesson.courseId,
      title: title || "Lesson Quiz", // Save title
      totalMarks: totalMarks || 0,   // Save totalMarks
      questions: []
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * @route POST /api/instructor/quizzes/:quizId/questions
 * @desc Add question to quiz
 * @access Instructor
 */
// export const addQuestionToQuiz = async (req, res) => {
//   try {
//     const { quizId } = req.params;
//     const { questionText, options, explanation } = req.body;

//     // ✅ Validation
//     if (!questionText || !options || options.length < 2) {
//       return res.status(400).json({
//         message: "Question text and at least 2 options are required"
//       });
//     }

//     const correctOptions = options.filter(opt => opt.isCorrect);
//     if (correctOptions.length !== 1) {
//       return res.status(400).json({
//         message: "Exactly one option must be correct"
//       });
//     }

//     // ✅ Find quiz
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }

//     // ✅ Push embedded question
//     quiz.questions.push({
//       questionText,
//       options,
//       explanation,
//     });

//     await quiz.save();

//     res.status(200).json({
//       message: "Question added successfully",
//       quiz
//     });

//   } catch (error) {
//     console.error("ADD QUESTION ERROR:", error);
//     res.status(500).json({
//       message: "Server error",
//       error: error.message
//     });
//   }
// };

export const addQuestionToQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    // Extract imgUrl and score from req.body
    const { questionText, options, explanation, imgUrl, score } = req.body;

    if (!questionText || !options || options.length < 2) {
      return res.status(400).json({ message: "Question text and 2 options required" });
    }

    const correctOptions = options.filter(opt => opt.isCorrect);
    if (correctOptions.length !== 1) {
      return res.status(400).json({ message: "Exactly one option must be correct" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Push the full object including new fields
    quiz.questions.push({
      questionText,
      options,
      explanation,
      imgUrl,   // Captured from /upload-misc
      score     // Captured from Step 4 UI
    });

    await quiz.save();

    res.status(200).json({
      message: "Question added successfully",
      quiz
    });
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};