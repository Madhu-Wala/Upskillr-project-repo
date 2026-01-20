import React, { useState } from 'react';
import { 
  Check, HelpCircle, Star, BookOpen, 
  Lightbulb, FileText, ExternalLink, 
  ChevronRight, Eye, PlayCircle, AlertTriangle, Rocket, Layers,
  BarChart // Added for Difficulty display
  , Download, // Added 'Download'
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import MarkdownPreview from '@uiw/react-markdown-preview';
import VideoPlayer from '../../Learner/VideoPlayer';

const Step5Publish = ({ onBack, courseData, lessons, allQuizzes, onPublish }) => {
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  const currentLesson = lessons[activeLessonIdx] || {};
  const currentQuiz = allQuizzes.find(q => q.lessonId === currentLesson._id);

  const isMissingContent = lessons.some(l => !l.contentMarkdown && !l.videoUrl);
  const totalQuestions = allQuizzes.reduce((acc, q) => acc + q.questions.length, 0);

  // ✅ 1. ADDED: Download Handler Logic
  const handleDownloadPDF = async (pdfUrl, pdfName) => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pdfName || 'resource.pdf');
      document.body.appendChild(link);
      
      link.click();
      
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(pdfUrl, '_blank');
    }
  };

 
  console.log("CourseData in Step5Publish:", courseData);
  console.log("Lessons in Step5Publish:", lessons);
  console.log("AllQuizzes in Step5Publish:", allQuizzes);
  return (
    <div className="max-w-6xl mx-auto pb-32 font-sans px-4 animate-in fade-in duration-500">
      
      {/* 1. COURSE HERO SECTION */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-12 mb-10 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-72 h-48 flex-none rounded-3xl overflow-hidden border-4 border-white/10 bg-slate-800 shadow-2xl">
            {courseData?.thumbnail ? (
              <img src={courseData.thumbnail} alt="Course Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-500/20 text-indigo-300">
                <Layers size={48} className="mb-2 opacity-40" />
                <span className="text-[10px] font-black uppercase tracking-widest">No Thumbnail</span>
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
               <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 px-4 py-1.5 rounded-full">
                  <Star size={14} className="text-indigo-400 fill-indigo-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-300">
                    {courseData?.category || "Uncategorized"}
                  </span>
               </div>
               <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-1.5 rounded-full">
                  <BarChart size={14} className="text-emerald-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-300">
                    {courseData?.difficulty || "Beginner"}
                  </span>
               </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
              {courseData?.title || "Untitled Course"}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-400 font-bold text-sm">
                <span className="flex items-center gap-2"><BookOpen size={18}/> {lessons.length} Lessons</span>
                <span className="flex items-center gap-2"><HelpCircle size={18}/> {allQuizzes.length} Quizzes</span>
                <span className="flex items-center gap-2"><Check size={18} className="text-emerald-400"/> Quality Checked</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      </div>

      {/* 2. LESSON SWITCHER */}
      <div className="mb-10 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm sticky top-4 z-40">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 px-1">
          {lessons.map((lesson, idx) => {
            const hasQuiz = allQuizzes.some(q => q.lessonId === lesson._id);
            const isActive = activeLessonIdx === idx;
            return (
              <button
                key={lesson._id || idx}
                onClick={() => setActiveLessonIdx(idx)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                  isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 translate-y-[-2px]' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] ${isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>
                    {idx + 1}
                </span>
                {lesson.title}
                {hasQuiz && <Check size={14} className={isActive ? "text-white" : "text-emerald-500"} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* 3. VIDEO & MARKDOWN */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-6">
              <PlayCircle size={24} className="text-indigo-500" /> Lesson Media
            </h3>
            {currentLesson?.video?.url ? (
              <div key={currentLesson._id || activeLessonIdx} className="w-full">
                <VideoPlayer 
                  videoURL={currentLesson.video.url} 
                  title={currentLesson.title} 
                />
              </div>
            ) : (
              <div className="aspect-video rounded-[2rem] bg-slate-50 border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-400">
                <PlayCircle size={48} className="mb-4 opacity-20" />
                <p className="font-bold">No video provided for this lesson</p>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
              <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">Lesson Content</h3>
              </div>
              <div className="p-8 bg-white" data-color-mode="light">
                <MarkdownPreview 
                  source={currentLesson.contentMarkdown} 
                  style={{ backgroundColor: 'white', color: '#1e293b' }}
                />
              </div>
            </div>
          </div>

          {/* 5. QUIZ PREVIEW */}
          {currentQuiz ? (
            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                      <HelpCircle size={28} />
                  </div>
                  <div>
                      <h4 className="text-2xl font-black text-slate-900">{currentQuiz.title}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assessment Details</p>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                  <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl">
                    <Star size={16} className="text-indigo-600 fill-indigo-600" />
                    <span className="text-sm font-black text-indigo-700">Total Marks: {currentQuiz.totalMarks || 0}</span>
                  </div>
               </div>

               <div className="space-y-16">
                  {currentQuiz.questions.map((q, qIdx) => (
                    <div key={qIdx} className="relative">
                       <div className="flex flex-col md:flex-row gap-8">
                          <div className="flex-none flex flex-col items-center gap-3">
                            <span className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center font-black border-2">{qIdx + 1}</span>
                            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                              {q.score || 0} pts
                            </span>
                          </div>
                          <div className="flex-1">
                             <p className="text-xl font-bold text-slate-800 mb-6 leading-tight">{q.questionText || q.qstnText}</p>
                             
                             {q.imgUrl && (
                               <img src={q.imgUrl} alt="Quiz" className="mb-6 rounded-3xl max-h-72 object-cover border-8 border-slate-50 shadow-md" />
                             )}

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                {q.options.map((opt, oIdx) => {
                                  const isCorrect = typeof opt === 'object' ? opt.isCorrect : q.correctIndex === oIdx;
                                  const text = typeof opt === 'object' ? opt.optionText : opt;
                                  return (
                                    <div key={oIdx} className={`p-4 rounded-2xl border-2 flex items-center gap-3 font-bold text-sm ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' : 'bg-white border-slate-100 text-slate-400 opacity-60'}`}>
                                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                           {String.fromCharCode(65 + oIdx)}
                                        </span>
                                        {text}
                                    </div>
                                  )
                                })}
                             </div>

                             {(q.explanation || q.explntn) && (
                               <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-[2rem] flex gap-4">
                                  <div className="flex-none w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                                    <Lightbulb size={20} />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Instructor Explanation</p>
                                    <p className="text-sm font-bold text-amber-900/70 leading-relaxed italic">
                                      "{q.explanation || q.explntn}"
                                    </p>
                                  </div>
                               </div>
                             )}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-[2.5rem] py-16 text-center border-2 border-dashed border-slate-200">
                <AlertTriangle className="text-slate-300 mx-auto mb-3" size={40} />
                <p className="text-slate-400 font-bold">No quiz assessment for this lesson.</p>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                <h3 className="font-black text-xl mb-6 flex items-center gap-3 text-indigo-400">
                   <Rocket size={20} /> Launch Stats
                </h3>
                <div className="space-y-5">
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-slate-500 uppercase tracking-tighter">Total Lessons</span>
                        <span className="text-white">{lessons.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-slate-500 uppercase tracking-tighter">Total Quizzes</span>
                        <span className="text-white">{allQuizzes.length}</span>
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="flex items-center gap-3 text-emerald-400 font-black text-xs uppercase tracking-[0.2em]">
                        <Check size={16}/> Ready to Publish
                    </div>
                </div>
            </div>

            {/* ✅ 2. UPDATED: Resource List with Download Buttons */}
            {currentLesson.resources?.length > 0 && (
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                  <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                      <FileText size={18} className="text-orange-500"/> Lesson PDFs
                  </h4>
                  <div className="space-y-2">
                    {currentLesson.resources.map((pdf, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleDownloadPDF(pdf.url, pdf.name)}
                        className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group cursor-pointer"
                      >
                        <span className="text-xs font-bold text-slate-600 truncate max-w-[140px]" title={pdf.name}>
                          {pdf.name}
                        </span>
                        <Download size={14} className="text-slate-300 group-hover:text-indigo-500"/>
                      </button>
                    ))}
                  </div>
              </div>
            )}
        </div>
      </div>

      {/* FINAL FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 p-6 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
              <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-black hover:text-slate-900 transition-colors">
                  <ChevronRight size={20} className="rotate-180" /> Back to Quizzes
              </button>
              <button onClick={onPublish} className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 flex items-center gap-3 transform hover:scale-105 active:scale-95 transition-all">
                  Go Live Now <Rocket size={20} />
              </button>
          </div>
      </div>
    </div>
  );
};

export default Step5Publish;