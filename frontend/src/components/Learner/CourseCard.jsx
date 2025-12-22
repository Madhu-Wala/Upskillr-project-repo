import React from 'react';
import { Star, User, BookOpen } from 'lucide-react';

const CourseCard = ({ course, fallbackGradient }) => {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Thumbnail or Gradient Fallback */}
      <div className="h-48 w-full relative overflow-hidden">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center`}>
            <BookOpen className="w-12 h-12 text-white/30" />
          </div>
        )}
      </div>

      <div className="p-6">
        <h4 className="font-bold text-gray-800 text-lg leading-tight mb-2 line-clamp-2 h-12">
          {course.title}
        </h4>
        <p className="text-gray-400 text-sm font-medium mb-4">by {course.instructor}</p>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-gray-700">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <User className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">{course.students.toLocaleString()} students</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-2xl font-black text-gray-900">${course.price}</span>
          <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-indigo-100">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;