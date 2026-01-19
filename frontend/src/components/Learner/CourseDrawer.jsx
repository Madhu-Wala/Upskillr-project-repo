import React from 'react';
import { X, BookOpen, PlayCircle, ShieldCheck, Loader2, User, Lock } from 'lucide-react';

const CourseDrawer = ({ course, isOpen, onClose, onEnroll, loading, enrolled }) => {
  if (!course) return null;

  // Helper to safely get instructor name
  const getInstructorName = () => {
    if (!course.instructor) return 'Upskillr Instructor';
    if (typeof course.instructor === 'string') return course.instructor;
    if (course.instructor.firstName) {
      return `${course.instructor.firstName} ${course.instructor.lastName || ''}`;
    }
    return course.instructor.name || 'Upskillr Instructor';
  };

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
              
              <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                <User size={16} className="text-indigo-600" />
                <span>Instructor: {getInstructorName()}</span>
              </div>

              <p className="text-gray-500 font-medium leading-relaxed">{course.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-emerald-50 rounded-2xl flex items-center justify-between">
                <div>
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Lessons</p>
                    <p className="text-emerald-900 font-black">{course.lessonsCount || course.lessons?.length || 0} Modules</p>
                </div>
                <BookOpen className="text-emerald-600" size={24} />
              </div>
            </div>

            {/* ✅ FIXED: Always show lessons list (Preview Mode) */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900">What you'll learn</h4>
              
              {course.lessons && course.lessons.length > 0 ? (
                <div className="space-y-3">
                  {/* Map through lessons (Showing up to 5 or all) */}
                  {course.lessons.map((lesson, i) => (
                    <div key={lesson._id || i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl group hover:border-indigo-200 transition-colors bg-white">
                      <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                        {/* Show Play icon if enrolled, Lock icon if not */}
                        {enrolled ? (
                          <PlayCircle size={16} className="text-indigo-600" />
                        ) : (
                          <Lock size={16} className="text-gray-400" />
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-700 line-clamp-1">
                        {lesson.title || `Lesson ${i + 1}`}
                      </span>
                    </div>
                  ))}
                  
                  {/* Optional: Message if there are more lessons */}
                  {course.lessonsCount > course.lessons.length && (
                     <p className="text-xs text-center text-gray-400 italic">
                       + {course.lessonsCount - course.lessons.length} more lessons available
                     </p>
                  )}
                </div>
              ) : (
                // Fallback if backend really sends nothing
                <div className="p-4 bg-gray-50 rounded-xl text-center text-sm text-gray-400 italic">
                  No lessons listed for this course yet.
                </div>
              )}
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
            {!enrolled && (
              <p className="text-center text-xs text-gray-400 mt-4 font-medium italic">
                Access starts immediately after clicking
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDrawer;