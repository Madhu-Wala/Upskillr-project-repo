import Quiz from "../models/Quiz.js";
import Progress from "../models/Progress.js";

/**
 * @desc    Get quiz for a specific lesson (Start Quiz)
 * @route   GET /api/lessons/:lessonId/quiz
 */
export const getQuizForLesson = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ lessonId: req.params.lessonId });
    if (!quiz) return res.status(404).json({ message: "No quiz found for this lesson" });

    // Check if user already attempted this specific quiz
    const progress = await Progress.findOne({
      userId: req.user._id,
      courseId: quiz.courseId
    });

    if (progress && progress.quizAttempts) {
      const hasAttempted = progress.quizAttempts.some(a => a.quizId.equals(quiz._id));
      if (hasAttempted) {
        return res.status(403).json({ message: "Quiz already attempted" });
      }
    }

    // Return quiz WITHOUT the correct answers (for security)
    const safeQuiz = {
      _id: quiz._id,
      title: quiz.title,
      questions: quiz.questions.map(q => ({
        _id: q._id,
        questionText: q.questionText,
        imgUrl: q.imgUrl,
        options: q.options.map(o => ({
          optionText: o.optionText
        }))
      }))
    };

    res.json(safeQuiz);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc    Submit answers and calculate score
 * @route   POST /api/quizzes/:quizId/submit
 */
export const submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const { answers } = req.body; 

    let score = 0;
    let totalPossible = 0;

    // Calculate Score
    quiz.questions.forEach(q => {
      const points = q.score || 1;
      totalPossible += points;

      const userSelectedIdx = answers[q._id]; 
      
      if (userSelectedIdx !== undefined && q.options[userSelectedIdx]?.isCorrect) {
        score += points;
      }
    });

    // Find or Create Progress
    let progress = await Progress.findOne({
      userId: req.user._id,
      courseId: quiz.courseId
    });

    if (!progress) {
      progress = new Progress({
        userId: req.user._id,
        courseId: quiz.courseId,
        quizAttempts: [],
        completedLessons: [] // Ensure array exists
      });
    }

    // 1. Save Quiz Attempt
    progress.quizAttempts.push({
      quizId: quiz._id,
      score: score,
      attemptedAt: new Date(),
      answers: answers
    });

    // 2. ✅ AUTOMATICALLY MARK LESSON AS COMPLETE
    const lessonIdStr = quiz.lessonId.toString();
    const isAlreadyCompleted = progress.completedLessons.some(id => id.toString() === lessonIdStr);

    if (!isAlreadyCompleted) {
      progress.completedLessons.push(quiz.lessonId);
    }

    await progress.save();

    res.json({ 
      score, 
      total: totalPossible,
      passed: (score / totalPossible) >= 0.6 
    });

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
};

/**
 * @desc    Get status (Did I take this quiz?)
 * @route   GET /api/quizzes/:quizId/status
 */
export const getQuizStatus = async (req, res) => {
  try {
    // 1. First, find the quiz to know which Course it belongs to
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // 2. Find the Progress specifically for THIS Course and THIS User
    // ✅ This is the critical fix. We filter by courseId too.
    const progress = await Progress.findOne({ 
      userId: req.user._id, 
      courseId: quiz.courseId 
    });
    
    // 3. Check if the quiz attempt exists in this specific progress document
    const attempt = progress?.quizAttempts?.find(a => 
      a.quizId.toString() === req.params.quizId
    );

    res.json({
      attempted: !!attempt, // Returns true if attempt exists
      passed: attempt ? (attempt.score >= 6) : false, 
      quizId: req.params.quizId
    });
  } catch (error) {
    console.error("Status Check Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Get Solutions (Only allowed if already attempted)
 * @route   GET /api/quizzes/:quizId/solutions
 */
export const getQuizSolutions = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Verify the user actually took the quiz
    const progress = await Progress.findOne({ 
      userId: req.user._id, 
      courseId: quiz.courseId 
    });

    const attempt = progress?.quizAttempts?.find(a => 
      a.quizId.equals(quiz._id)
    );

    if (!attempt) {
      return res.status(403).json({ message: "You must attempt the quiz first." });
    }

    const userAnswers = attempt.answers instanceof Map 
      ? Object.fromEntries(attempt.answers) 
      : attempt.answers;

    const questionsWithSolutions = quiz.questions.map(q => {
      const userSelectedIdx = userAnswers ? userAnswers[q._id.toString()] : null;

      return {
        _id: q._id,
        questionText: q.questionText,
        imgUrl: q.imgUrl,
        explanation: q.explanation,
        options: q.options.map((o, idx) => ({
          optionText: o.optionText,
          isCorrect: o.isCorrect,
          isUserAnswer: userSelectedIdx === idx // ✅ Flag for Red/Green UI
        }))
      };
    });

    res.json({
      _id: quiz._id,
      title: quiz.title,
      questions: questionsWithSolutions
    });

  } catch (error) {
    console.error("Solutions Error:", error);
    res.status(500).json({ message: "Failed to load solutions" });
  }
};

/**
 * @desc    Check if a lesson has a quiz (for UI buttons)
 * @route   GET /api/lessons/:lessonId/exists
 */
export const checkQuizExists = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ lessonId: req.params.lessonId });
    res.json({ 
      exists: !!quiz, 
      quizId: quiz?._id 
    });
  } catch (error) {
    res.json({ exists: false });
  }
};