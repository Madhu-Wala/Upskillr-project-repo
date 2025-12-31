import { Check, Clock, File, Save, Send,HelpCircle,ImageIcon } from 'lucide-react';

const Step5Publish = ({ onBack }) => {

  // Dummy Quiz Object matching your DB structure
  const quizPreviewData = {
    title: "Final Assessment: Web Patterns",
    questions: [
      {
        _id: "q1",
        questionText: "Which architectural pattern is shown in the logic flow below?",
        diagramURL: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=80",
        options: [
          { optionText: "MVC Architecture", isCorrect: false },
          { optionText: "Observer Pattern", isCorrect: true },
          { optionText: "Singleton", isCorrect: false },
          { optionText: "Factory Method", isCorrect: false }
        ]
      },
      {
        _id: "q2",
        questionText: "What is the primary purpose of the 'useMemo' hook in React?",
        options: [
          { optionText: "To create a global state", isCorrect: false },
          { optionText: "To manage side effects", isCorrect: false },
          { optionText: "To memoize expensive calculations", isCorrect: true },
          { optionText: "To reference DOM elements", isCorrect: false }
        ]
      }
    ]
  };

  return (
    <div>
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      
      {/* LEFT: PREVIEW */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Course Preview</h2>
              <p className="text-gray-500 text-sm">How your course will appear to students</p>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">Draft</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden mb-6 group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" alt="Course" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
               <h3 className="text-white text-2xl font-bold mb-2">Complete Web Development Bootcamp</h3>
               <div className="flex items-center gap-4 text-white/90 text-sm">
                  <span className="flex items-center gap-1"><Clock size={14}/> 12h 30m</span>
                  <span>⭐ Beginner</span>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">What you'll learn</h4>
            <ul className="grid grid-cols-1 gap-2">
               {["Build responsive websites", "Master React.js", "Deploy to production"].map((item,i)=>(
                 <li key={i} className="flex items-center gap-2 text-gray-600 text-sm"><Check size={16} className="text-green-500"/> {item}</li>
               ))}
            </ul>
          </div>
        </div>

        {/* QUIZ PREVIEW PART */}
        {/* <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                <HelpCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">{quizPreviewData.title}</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{quizPreviewData.questions.length} Questions Total</p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {quizPreviewData.questions.map((q, qIndex) => (
              <div key={q._id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-slate-50 before:rounded-full">
                <div className="mb-4">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1 block">Question {qIndex + 1}</span>
                  <p className="text-gray-800 font-bold leading-relaxed">{q.questionText}</p>
                </div>

                {q.diagramURL && (
                  <div className="mb-4 inline-block relative rounded-xl overflow-hidden border border-gray-100 group">
                    <img src={q.diagramURL} alt="Diagram" className="max-h-48 w-auto object-cover" />
                    <div className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-md text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImageIcon size={14} />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((option, oIndex) => (
                    <div 
                      key={oIndex} 
                      className={`p-4 rounded-xl text-sm font-medium border transition-all flex justify-between items-center ${
                        option.isCorrect 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                        : 'bg-gray-50 border-gray-100 text-gray-500 opacity-70'
                      }`}
                    >
                      <span>{option.optionText}</span>
                      {option.isCorrect && <Check size={14} className="stroke-[4px]" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}


      </div>

      {/* RIGHT: SETTINGS */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
           <h3 className="font-bold text-gray-900 mb-4">Course Settings</h3>
           
           <div className="mb-4">
             <label className="text-sm font-bold text-gray-700 block mb-2">Pricing</label>
             <div className="flex items-center gap-4">
               <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="price" className="text-indigo-600" defaultChecked /> Free</label>
               <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="price" className="text-indigo-600" /> Paid</label>
             </div>
           </div>

           <div className="mb-4">
             <label className="text-sm font-bold text-gray-700 block mb-2">Language</label>
             <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"><option>English</option></select>
           </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
           <div className="bg-indigo-50 p-4 rounded-xl mb-4 border border-indigo-100">
              <p className="text-xs text-indigo-800 font-medium">ℹ️ Course Review: Usually takes 24-48 hours.</p>
           </div>
           <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold mb-3 hover:bg-indigo-700 flex items-center justify-center gap-2">
              <Send size={18} /> Submit for Review
           </button>
           <button className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center justify-center gap-2">
              <Save size={18} /> Save as Draft
           </button>
        </div>
      </div>
    </div>
    <div className='max-w-6xl mx-auto pb-20 font-sans px-4'>
    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm mb-10">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
                <HelpCircle size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">{quizPreviewData.title}</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.15em]">{quizPreviewData.questions.length} Questions Assessment</p>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {quizPreviewData.questions.map((q, qIndex) => (
              <div key={q._id} className="group">
                <div className="flex gap-6">
                  <div className="flex-none w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-lg font-black text-slate-300 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-400">
                    {qIndex + 1}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">{q.questionText}</p>
                    
                    {q.diagramURL && (
                      <div className="mb-8 rounded-3xl overflow-hidden border-4 border-slate-50 inline-block shadow-sm">
                        <img src={q.diagramURL} alt="Diagram" className="max-h-64 w-auto" />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((option, oIndex) => (
                        <div 
                          key={oIndex} 
                          className={`group relative p-5 rounded-2xl text-sm font-bold border-2 transition-all flex items-center justify-between ${
                            option.isCorrect 
                            ? 'bg-emerald-50/50 border-emerald-200 text-emerald-700 shadow-sm' 
                            : 'bg-white border-gray-50 text-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] ${option.isCorrect ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                              {String.fromCharCode(65 + oIndex)}
                            </span>
                            {option.optionText}
                          </div>
                          {option.isCorrect && <div className="bg-emerald-500 p-1 rounded-full text-white"><Check size={12} strokeWidth={4} /></div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

        <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
      </div>

    </div>
  );
};
export default Step5Publish;