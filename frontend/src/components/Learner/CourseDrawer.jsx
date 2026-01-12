import React from 'react';
import { X, BookOpen, Clock, PlayCircle, ShieldCheck, Loader2 } from 'lucide-react';

const CourseDrawer = ({ course, isOpen, onClose, onEnroll, loading, enrolled }) => {
  if (!course) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-black text-xl text-gray-900">Course Preview</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-gray-900 leading-tight">{course.title}</h2>
              <p className="text-gray-500 font-medium leading-relaxed">{course.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-2xl">
                <Clock className="text-indigo-600 mb-2" size={20} />
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Duration</p>
                <p className="text-indigo-900 font-black">4.5 Hours</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl">
                <BookOpen className="text-emerald-600 mb-2" size={20} />
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Lessons</p>
                <p className="text-emerald-900 font-black">{course.lessonsCount} Modules</p>
              </div>
            </div>

            {/* Dummy Syllabus Preview */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900">What you'll learn</h4>
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl group hover:border-indigo-200 transition-colors">
                  <PlayCircle size={18} className="text-gray-300 group-hover:text-indigo-500" />
                  <span className="text-sm font-medium text-gray-600">Introduction to the core concepts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-gray-50">
            <button 
              onClick={() => !enrolled && onEnroll(course._id)}
              disabled={loading || enrolled}
              className={`w-full py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95
                ${enrolled 
                  ? "bg-emerald-500 text-white shadow-emerald-100 cursor-default"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100"
                }
                disabled:opacity-70`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : enrolled ? (
                <>
                  <ShieldCheck size={20} />
                  Enrolled
                </>
              ) : (
                <>
                  <ShieldCheck size={20} />
                  Confirm Enrollment
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4 font-medium italic">
              Access starts immediately after clicking
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDrawer;
