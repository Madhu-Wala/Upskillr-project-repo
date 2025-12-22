import React from 'react';
import { PlayCircle, MoreVertical, ImageIcon } from 'lucide-react';

const OngoingCard = ({ course, themeColor }) => {
  // Calculate percentage
  const progressPercent = Math.round((course.lessonsCompleted / course.totalLessons) * 100);

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
      {/* Thumbnail or Gradient Fallback */}
      <div className="h-40 w-full relative overflow-hidden">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${themeColor} flex items-center justify-center`}>
            <ImageIcon className="w-10 h-10 text-white/40" />
          </div>
        )}
        
        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md p-1.5 rounded-lg cursor-pointer">
          <MoreVertical className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">{course.title}</h4>
        <p className="text-gray-400 text-sm mb-4 font-medium">Instructor: {course.instructor}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-gray-400">
              {course.lessonsCompleted} of {course.totalLessons} lessons
            </span>
            <span className="text-xs font-bold text-indigo-600">{progressPercent}%</span>
          </div>
          
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-700" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>

          <button className="w-full mt-4 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-95 transition-all">
            <PlayCircle className="w-5 h-5" />
            Resume Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default OngoingCard;