import React from 'react';
import { Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecommendationCard = ({ course, gradient }) => {
  const navigate = useNavigate();

  return (
    <div className="min-w-[280px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">
      
      {/* Thumbnail / Gradient Header */}
      <div className={`h-32 w-full bg-gradient-to-r ${gradient} relative flex items-center justify-center overflow-hidden`}>
         {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
         ) : (
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
         )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags Row */}
        <div className="flex justify-between items-start mb-3">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider">
            {course.level}
          </span>
          <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
            <Clock size={12} /> {course.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 line-clamp-2 mb-1" title={course.title}>
          {course.title}
        </h3>

        {/* Instructor Name */}
        <p className="text-xs font-medium text-gray-500 mb-4 line-clamp-1">
           By {course.instructor}
        </p>

        {/* Footer: Rating & Button */}
        {/* Footer: Rating & Button */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            
            {/* ✅ LOGIC: If rating exists, show number. If null, show "New" */}
            <span className="text-xs font-black text-amber-700">
              {course.rating ? Number(course.rating).toFixed(1) : "New"}
            </span>
          </div>

          <button 
            onClick={() => navigate(`/Learner/courses/${course._id}`)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-indigo-100"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;