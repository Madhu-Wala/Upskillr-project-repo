import { useState,useEffect } from "react";
import { useRef } from "react";
import API from "../../../api/axios";
import { Trash2 } from "lucide-react";

const Step4QuizCreation=({ courseId,lessons,allQuizzes  ,onQuizAdded,onQuizDeleted,onNext, onBack })=>{

    const [step, setStep] = useState(1);
   // const [lessons, setLessons] = useState([]);
    const [selectedLessonId, setSelectedLessonId] = useState("");
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
        title:"",numQuestions:1
    });
    const [questions,setQuestions]=useState([])
    const fileRefs = useRef([]); //  to reset file input when needed
    const [isOverwriting, setIsOverwriting] = useState(false);
    useEffect(() => {
    // If we have lessons but no selection yet, pick the first one
    if (lessons.length > 0 && !selectedLessonId) {
        setSelectedLessonId(lessons[0]._id);
    }
}, [lessons, selectedLessonId]);
// DRAFT RECOVERY: Save questions to localStorage as user types
    useEffect(() => {
        if (questions.length > 0) {
            localStorage.setItem(`quiz_draft_${selectedLessonId}`, JSON.stringify({
                details,
                questions
            }));
        }
    }, [questions, details, selectedLessonId]);
    

    const handleDetailsChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateCards = () => {
        const initQuestions = Array.from({ length: details.numQuestions }, () => ({
        qstnText: "",
        imgUrl: "",
        options: ["", "", "", ""],
        correctIndex: null,
        explanation: "", // New Field
        score: 1       // New Field
        }));
        setQuestions(initQuestions);
        setStep(2);
    };

    const handleLoadExisting = () => {
    const existing = allQuizzes.find(q => q.lessonId === selectedLessonId);
    if (!existing) return;

    setDetails({
        title: existing.title,
        numQuestions: existing.questions.length
    });

    const mapped = existing.questions.map(q => ({
        qstnText: q.questionText || q.qstnText,
        imgUrl: q.imgUrl || "",
        explanation: q.explanation || "",
        score: q.score || 1,
        options: q.options.map(o => o.optionText),
        correctIndex: q.options.findIndex(o => o.isCorrect)
    }));

    setQuestions(mapped);
    setStep(2); // Jump to the editor
};

    const handleQuestionChange = (index, field, value) => {
        const updated = [...questions];
        updated[index][field] = value;
        setQuestions(updated);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const updated = [...questions];
        updated[qIndex].options[oIndex] = value;
        setQuestions(updated);
    };

    const handleCorrectOption = (qIndex, oIndex) => {
        const updated = [...questions];
        updated[qIndex].correctIndex = oIndex;
        setQuestions(updated);
    };

    const handleRemoveQuestion = (index) => {
        if (questions.length === 1) return alert("At least one question is required.");
        if (!window.confirm("Remove this question?")) return;

        const updated = questions.filter((_, i) => i !== index);
        setQuestions(updated);
        // Sync the count in details
        setDetails(prev => ({ ...prev, numQuestions: updated.length }));
    };

    //  Upload image to Cloudinary logic from madhura's project
    const handleImageUpload = async (qIndex, file) => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    
    // Using "file" here ensures it goes to 'quiz_assets' based on the logic above
    formData.append("file", file); 

    try {
        const res = await API.post("/api/instructor/upload-misc", formData); 
        const updated = [...questions];
        updated[qIndex].imgUrl = res.data.url;
        setQuestions(updated);
    } catch (err) {
        alert("Image upload failed");
    } finally {
        setLoading(false);
    }
};

    //  Remove image and reset file input
    const handleRemoveImage = (qIndex) => {
        const updated = [...questions];
        updated[qIndex].imgUrl = "";
        setQuestions(updated);

        // reset file input value manually
        if (fileRefs.current[qIndex]) {
        fileRefs.current[qIndex].value = "";
        }
    };

    // --- BACKEND GENERATION ---
    const handleGenerate = async () => {
        const isValid = questions.every(q => q.correctIndex !== null && q.qstnText !== "");
        if (!isValid) return alert("Please fill all questions and select a correct answer.");

        setLoading(true);
        try {
            const totalMarks = questions.reduce((acc, q) => acc + Number(q.score), 0);

            // 1. Create Quiz Shell
            const quizRes = await API.post(`/api/instructor/lessons/${selectedLessonId}/quiz`, {
                title: details.title,
                courseId: courseId,
                totalMarks: totalMarks
            });
           // Handle different possible response structures
         const quizId = quizRes.data.data?._id || quizRes.data._id;
            // 2. Add questions in sequence
            for (const q of questions) {
                await API.post(`/api/instructor/quizzes/${quizId}/questions`, {
                    questionText: q.qstnText,
                    imgUrl: q.imgUrl,
                    options: q.options.map((optText, i) => ({
                        optionText: optText,
                        isCorrect: q.correctIndex === i,
                    })),
                    explanation: q.explanation,
                    score: Number(q.score)
                });
            }
            // 3. Prepare the data for Step 5 Preview
        const finalQuizData = {
            lessonId: selectedLessonId,
            title: details.title,
            totalMarks: totalMarks,
            questions: questions.map(q => ({
                ...q,
                // Ensure options are mapped for the preview logic in Step 5
                options: q.options.map((optText, i) => ({
                    optionText: optText,
                    isCorrect: q.correctIndex === i
                }))
            }))
        };
        

        // 4. Update Parent State (Preserve multiple quizzes)
        onQuizAdded(finalQuizData);
        localStorage.removeItem(`quiz_draft_${selectedLessonId}`);
        alert("Quiz saved for the lesson!");
        setStep(1); // Reset to allow adding quizzes to other lessons
        setDetails({ title: "", numQuestions: 1 });
        setIsOverwriting(false);
        setQuestions([]);
        
            
          
        } catch (err) {
            alert("Failed to create quiz");
        } finally {
            setLoading(false);
        }
    };

    // handleGenerate ke paas ye naya function add karo
const handleDeleteQuiz = async () => {
    if (!window.confirm("Are you sure? This will permanently delete the quiz for this lesson.")) return;

    setLoading(true);
    try {
        await API.delete(`/api/instructor/lessons/${selectedLessonId}/quiz`);
        
        // Parent state se bhi hatao (onQuizDeleted ek naya prop dena hoga ya onQuizAdded use karo)
        // Sabse simple: onQuizAdded([]) bhej do ya parent mein delete logic likho
        if (onQuizDeleted) {
            onQuizDeleted(selectedLessonId); 
        }

        alert("Quiz removed!"); 
        setIsOverwriting(false);
        setQuestions([]);
        setDetails({ title: "", numQuestions: 1 });
    } catch (err) {
        alert("Failed to delete quiz");
        console.log(err);
    } finally {
        setLoading(false);
    }
};

    return <div className="max-w-4xl mx-auto space-y-6">    

        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
                <h2 className="text-xl font-bold text-indigo-700">Quiz Creation</h2>
                <p className="text-sm text-gray-500">You have added quizzes for {allQuizzes.length} lessons.</p>
            </div>
            {step === 2 && (
                <button onClick={() => setStep(1)} className="text-sm font-bold text-gray-500 hover:text-indigo-600">
                    Change Lesson
                </button>
            )}
        </div>

      {step === 1 && (
        <div className="space-y-4 bg-white shadow-md rounded-xl p-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Target Lesson</label>
            <select 
              value={selectedLessonId} 
              onChange={(e) =>{
                setSelectedLessonId(e.target.value);
                setIsOverwriting(false);
              } }
              className="border px-4 py-2 w-full rounded-lg">
              {lessons.map(l => (
                  <option key={l._id} value={l._id}>
                      {l.title} {allQuizzes.some(q => q.lessonId === l._id) ? "✅" : ""}
                  </option>
              ))}            
            </select>
          </div>
        

          {/* If quiz exists, show Load button, otherwise show Creation form */}
          {allQuizzes.some(q => q.lessonId === selectedLessonId) && !isOverwriting ? (
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 text-center">
              <p className="text-amber-800 font-medium mb-4">An assessment already exists for this lesson.</p>
              <button 
                onClick={handleLoadExisting}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-lg w-full transition-all shadow-md"
              >
                Edit Existing Questions
              </button>

                <button 
            onClick={handleDeleteQuiz}
            className="mt-3 w-full text-amber-800 text-sm font-bold border border-amber-200 py-2 rounded-lg hover:bg-amber-200 transition-colors"
        >
            🗑️ Delete This Quiz
        </button>

              <div className="mt-4 flex items-center gap-2">
                  <div className="h-[1px] bg-amber-200 flex-1"></div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">Or start fresh</span>
                  <div className="h-[1px] bg-amber-200 flex-1"></div>
              </div>
              <button 
                  onClick={() => { setQuestions([]);  
                    setIsOverwriting(true);
                    setDetails({ title: "", numQuestions: 1});
                    setStep(1); /* Allow re-entry */
                  }} 
                  className="mt-2 text-amber-600 text-xs font-bold hover:underline"
              >
                  Overwrite with New Quiz
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">Quiz Title</label>
                <input
                  name="title"
                  value={details.title}
                  onChange={handleDetailsChange}
                  placeholder="Eg: Module 1 Quiz"
                  className="border px-4 py-2 w-full rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Number of Questions</label>
                <input
                  type="number"
                  name="numQuestions"
                  value={details.numQuestions}
                  onChange={handleDetailsChange}
                  min="1"
                  className="border px-4 py-2 w-full rounded-lg"
                  required
                />
              </div>
              <button
                onClick={handleCreateCards}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg w-full"
              >
                Next: Add Questions
              </button>
            </>
          )}
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-xl font-bold text-indigo-800 mb-4">
            📝 Fill in the {questions.length} questions
          </h3>

          <div className="space-y-8">
            {questions.map((q, idx) => (
              <div key={idx} className="bg-white shadow-lg rounded-xl p-4">
                <div className="flex justify-between mb-4">
                  <h4 className="font-bold text-lg text-indigo-900">Question {idx + 1}</h4>
                  <div className="flex items-center gap-4">
                      {/* Points Input */}
                      <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-400 uppercase">Points:</span>
                          <input type="number" value={q.score} onChange={(e) => handleQuestionChange(idx, "score", e.target.value)} className="w-12 border rounded px-1 py-1 text-center font-bold text-indigo-600" />
                      </div>
                      {/* Delete Trash Icon Button */}
                      <button 
                          onClick={() => handleRemoveQuestion(idx)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                          title="Delete Question"
                      >
                          <Trash2 size={18} /> {/* Use Lucide Trash2 or a string "X" */}
                      </button>
                  </div>
              </div>
                <textarea
                  value={q.qstnText}
                  onChange={(e) =>
                    handleQuestionChange(idx, "qstnText", e.target.value)
                  }
                  placeholder="Enter question text"
                  className="w-full border px-4 py-2 mb-2 rounded-lg"
                  rows={2}
                  required
                />

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                {/* Upload Image */}
                <input
                    type="file"
                    accept="image/*"
                    ref={(el) => (fileRefs.current[idx] = el)}
                    onChange={(e) => handleImageUpload(idx, e.target.files[0])}
                    className="border px-3 py-2 rounded-lg w-full sm:w-auto"
                    disabled={!!q.imgUrl}
                />

                {/* Remove Button */}
                {q.imgUrl && (
                    <button
                    onClick={() => handleRemoveImage(idx)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg w-full sm:w-auto"
                    >
                    Remove Image
                    </button>
                )}
                </div>

                {/* Image Preview */}
                {q.imgUrl && (
                <img
                    src={q.imgUrl}
                    alt="Uploaded Preview"
                    className="w-full sm:w-48 h-32 object-cover rounded-lg mb-3 border"
                />
                )}


                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name={`correct-${idx}`}
                      checked={q.correctIndex === oIdx}
                      onChange={() => handleCorrectOption(idx, oIdx)}
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(idx, oIdx, e.target.value)
                      }
                      placeholder={`Option ${oIdx + 1}`}
                      className="border px-3 py-1 w-full rounded-lg"
                      required
                    />
                  </div>
                ))}

                {/* Explanation Field */}
                  <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Explanation (Why is this correct?)</label>
                      <textarea value={q.explanation} onChange={(e) => handleQuestionChange(idx, "explanation", e.target.value)} placeholder="Provide context for the correct answer..." className="w-full border px-3 py-2 text-sm rounded-md outline-none focus:ring-1 focus:ring-indigo-400" rows={2} />
                  </div>
              </div>
              
            ))}
          </div>
            {/* Add this right after the questions loop finishes but BEFORE the Save button */}
          <button 
              onClick={() => {
                  setQuestions([...questions, { qstnText: "", imgUrl: "", options: ["", "", "", ""], correctIndex: null, explanation: "", score: 1 }]);
              }}
              className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 mb-4"
          >
              + Add Another Question
          </button>
          <button 
              onClick={handleGenerate} 
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 mt-6 rounded-xl w-full flex justify-center items-center gap-2"
          >
              {loading ? "Processing..." : "✅ Save Quiz for this Lesson"}
          </button>
        </div>
      )}

        {/*Back and continue button */}
        <div className="flex justify-between items-center pt-8">
            <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
            <button onClick={(e)=>{
                e.preventDefault();
                onNext(allQuizzes);
            }} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200">Finish and Review →</button>
        </div>
    </div>
}
export default Step4QuizCreation;