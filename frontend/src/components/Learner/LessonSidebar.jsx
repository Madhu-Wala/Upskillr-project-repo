import React from 'react';
import { PlayCircle, CheckCircle } from 'lucide-react'; // Removed unused imports

const LessonSidebar = ({ lessons, activeLessonId, completedLessonIds = [], onLessonSelect }) => {
  
  return (
    <aside className="w-80 bg-white border-r border-gray-100 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h2 className="font-black text-gray-900 text-lg tracking-tight">Course Content</h2>
        <p className="text-xs text-gray-400 font-bold mt-1">
          {completedLessonIds.length} / {lessons.length} COMPLETED
        </p>
      </div>

      <div className="flex-1 py-2">
        {lessons.map((lesson, index) => {
          const isActive = lesson._id === activeLessonId;
          const isCompleted = completedLessonIds.includes(lesson._id);

          return (
            <button
              key={lesson._id}
              onClick={() => onLessonSelect(lesson)}
              className={`w-full text-left px-6 py-4 flex items-start gap-4 transition-all border-l-4 
                ${isActive 
                  ? 'bg-indigo-50 border-indigo-600' 
                  : 'border-transparent hover:bg-gray-50'
                }`}
            >
              <div className={`mt-0.5 shrink-0 transition-colors duration-300
                ${isCompleted ? 'text-emerald-500' : isActive ? 'text-indigo-600' : 'text-gray-300'}
              `}>
                {isCompleted ? (
                  <CheckCircle size={20} /> 
                ) : (
                  <PlayCircle size={20} />
                )}
              </div>

              <div className="flex-1">
                <p className={`text-sm font-bold leading-snug mb-1 transition-colors
                  ${isActive ? 'text-indigo-900' : isCompleted ? 'text-gray-500' : 'text-gray-600'}
                `}>
                  {index + 1}. {lesson.title}
                </p>
                {/* REMOVED: Duration text span was here */}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default LessonSidebar;