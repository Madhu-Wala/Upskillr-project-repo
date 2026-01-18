import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import MarkdownPreview from '@uiw/react-markdown-preview';
import API from "../../api/axios";

import LessonSidebar from './LessonSidebar';
import VideoPlayer from './VideoPlayer';
import ResourcePanel from './ResourcePanel';
import CourseFeedback from './CourseFeedback';

const CoursePlayer = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [showFeedback, setShowFeedback] = useState(false);
  const [courseInfo, setCourseInfo] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCoursePlayer = async () => {
      try {
        const res = await API.get(`/api/courses/${courseId}/player`);

        setCourseInfo(res.data.course);
        setLessons(res.data.lessons);

        const startLesson =
          res.data.lessons.find(l => l._id === res.data.lastAccessedLesson) ||
          res.data.lessons[0];

        setCurrentLesson(startLesson);
      } catch (error) {
        if (error.response?.status === 404) {
          alert("This course does not have any lessons yet. Please check back later.");
          navigate("/Learner/my-courses");
        } else {
          alert("Something went wrong while loading the course.");
        }
      }
      finally {
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
            {console.log(currentLesson)}
            <VideoPlayer videoURL={currentLesson.videoURL} title={currentLesson.title} />

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
          </div>
        </main>

        {/* Right Resource & Action Panel */}
        <ResourcePanel 
          resources={currentLesson.resources || []} 
          quizId={currentLesson.quizId} 
          onMarkComplete={handleMarkComplete}
          onShowFeedback={() => setShowFeedback(true)}
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
