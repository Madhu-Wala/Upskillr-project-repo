import React, { useState } from 'react';
import { BookOpen, Search, Bell, LogOut, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import LessonSidebar from './LessonSidebar';
import VideoPlayer from './VideoPlayer';
import ResourcePanel from './ResourcePanel';
import CourseFeedback from './CourseFeedback';

const CoursePlayer = () => {
  const navigate = useNavigate();

  const [showFeedback, setShowFeedback] = useState(false);

  // Dummy Course Data
  const courseInfo = { title: "Advanced JavaScript Patterns" };
  const lessons = [
    {
        _id: "L1",
        courseId: "C101",
        title: "Understanding the Module Pattern",
        videoURL: "https://www.youtube.com/embed/V6XNAnxH_j0",
        resources: [
        { name: "Syllabus.pdf", url: "#" },
        { name: "Module_Design_Specs.pdf", url: "#" }
        ],
        contentMarkdown: "### What is the Module Pattern?\n\nIn JavaScript, the **Module Pattern** is used to further emulate the concept of classes in such a way that we're able to include both public/private methods and variables inside a single object.\n\n#### Key Benefits:\n1. **Encapsulation**: Keeps variables private.\n2. **Clean Global Scope**: Reduces variable name collisions.",
        quizId: "Q101",
    },
    {
        _id: "L2",
        courseId: "C101",
        title: "Closures and Lexical Scope",
        videoURL: "https://www.youtube.com/embed/71AtaJpJHw0",
        resources: [{ name: "Scope_Cheatsheet.pdf", url: "#" }],
        contentMarkdown: "A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).",
        quizId: "Q102",
    },
    {
        _id: "L3",
        courseId: "C101",
        title: "Functional Programming Basics",
        videoURL: "https://www.youtube.com/embed/e-5obm1G_FY",
        resources: [],
        contentMarkdown: "Functional programming (often abbreviated FP) is the process of building software by composing **pure functions**.",
        quizId: "Q103",
    },
    {
        _id: "L4",
        courseId: "C101",
        title: "Advanced DOM Manipulation",
        videoURL: "https://www.youtube.com/embed/0ik6X4DJKCc",
        resources: [{ name: "DOM_Reference.pdf", url: "#" }],
        contentMarkdown: "The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the structure.",
        quizId: "Q104",
    },
    {
        _id: "L5",
        courseId: "C101",
        title: "Asynchronous JS: Promises & Async/Await",
        videoURL: "https://www.youtube.com/embed/vn3tm0quoqE",
        resources: [{ name: "Async_Guide.pdf", url: "#" }],
        contentMarkdown: "Asynchronous JavaScript is a fairly broad topic. We use `async` and `await` to write asynchronous code that looks synchronous.",
        quizId: "Q105",
    }
    ];

  const [currentLesson, setCurrentLesson] = useState(lessons[0]);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);

  const handleMarkComplete = () => {
    if (!completedLessonIds.includes(currentLesson._id)) {
      setCompletedLessonIds([...completedLessonIds, currentLesson._id]);
    }
  };

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
              onClick={() => navigate('../my-courses')}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 font-bold text-xs mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> BACK TO COURSE LIST
            </button>
            
            <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">
              {courseInfo.title}
            </h1>

            <VideoPlayer videoURL={currentLesson.videoURL} title={currentLesson.title} />

            <div className="mt-12 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase">Lesson Notes</span>
                <div className="h-px flex-1 bg-gray-50"></div>
              </div>
              
              <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed font-medium">
                <ReactMarkdown>
                  {currentLesson.contentMarkdown}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </main>

        {/* Right Resource & Action Panel */}
        <ResourcePanel 
          resources={currentLesson.resources} 
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
              courseTitle={courseInfo.title}
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