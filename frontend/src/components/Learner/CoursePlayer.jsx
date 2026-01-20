import React, { useEffect, useState } from 'react';
import { ChevronLeft, Menu, X } from 'lucide-react'; // Added Menu, X
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import API from "../../api/axios";

import LessonSidebar from './LessonSidebar';
import VideoPlayer from './VideoPlayer';
import ResourcePanel from './ResourcePanel';
import CourseFeedback from './CourseFeedback';
import QuizAttempt from './QuizAttempt'; 

const CoursePlayer = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [showFeedback, setShowFeedback] = useState(false);
  const [courseInfo, setCourseInfo] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Responsive State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Quiz State
  const [showQuiz, setShowQuiz] = useState(false);
  const [hasQuiz, setHasQuiz] = useState(false);
  const [quizStatus, setQuizStatus] = useState({
    attempted: false,
    passed: false,
    quizId: null
  });

  // Quiz Button Handlers
  const handleAttemptQuiz = () => {
    setShowQuiz(true);
  };

  const handleViewSolutions = () => {
    if (!quizStatus.quizId) {
      alert("Quiz not attempted yet");
      return;
    }
    setShowQuiz(true);
  };

  // Check Quiz Status when Lesson Changes
  useEffect(() => {
    if (!currentLesson) return;

    // Reset UI state when lesson changes
    setShowQuiz(false); 
    setIsSidebarOpen(false); // Close mobile sidebar on selection

    const loadQuizStatus = async () => {
      try {
        const existsRes = await API.get(`/api/lessons/${currentLesson._id}/exists`);
        
        if (!existsRes.data.exists) {
          setHasQuiz(false);
          return;
        }

        const qId = existsRes.data.quizId;
        setHasQuiz(true);

        const statusRes = await API.get(`/api/quizzes/${qId}/status`);

        setQuizStatus({
          attempted: statusRes.data.attempted === true,
          passed: statusRes.data.passed === true,
          quizId: qId
        });
      } catch (err) {
        if (err.response && err.response.status === 404) {
            setHasQuiz(false);
        } else {
            console.error("Quiz check failed", err);
            setHasQuiz(false);
        }
      }
    };

    loadQuizStatus();
  }, [currentLesson]);

  // Existing Course Loading Logic
  useEffect(() => {
    const loadCoursePlayer = async () => {
      try {
        const res = await API.get(`/api/courses/${courseId}/player`);

        setCourseInfo(res.data.course);
        setLessons(res.data.lessons);

        if (res.data.completedLessonIds) {
          setCompletedLessonIds(res.data.completedLessonIds);
        }

        const startLesson =
          res.data.lessons.find(l => l._id === res.data.lastAccessedLesson) ||
          res.data.lessons[0];

        setCurrentLesson(startLesson);
      } catch (error) {
        if (error.response?.status === 404) {
          alert("This course does not have any lessons yet.");
          navigate("/Learner/my-courses");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCoursePlayer();
  }, [courseId]);

  const handleMarkComplete = async () => {
    if (!completedLessonIds.includes(currentLesson._id)) {
      setCompletedLessonIds([...completedLessonIds, currentLesson._id]);

      try {
        await API.post("/api/progress/lesson-complete", {
          courseId,
          lessonId: currentLesson._id
        });
      } catch (err) {
        console.error("Failed to mark lesson complete", err);
      }
    }
  };

  if (loading || !currentLesson) {
    return <div className="p-20 text-center text-gray-400">Loading course...</div>;
  }

  return (
    // Responsive Layout Container: Stack on mobile, Row on Desktop
    <div className="h-screen w-full bg-slate-50 font-sans flex flex-col lg:flex-row overflow-hidden">

      {/* 1. Mobile Header (Visible only on small screens) */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between z-20 shrink-0">
        <span className="font-bold text-slate-800 truncate max-w-[200px]">{courseInfo?.title}</span>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* 2. Left Lesson Sidebar (Drawer on Mobile, Fixed on Desktop) */}
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:w-80 lg:shadow-none lg:border-r lg:border-slate-200 lg:flex-shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Close Button for Sidebar */}
        <div className="lg:hidden p-4 flex justify-end border-b border-slate-100">
           <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-slate-400">
             <X size={24} />
           </button>
        </div>

        <div className="h-full overflow-y-auto">
          <LessonSidebar 
            lessons={lessons} 
            activeLessonId={currentLesson._id}
            completedLessonIds={completedLessonIds}
            onLessonSelect={setCurrentLesson}
          />
        </div>
      </div>

      {/* 3. Main Content Area (Video + Details) */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50 scroll-smooth">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/Learner/my-courses')}
            className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 font-bold text-xs mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> BACK TO COURSE LIST
          </button>
          
          <h1 className="text-2xl lg:text-4xl font-black text-gray-900 mb-6 lg:mb-8 tracking-tight leading-tight">
            {courseInfo?.title}
          </h1>

          {/* Show Quiz OR Video/Markdown */}
          {showQuiz ? (
            <QuizAttempt
              lessonId={currentLesson._id}
              onClose={() => setShowQuiz(false)}
              onSubmitted={() => {
                setQuizStatus(prev => ({ 
                  ...prev, 
                  attempted: true, 
                  quizId: prev.quizId 
                }));
                if (!completedLessonIds.includes(currentLesson._id)) {
                  setCompletedLessonIds(prev => [...prev, currentLesson._id]);
                }
              }}
            />
          ) : (
            <>
              <VideoPlayer 
                videoURL={currentLesson.video?.url || currentLesson.video || ""} 
                title={currentLesson.title} 
              />

              <div className="mt-8 lg:mt-12 bg-white rounded-3xl p-6 lg:p-10 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase">Lesson Notes</span>
                  <div className="h-px flex-1 bg-gray-50"></div>
                </div>
                
                <div className="prose prose-slate max-w-none" data-color-mode="light">      
                  <MarkdownPreview
                    source={currentLesson.contentMarkdown}
                    style={{ backgroundColor: 'white', color: '#1e293b' }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* 4. Mobile Resource Panel (Stacked at bottom of main content on mobile) */}
        <div className="lg:hidden mt-8 pt-8 border-t border-slate-200">
           <ResourcePanel 
            resources={currentLesson.resources || []} 
            onMarkComplete={handleMarkComplete}
            onShowFeedback={() => setShowFeedback(true)}
            currentLessonId={currentLesson._id}
            hasQuiz={hasQuiz}
            quizStatus={quizStatus.attempted ? "attempted" : "not_attempted"}
            onAttemptQuiz={handleAttemptQuiz}
            onViewSolutions={handleViewSolutions}
          />
        </div>
      </main>

      {/* 5. Desktop Resource Panel (Right Sidebar) */}
      <div className="hidden lg:block w-96 border-l border-slate-200 bg-white overflow-y-auto flex-shrink-0 p-6">
        <ResourcePanel 
          resources={currentLesson.resources || []} 
          onMarkComplete={handleMarkComplete}
          onShowFeedback={() => setShowFeedback(true)}
          currentLessonId={currentLesson._id}
          hasQuiz={hasQuiz}
          quizStatus={quizStatus.attempted ? "attempted" : "not_attempted"}
          onAttemptQuiz={handleAttemptQuiz}
          onViewSolutions={handleViewSolutions}
        />
      </div>

      {showFeedback && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
            onClick={() => setShowFeedback(false)}
          />
          <div className="relative z-10 w-full max-w-2xl animate-in zoom-in duration-300">
            <CourseFeedback 
              courseTitle={courseInfo?.title}
              onClose={() => setShowFeedback(false)}
              onSubmit={(data) => {
                setShowFeedback(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;