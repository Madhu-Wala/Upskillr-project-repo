import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, AlertCircle, Clock, ChevronRight, RotateCcw, Award, HelpCircle } from "lucide-react";

const QuizAttempt = () => {
  const navigate = useNavigate();
  const { quizId } = useParams(); 

  // 👇 UPDATED MOCK DATA (Matches your Mongoose Schema)
  const [quizData, setQuizData] = useState({
    _id: "quiz_123",
    title: "React JS Fundamentals",
    totalMarks: 10, // Matches your schema
    duration: 15, // (Optional UI-only field, not in your schema but good for user exp)
    questions: [
      {
        _id: "q1",
        questionText: "What is the primary purpose of the useEffect hook?",
        score: 5,
        options: [
          { optionText: "To handle state management", isCorrect: false },
          { optionText: "To perform side effects", isCorrect: true }, // ✅ Correct marked here
          { optionText: "To create custom hooks", isCorrect: false },
          { optionText: "To render DOM elements", isCorrect: false }
        ]
      },
      {
        _id: "q2",
        questionText: "Which syntax passes data to child components?",
        score: 5,
        options: [
          { optionText: "State", isCorrect: false },
          { optionText: "Props", isCorrect: true }, // ✅ Correct marked here
          { optionText: "Context", isCorrect: false },
          { optionText: "Redux", isCorrect: false }
        ]
      }
    ]
  });

  // 👇 STATE MANAGEMENT
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Stores Index of selected option
  const [answers, setAnswers] = useState({}); // Stores { questionIndex: selectedOptionIndex }
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // 👇 LOGIC: Select an Option
  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  // 👇 LOGIC: Move to Next Question
  const handleNext = () => {
    // 1. Save the answer
    const newAnswers = { ...answers, [currentQuestion]: selectedOption };
    setAnswers(newAnswers);
    
    // 2. Reset selection
    setSelectedOption(null);

    // 3. Navigate or Finish
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  // 👇 UPDATED LOGIC: Calculate Results based on 'isCorrect'
  const finishQuiz = (finalAnswers) => {
    let earnedScore = 0;
    
    quizData.questions.forEach((q, index) => {
      // Get the index the user selected for this question
      const userSelectedIndex = finalAnswers[index];
      
      // Check if that option has isCorrect: true
      if (userSelectedIndex !== undefined && q.options[userSelectedIndex].isCorrect === true) {
        earnedScore += q.score || 1; // Add question score (default to 1 if score is 0)
      }
    });

    setScore(earnedScore);
    setIsFinished(true);
    
    // TODO: Send 'earnedScore' to backend
  };

  // ---------------- RENDER: RESULT SCREEN ----------------
  if (isFinished) {
    const passed = score >= (quizData.totalMarks * 0.6); // Example: 60% to pass

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className={`${passed ? "bg-green-600" : "bg-red-500"} p-10 text-center text-white`}>
            {passed ? <Award size={64} className="mx-auto mb-4" /> : <AlertCircle size={64} className="mx-auto mb-4" />}
            <h2 className="text-3xl font-bold mb-2">{passed ? "Quiz Passed!" : "Needs Improvement"}</h2>
            <p className="opacity-90 font-medium">You scored {score} / {quizData.totalMarks}</p>
          </div>

          <div className="p-8">
            <div className="flex justify-between gap-4 mb-8">
              <div className="text-center w-1/2 p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Score</p>
                <p className="text-2xl font-bold text-gray-900">{score}</p>
              </div>
              <div className="text-center w-1/2 p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Result</p>
                <p className={`text-2xl font-bold ${passed ? "text-green-600" : "text-red-500"}`}>
                  {passed ? "Pass" : "Fail"}
                </p>
              </div>
            </div>

            <button 
              onClick={() => navigate("/learner")} 
              className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 mb-3"
            >
              Back to Dashboard
            </button>
            
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3.5 flex items-center justify-center gap-2 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors"
            >
              <RotateCcw size={18} /> Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- RENDER: QUESTION SCREEN ----------------
  const currentQData = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-3xl w-full">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-indigo-950">{quizData.title}</h1>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mt-1">
              <HelpCircle size={16} />
              <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
            </div>
          </div>
          
          {/* Marks Badge */}
          <div className="hidden sm:flex flex-col items-end">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Marks</span>
             <span className="text-indigo-600 font-bold">{currentQData.score} pts</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2.5 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 relative">
          
          {/* Optional Image from Schema */}
          {currentQData.imgUrl && (
             <img src={currentQData.imgUrl} alt="Question Reference" className="w-full h-48 object-cover rounded-xl mb-6" />
          )}

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
            {currentQData.questionText}
          </h2>

          <div className="space-y-4">
            {/* 👇 UPDATED: Mapping over options object */}
            {currentQData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center justify-between group relative overflow-hidden
                  ${selectedOption === index 
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md scale-[1.01]" 
                    : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50 text-gray-600"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border shrink-0
                    ${selectedOption === index ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-400 border-gray-200"}
                  `}>
                    {["A", "B", "C", "D"][index]}
                  </div>
                  {/* 👇 UPDATED: Accessing .optionText */}
                  <span className="font-medium text-lg">{option.optionText}</span>
                </div>
                
                {selectedOption === index && (
                  <CheckCircle className="text-indigo-600 animate-in zoom-in" size={24} />
                )}
              </button>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`
                px-8 py-4 rounded-xl font-bold text-white flex items-center gap-2 transition-all shadow-lg
                ${selectedOption === null 
                  ? "bg-gray-300 cursor-not-allowed opacity-70" 
                  : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 shadow-indigo-200"
                }
              `}
            >
              {currentQuestion === quizData.questions.length - 1 ? "Submit Quiz" : "Next Question"}
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;