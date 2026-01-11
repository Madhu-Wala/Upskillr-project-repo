import React from 'react';
import { Star, User, BookOpen,ChevronRight } from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const CourseCard = ({ course, fallbackGradient,onQuickView }) => {
  const navigate=useNavigate();
  // MongoDB uses _id. We check for both just in case.
  const courseId = course._id || course.id;

  // const handleDetails = () => {
  //   navigate(`/course/${courseId}`);
  // };
  return (
    <div onClick={()=>onQuickView(course)}
    className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
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
        {/* Difficulty Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-indigo-600 rounded-lg shadow-sm">
            {course.difficulty || 'All Levels'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-bold text-gray-800 text-lg leading-tight mb-2 line-clamp-2 h-12">
          {course.title}
        </h4>
        <p className="text-gray-400 text-sm font-medium mb-4">by {course.instructor || course.instructorId?.name || "Expert Instructor"}</p>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-gray-700">{course.rating || "4.5"}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">{course.lessonsCount || 0} Lessons</span></div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          
          {/* <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-indigo-100">
            Enroll
            
          </button> */}
          {/* Button also triggers the drawer for that "Quick View" feel */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Important!
              onQuickView(course);
            }}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;