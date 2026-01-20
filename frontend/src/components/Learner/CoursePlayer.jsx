import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
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

    const loadQuizStatus = async () => {
      try {
        // 1. Check if quiz exists
        const existsRes = await API.get(`/api/lessons/${currentLesson._id}/exists`);
        console.log("Quiz exists response:", existsRes.data);
        
        if (!existsRes.data.exists) {
          setHasQuiz(false);
          return;
        }

        const qId = existsRes.data.quizId;
        setHasQuiz(true);

        // 2. Check if already attempted
        const statusRes = await API.get(`/api/quizzes/${qId}/status`);

        setQuizStatus({
          attempted: statusRes.data.attempted === true,
          passed: statusRes.data.passed === true,
          quizId: qId
        });
      } catch (err) {
        // Silent fail on 404 (means no quiz), only log real errors
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

        // ✅ CRITICAL FIX: Load the saved progress from DB
        // This ensures checkmarks persist after refresh!
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
    <div className="min-h-screen bg-slate-50 font-sans">

      <div className="flex">
        {/* Left Lesson Selection */}
        <LessonSidebar 
          lessons={lessons} 
          activeLessonId={currentLesson._id}
          completedLessonIds={completedLessonIds}
          onLessonSelect={setCurrentLesson}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-73px)]">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate('/Learner/my-courses')}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 font-bold text-xs mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> BACK TO COURSE LIST
            </button>
            
            <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">
              {courseInfo?.title}
            </h1>

            {/* Show Quiz OR Video/Markdown */}
            {showQuiz ? (
              <QuizAttempt
                lessonId={currentLesson._id}
                onClose={() => setShowQuiz(false)}
                // ✅ KEY LOGIC: When submitted, update state to "attempted: true"
                onSubmitted={() => {
                  // 1. Update Quiz Status to show "View Solutions"
                  setQuizStatus(prev => ({ 
                    ...prev, 
                    attempted: true, 
                    quizId: prev.quizId 
                  }));

                  // 2. ✅ Update Sidebar Icon to "Completed" immediately
                  if (!completedLessonIds.includes(currentLesson._id)) {
                    setCompletedLessonIds(prev => [...prev, currentLesson._id]);
                  }
                }}
              />
            ) : (
              <>
                {/* ✅ FIXED: Extract the URL string properly */}
                <VideoPlayer 
                  videoURL={currentLesson.video?.url || currentLesson.video || ""} 
                  title={currentLesson.title} 
                />

                <div className="mt-12 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase">Lesson Notes</span>
                    <div className="h-px flex-1 bg-gray-50"></div>
                  </div>
                  
                  <div className="p-8 bg-white" data-color-mode="light">      
                    <MarkdownPreview
                      source={currentLesson.contentMarkdown}
                      style={{ backgroundColor: 'white', color: '#1e293b' }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>

        {/* Right Resource & Action Panel */}
        <ResourcePanel 
          // Existing props
          resources={currentLesson.resources || []} 
          onMarkComplete={handleMarkComplete}
          onShowFeedback={() => setShowFeedback(true)}
          currentLessonId={currentLesson._id}
          // Quiz props
          hasQuiz={hasQuiz}
          // ✅ This status prop controls the button text
          quizStatus={quizStatus.attempted ? "attempted" : "not_attempted"}
          onAttemptQuiz={handleAttemptQuiz}
          onViewSolutions={handleViewSolutions}
        />
      </div>

      {showFeedback && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
            onClick={() => setShowFeedback(false)}
          />
          <div className="relative z-10 w-full max-w-2xl animate-in zoom-in duration-300">
            <CourseFeedback 
              courseTitle={courseInfo?.title}
              onClose={() => setShowFeedback(false)}
              onSubmit={(data) => {
                console.log("Feedback data:", data);
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