import { useEffect, useState } from "react";
import { CheckCircle, XCircle, ChevronRight } from "lucide-react";
import API from "../../api/axios";

const QuizAttempt = ({ lessonId, onClose, onSubmitted }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [mode, setMode] = useState("attempt"); // attempt | solution

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await API.get(`/api/lessons/${lessonId}/quiz`);
        setQuiz(res.data);
        setMode("attempt");
      } catch {
        // If 403 (Already Attempted), load solutions immediately
        try {
          const status = await API.get(`/api/lessons/${lessonId}/exists`);
          const sol = await API.get(`/api/quizzes/${status.data.quizId}/solutions`);
          setQuiz(sol.data);
          setMode("solution");
        } catch (err) {
          console.error("Error loading quiz/solutions", err);
        }
      }
    };

    loadQuiz();
  }, [lessonId]);

  if (!quiz) return <div className="p-20 text-center">Loading quiz...</div>;

  const submitQuiz = async () => {
    try {
      // 1. Submit user answers
      await API.post(`/api/quizzes/${quiz._id}/submit`, { answers });
      
      // 2. Immediately fetch full solution (with red/green checks)
      const sol = await API.get(`/api/quizzes/${quiz._id}/solutions`);
      setQuiz(sol.data);
      setMode("solution");
      
      // ✅ FIX: Ensure this runs! 
      // This tells CoursePlayer to flip the button to "View Solutions"
      if (onSubmitted) {
        onSubmitted();
      }
      
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      alert("Something went wrong submitting the quiz. Please try again.");
    }
  };

  // --- VIEW SOLUTIONS MODE ---
  if (mode === "solution") {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-black mb-6">Quiz Solutions</h2>

        {quiz.questions.map((q, i) => (
          <div key={q._id} className="mb-8 border-b border-gray-100 pb-8 last:border-0">
            <h3 className="font-bold mb-3 text-lg text-gray-900">
              Q{i + 1}. {q.questionText}
            </h3>

            {/* ✅ ADDED: Image in Solution Mode */}
            {q.imgUrl && (
              <img 
                src={q.imgUrl} 
                alt={`Question ${i + 1}`} 
                className="w-full max-h-64 object-contain mb-4 rounded-lg bg-gray-50 border border-gray-100"
              />
            )}

            {q.options.map((o, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border mb-2 flex justify-between items-center ${
                  o.isCorrect
                    ? "bg-emerald-50 border-emerald-400 text-emerald-900"
                    : o.isUserAnswer
                    ? "bg-rose-50 border-rose-400 text-rose-900"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                <span className="font-medium">{o.optionText}</span>
                <div>
                  {o.isCorrect && <CheckCircle className="inline ml-2 text-emerald-600" size={20} />}
                  {o.isUserAnswer && !o.isCorrect && (
                    <XCircle className="inline ml-2 text-rose-600" size={20} />
                  )}
                </div>
              </div>
            ))}

            {q.explanation && (
              <div className="mt-3 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                <span className="font-bold">Explanation:</span> {q.explanation}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={onClose}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-colors"
        >
          Back to Lesson
        </button>
      </div>
    );
  }

  // --- ATTEMPT QUIZ MODE ---
  const q = quiz.questions[currentIdx];

  return (
    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
      
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
        <span>Question {currentIdx + 1} of {quiz.questions.length}</span>
        <span>{Math.round(((currentIdx + 1) / quiz.questions.length) * 100)}% Completed</span>
      </div>

      <h2 className="text-xl font-bold mb-6 text-gray-900 leading-relaxed">
        {q.questionText}
      </h2>

      {/* ✅ ADDED: Image in Attempt Mode */}
      {q.imgUrl && (
        <img 
          src={q.imgUrl} 
          alt="Question reference" 
          className="w-full max-h-80 object-contain mb-6 rounded-xl bg-gray-50 border border-gray-100"
        />
      )}

      <div className="space-y-3">
        {q.options.map((o, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            // ✅ ADDED: 'text-left' to align text
            className={`block w-full text-left p-4 rounded-xl border transition-all ${
              selected === i 
                ? "border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600" 
                : "border-gray-200 hover:bg-gray-50 text-gray-700"
            }`}
          >
            <span className="font-medium">{o.optionText}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          const newAnswers = { ...answers, [q._id]: selected };
          setAnswers(newAnswers);
          
          if (currentIdx === quiz.questions.length - 1) {
            submitQuiz(); // We can pass newAnswers if state update is slow, but usually OK here
          } else {
            setSelected(null);
            setCurrentIdx(i => i + 1);
          }
        }}
        disabled={selected === null}
        className="mt-8 w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {currentIdx === quiz.questions.length - 1 ? "Submit Quiz" : "Next Question"}
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuizAttempt;