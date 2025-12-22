import React from 'react';
import { 
  Search, Bell, Clock, BookOpen, Trophy, Flame, 
  PlayCircle, Star, ChevronRight, ChevronLeft, Plus,
  Layout, Award, CheckCircle
} from 'lucide-react';
const EnrolledCourseCard = ({ course, colorClass }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center text-white shrink-0`}>
      <PlayCircle className="w-8 h-8 opacity-80" />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-bold text-gray-800">{course.title}</h4>
        <button className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700">
          Continue
        </button>
      </div>
      <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 mb-3">
        <span>{course.lessonsCount} lessons</span>
        <span>{course.timeLeft} left</span>
      </div>
      <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`absolute left-0 top-0 h-full ${colorClass}`} style={{ width: `${course.progress}%` }} />
      </div>
    </div>
  </div>
);
export default EnrolledCourseCard;