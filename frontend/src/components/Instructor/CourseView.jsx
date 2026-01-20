import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Check, HelpCircle, Star, BookOpen, Lightbulb, FileText, 
  ExternalLink, ChevronRight, PlayCircle, AlertTriangle, 
  Rocket, Layers, BarChart, Loader2, ChevronLeft, Download
} from 'lucide-react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import VideoPlayer from '../Learner/VideoPlayer';
import API from '../../api/axios';

const CourseView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  
  // State to track which PDF is currently downloading
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetchFullDetails = async () => {
      try {
        setLoading(true);
        const [courseRes, lessonsRes, quizzesRes] = await Promise.all([
          API.get(`/api/instructor/courses/${courseId}`),
          API.get(`/api/instructor/courses/${courseId}/lessons`),
          API.get(`/api/instructor/courses/${courseId}/quizzes`)
        ]);

        setCourseData(courseRes.data.data || courseRes.data);
        setLessons(lessonsRes.data.data || lessonsRes.data || []);
        setAllQuizzes(quizzesRes.data.data || quizzesRes.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFullDetails();
  }, [courseId]);

  // ✅ CORRECTED DOWNLOAD LOGIC
  const handleDownloadPDF = async (lessonId, resource) => {
    try {
      setDownloadingId(resource._id); // Start spinner

      // Note: Removed '/instructor' from the path to match your backend route
      const response = await API.get(
        `/api/lessons/${lessonId}/resources/${resource._id}/download`, 
        {
          responseType: 'blob', // Important: Expect binary data
        }
      );

      // Create a blob link to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${resource.name}.pdf`); 
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setDownloadingId(null); // Stop spinner
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
      <p className="text-slate-500 font-bold">Fetching Live Data...</p>
    </div>
  );

  const currentLesson = lessons[activeLessonIdx] || {};
  const currentQuiz = allQuizzes.find(q => q.lessonId === currentLesson._id);

  return (
    <div className="max-w-7xl mx-auto pb-32 pt-10 px-4 font-sans animate-in fade-in duration-500">
      
      <button 
        onClick={() => navigate('/Instructor/my-courses')}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black transition-colors"
      >
        <ChevronLeft size={20} /> Back to My Courses
      </button>

      {/* 1. COURSE HERO */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-12 mb-10 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-72 h-48 flex-none rounded-3xl overflow-hidden border-4 border-white/10 bg-slate-800 shadow-2xl">
            {courseData?.thumbnail?.url ?(
              <img src={courseData.thumbnail.url} alt="Preview" className="w-full h-full object-cover" />
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
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-300">{courseData?.category || "Uncategorized"}</span>
               </div>
               <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-1.5 rounded-full">
                  <BarChart size={14} className="text-emerald-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-300">{courseData?.difficulty || "Beginner"}</span>
               </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">{courseData?.title || "Untitled Course"}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-400 font-bold text-sm">
                <span className="flex items-center gap-2"><BookOpen size={18}/> {lessons.length} Lessons</span>
                <span className="flex items-center gap-2"><HelpCircle size={18}/> {allQuizzes.length} Quizzes</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LESSON SWITCHER */}
      <div className="mb-10 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm sticky top-4 z-40">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 px-1">
          {lessons.map((lesson, idx) => (
            <button
              key={lesson._id || idx}
              onClick={() => setActiveLessonIdx(idx)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                activeLessonIdx === idx ? 'bg-indigo-600 text-white shadow-xl translate-y-[-2px]' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] ${activeLessonIdx === idx ? 'bg-white/20' : 'bg-slate-100'}`}>{idx + 1}</span>
              {lesson.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* MEDIA SECTION */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
             <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-6">
                <PlayCircle size={24} className="text-indigo-500" /> Lesson Media
             </h3>
             {currentLesson?.video?.url ? (
               <VideoPlayer videoURL={currentLesson.video.url} title={currentLesson.title} />
             ) : (
               <div className="aspect-video rounded-[2rem] bg-slate-50 border-4 border-dashed border-slate-100 flex items-center justify-center text-slate-400 font-bold">No video provided</div>
             )}

             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
                <div className="p-4 border-b bg-slate-50"><h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">Lesson Content</h3></div>
                <div className="p-8 bg-white" data-color-mode="light">
                  <MarkdownPreview source={currentLesson.contentMarkdown} style={{ backgroundColor: 'white', color: '#1e293b' }} />
                </div>
             </div>
          </div>

          {/* QUIZ SECTION */}
          {currentQuiz ? (
            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <h4 className="text-2xl font-black text-slate-900">{currentQuiz.title}</h4>
                
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
                        <p className="text-xl font-bold text-slate-800 mb-6">{q.questionText || q.qstnText}</p>
                        {q.imgUrl && (
                             <img src={q.imgUrl} alt="Quiz" className="mb-6 rounded-3xl max-h-72 object-cover border-8 border-slate-50 shadow-md" />
                           )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {q.options.map((opt, oIdx) => {
                            const isCorrect = typeof opt === 'object' ? opt.isCorrect : q.correctIndex === oIdx;
                            const text = typeof opt === 'object' ? opt.optionText : opt;
                            return (
                              <div key={oIdx} className={`p-4 rounded-2xl border-2 flex items-center gap-3 font-bold text-sm ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' : 'bg-white border-slate-100 text-slate-400 opacity-60'}`}>
                                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                {text}
                              </div>
                            );
                          })}
                        </div>
                        {(q.explanation || q.explntn) && (
                          <div className="bg-amber-50/50 p-6 rounded-[2rem] border border-amber-100 flex gap-4">
                            <Lightbulb className="text-amber-600" />
                            <p className="text-sm font-bold text-amber-900/70 italic">"{q.explanation || q.explntn}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-[2.5rem] py-16 text-center border-2 border-dashed border-slate-200 text-slate-400 font-bold">No quiz assessment.</div>
          )}
        </div>

        {/* SIDEBAR STATS & PDF RESOURCES */}
        <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                <h3 className="font-black text-xl mb-6 text-indigo-400 flex items-center gap-3"><Rocket size={20} /> Launch Stats</h3>
                <div className="space-y-5 text-sm font-bold">
                    <div className="flex justify-between"><span>Lessons</span><span>{lessons.length}</span></div>
                    <div className="flex justify-between"><span>Quizzes</span><span>{allQuizzes.length}</span></div>
                    <div className="h-px bg-white/10" />
                    <div className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-2"><Check size={16}/> Live Preview</div>
                </div>
            </div>

            {/* --- PDF RESOURCES BLOCK --- */}
            {currentLesson.resources?.length > 0 && (
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                  <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                      <FileText size={18} className="text-orange-500"/> Lesson PDFs
                  </h4>
                  <div className="space-y-2">
                    {currentLesson.resources.map((pdf, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleDownloadPDF(currentLesson._id, pdf)}
                        disabled={downloadingId === pdf._id} // Disable if downloading
                        className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group disabled:opacity-50 disabled:cursor-not-allowed text-left"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                           {/* Show spinner if this specific ID is downloading, else show File icon */}
                           {downloadingId === pdf._id ? (
                             <Loader2 size={16} className="text-indigo-600 animate-spin flex-shrink-0" />
                           ) : (
                             <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors flex-shrink-0"></div>
                           )}
                           <span className="text-xs font-bold text-slate-600 truncate">{pdf.name}</span>
                        </div>
                        <Download size={14} className="text-slate-300 group-hover:text-indigo-500"/>
                      </button>
                    ))}
                  </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CourseView;