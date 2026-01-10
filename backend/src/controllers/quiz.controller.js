import Quiz from "../models/Quiz.js";
import Progress from "../models/Progress.js";

/**
 * @route   GET /api/lessons/:lessonId/quiz
 * @desc    Get quiz for lesson (only after all lessons completed)
 * @access  Learner
 */
export const getQuizForLesson = async (req, res) => {
  try {
    const userId = req.user._id;
    const { lessonId } = req.params;

    // 1️⃣ Find quiz
    const quiz = await Quiz.findOne({ lessonId });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // 2️⃣ Check enrollment + progress
    const progress = await Progress.findOne({
      userId,
      courseId: quiz.courseId
    });

    if (!progress) {
      return res.status(403).json({
        message: "You are not enrolled in this course"
      });
    }

    // 3️⃣ Lock quiz until lessons completed
    if (progress.progressPercent < 100) {
      return res.status(403).json({
        message: "Complete all lessons to unlock the quiz"
      });
    }

    // 4️⃣ Remove correct answers before sending
    const safeQuiz = {
      _id: quiz._id,
      lessonId: quiz.lessonId,
      totalMarks: quiz.totalMarks,
      questions: quiz.questions.map(q => ({
        _id: q._id,
        questionText: q.questionText,
        options: q.options.map(o => ({
          optionText: o.optionText
        }))
      }))
    };

    res.status(200).json(safeQuiz);

  } catch (error) {
    console.error("GET QUIZ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   POST /api/quizzes/:quizId/submit
 * @desc    Submit quiz answers
 * @access  Learner
 */
export const submitQuiz = async (req, res) => {
  try {
    const userId = req.user._id;
    const { quizId } = req.params;
    const { answers } = req.body;

    // 1️⃣ Find quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // 2️⃣ Check enrollment + progress
    const progress = await Progress.findOne({
      userId,
      courseId: quiz.courseId
    });

    if (!progress) {
      return res.status(403).json({
        message: "You are not enrolled in this course"
      });
    }

    // 3️⃣ Prevent re-attempt
    const alreadyAttempted = progress.quizAttempts.some(
      q => q.quizId.toString() === quizId
    );

    if (alreadyAttempted) {
      return res.status(400).json({
        message: "Quiz already attempted"
      });
    }

    // 4️⃣ Validate quiz has questions
    const totalQuestions = quiz.questions.length;
    if (totalQuestions === 0) {
      return res.status(400).json({
        message: "Quiz has no questions"
      });
    }

    // 5️⃣ Evaluate quiz
    let correctAnswers = 0;

    quiz.questions.forEach((question, index) => {
      const answer = answers.find(a => a.questionIndex === index);
      if (!answer) return;

      const selectedOption =
        question.options[answer.selectedOptionIndex];

      if (selectedOption && selectedOption.isCorrect) {
        correctAnswers++;
      }
    });

    const percentage = Math.round(
      (correctAnswers / totalQuestions) * 100
    );

    // 6️⃣ Save quiz attempt
    progress.quizAttempts.push({
      quizId,
      score: percentage,
      attemptedAt: new Date()
    });

    // 7️⃣ Mark course complete if passed
    if (percentage >= 60) {
      progress.completedAt = new Date();
      progress.progressPercent = 100;
    }

    await progress.save();

    res.status(200).json({
      message: "Quiz submitted successfully",
      score: percentage,
      passed: percentage >= 60
    });

  } catch (error) {
    console.error("QUIZ SUBMIT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCourseQuiz = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    // 1️⃣ Check progress
    const progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      return res.status(403).json({
        message: "You are not enrolled in this course"
      });
    }

    if (progress.progressPercent < 100) {
      return res.status(403).json({
        message: "Complete all lessons to unlock the quiz"
      });
    }

    // 2️⃣ Fetch quiz
    const quiz = await Quiz.findOne({ courseId });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found"
      });
    }

    res.status(200).json(quiz);

  } catch (error) {
    console.error("GET QUIZ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};