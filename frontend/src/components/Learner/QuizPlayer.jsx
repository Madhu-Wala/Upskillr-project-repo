import React, { useState } from 'react';
import { 
  ChevronRight, ChevronLeft, RotateCcw, 
  CheckCircle2, AlertCircle, Trophy, HelpCircle, XCircle 
} from 'lucide-react';

const QuizPlayer = ({ quiz, questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionId: optionIndex }
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[currentIdx];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIdx === totalQuestions - 1;

  // Logic: Select an option
  const handleSelect = (optionIdx) => {
    if (isSubmitted) return; // Prevent changing after submission
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion._id]: optionIdx });
  };

  // Logic: Clear selection for current question
  const clearSelection = () => {
    const newAnswers = { ...selectedAnswers };
    delete newAnswers[currentQuestion._id];
    setSelectedAnswers(newAnswers);
  };

  // Logic: Calculate Results
  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      const userChoice = selectedAnswers[q._id];
      if (userChoice !== undefined && q.options[userChoice].isCorrect) {
        correctCount++;
      }
    });
    return correctCount;
  };

  if (isSubmitted) {
    const score = calculateScore();
    return (
      <QuizResult 
        score={score} 
        total={totalQuestions} 
        questions={questions} 
        userAnswers={selectedAnswers}
        onBack={() => onComplete()} 
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* Header & Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-indigo-600 font-black text-xs uppercase tracking-widest">Assessment</span>
            <h2 className="text-2xl font-black text-gray-900">Knowledge Check</h2>
          </div>
          <span className="text-sm font-bold text-gray-400">
            Question {currentIdx + 1} of {totalQuestions}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500" 
            style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm mb-8">
        {/* Optional Diagram Presence */}
        {currentQuestion.diagramURL && (
          <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100">
            <img src={currentQuestion.diagramURL} alt="Question Diagram" className="w-full h-auto" />
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed">
          {currentQuestion.questionText}
        </h3>

        {/* Options Grid */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQuestion._id] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${
                  isSelected 
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 shadow-md shadow-indigo-100/50' 
                  : 'border-gray-50 bg-gray-50 hover:border-gray-200 text-gray-700'
                }`}
              >
                <span className="font-bold text-sm">{option.optionText}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                }`}>
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Clear Selection */}
        {selectedAnswers[currentQuestion._id] !== undefined && (
          <button 
            onClick={clearSelection}
            className="mt-6 flex items-center gap-2 text-gray-400 hover:text-rose-500 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Selection
          </button>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          disabled={currentIdx === 0}
          onClick={() => setCurrentIdx(currentIdx - 1)}
          className="flex items-center gap-2 px-6 py-3 font-bold text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-all"
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>

        {isLastQuestion ? (
          <button
            onClick={() => setIsSubmitted(true)}
            disabled={Object.keys(selectedAnswers).length < totalQuestions}
            className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:bg-gray-200 disabled:shadow-none transition-all"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentIdx(currentIdx + 1)}
            className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-800 rounded-2xl font-black shadow-sm hover:bg-gray-50 transition-all"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: RESULTS VIEW ---
const QuizResult = ({ score, total, onBack }) => {
  const percentage = Math.round((score / total) * 100);
  const isPassed = percentage >= 70;

  return (
    <div className="max-w-2xl mx-auto py-20 px-6 text-center">
      <div className={`w-24 h-24 rounded-3xl mx-auto flex items-center justify-center mb-8 ${isPassed ? 'bg-emerald-100' : 'bg-rose-100'}`}>
        {isPassed ? <Trophy className="w-12 h-12 text-emerald-600" /> : <XCircle className="w-12 h-12 text-rose-600" />}
      </div>
      
      <h2 className="text-4xl font-black text-gray-900 mb-2">
        {isPassed ? 'Congratulations!' : 'Keep Practicing!'}
      </h2>
      <p className="text-gray-400 font-medium mb-10">
        You scored {score} out of {total} questions correctly.
      </p>

      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm mb-10">
        <div className="text-6xl font-black text-gray-900 mb-2">{percentage}%</div>
        <div className="text-xs font-black uppercase tracking-widest text-gray-400">Final Score</div>
      </div>

      <button
        onClick={onBack}
        className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
      >
        Return to Lesson
      </button>
    </div>
  );
};

export default QuizPlayer;