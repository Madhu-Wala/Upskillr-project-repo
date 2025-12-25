import React from 'react';
import { PlayCircle, CheckCircle, Lock } from 'lucide-react';

const LessonSidebar = ({ lessons, activeLessonId, completedLessonIds, onLessonSelect }) => {
  return (
    <div className="w-80 flex flex-col bg-white border-r border-gray-100 h-[calc(100vh-73px)] sticky top-[73px]">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Course Content</h3>
        <p className="text-gray-400 text-xs mt-1 font-medium">{lessons.length} Lessons • 4h 20m</p>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
        {lessons.map((lesson, index) => {
          const isActive = activeLessonId === lesson._id;
          const isCompleted = completedLessonIds.includes(lesson._id);

          return (
            <button
              key={lesson._id}
              onClick={() => onLessonSelect(lesson)}
              className={`w-full flex items-start gap-3 p-4 rounded-2xl transition-all text-left group ${
                isActive ? 'bg-indigo-50 border-indigo-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="mt-0.5">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                ) : (
                  <PlayCircle className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-300 group-hover:text-gray-400'}`} />
                )}
              </div>
              <div className="flex-1">
                <span className={`text-[10px] font-black uppercase tracking-tighter ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                  Lesson {index + 1}
                </span>
                <h4 className={`text-sm font-bold leading-tight ${isActive ? 'text-indigo-900' : 'text-gray-700'}`}>
                  {lesson.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LessonSidebar;