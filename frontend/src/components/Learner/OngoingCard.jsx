import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { PlayCircle, BookOpen, UploadCloud } from 'lucide-react';

// Theme Gradients for Fallback
const THEME_GRADIENTS = [
  "bg-gradient-to-br from-indigo-500 to-purple-500",
  "bg-gradient-to-br from-fuchsia-500 to-pink-500",
  "bg-gradient-to-br from-rose-500 to-orange-500",
  "bg-gradient-to-br from-emerald-400 to-teal-600",
  "bg-gradient-to-br from-sky-400 to-blue-600",
  "bg-gradient-to-br from-yellow-400 to-orange-500",
  "bg-gradient-to-br from-green-400 to-lime-500",
  "bg-gradient-to-br from-pink-400 to-rose-500",
  "bg-gradient-to-br from-purple-400 to-indigo-500",
  "bg-gradient-to-br from-red-400 to-pink-500"
];

const OngoingCard = ({ course, index }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const totalLessons = course.totalLessons || 0;
  const completedLessons = course.lessonsCompleted || 0;

  let progressPercent = 0;
  if (totalLessons > 0) {
    progressPercent = Math.round((completedLessons / totalLessons) * 100);
  }

  // Define Badge Style based on difficulty
  const difficulty = course.difficulty || "Beginner"; 
  const badgeStyle = "bg-white/90 text-indigo-600 shadow-sm backdrop-blur-sm";

  // Use passed gradient, or pick the first one as default
  const activeGradient = THEME_GRADIENTS[(index || 0) % THEME_GRADIENTS.length];

  // ✅ Validate Thumbnail: Must be a string and longer than 5 chars
  const hasValidThumbnail = course.thumbnail && 
                            typeof course.thumbnail === 'string' && 
                            course.thumbnail.length > 5 && 
                            !course.thumbnail.includes("placeholder");

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col relative">
      
      {/* 1. HEADER: Thumbnail or Gradient */}
      <div className="h-48 w-full relative overflow-hidden shrink-0">
        
        {hasValidThumbnail && !imgError ? (
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)} // ✅ Switches to gradient if image fails
          />
        ) : (
          // ✅ Gradient Fallback (Shows if no thumbnail OR if thumbnail breaks)
          <div className={`w-full h-full ${activeGradient} flex items-center justify-center`}>
            <BookOpen className="w-12 h-12 text-white/40" />
          </div>
        )}
        
        {/* Badge Overlay (Top Left) */}
        <div className="absolute top-4 left-4">
           <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${badgeStyle}`}>
             {difficulty}
           </span>
        </div>
      </div>

      {/* 2. CONTENT AREA */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h4 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h4>

        {/* Instructor */}
        <p className="text-gray-500 text-sm mb-6 font-medium">
          by {course.instructor || "Instructor"}
        </p>
        
        {/* Stats / Progress Section */}
        <div className="mt-auto space-y-4">
          
          {/* Progress Bar & Text */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-gray-400">
                {completedLessons} of {totalLessons} lessons
              </span>
              <span className="text-xs font-black text-indigo-600">
                {progressPercent}%
              </span>
            </div>
            
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate(`/Learner/courses/${course.id}`)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-95 transition-all"
          >
            <PlayCircle className="w-4 h-4" />
            {progressPercent === 0 ? "Start Course" : "Resume Course"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OngoingCard;