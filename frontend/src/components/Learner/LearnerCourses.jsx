import React, { useState } from 'react';
import { 
  BookOpen, Search, Bell, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import the child components
import OngoingCard from './OngoingCard';
import CompletedCard from './CompletedCard'; // Ensure this file exists
import EmptyState from './EmptyState';       // Ensure this file exists

const COURSE_THEMES = {
  gradients: [
    "from-indigo-500 to-purple-500",
    "from-fuchsia-500 to-pink-500",
    "from-rose-500 to-orange-500",
    "from-emerald-400 to-teal-600",
    "from-sky-400 to-blue-600"
  ]
};

function LearnerCourses() {
  const [activeTab, setActiveTab] = useState('ongoing');
  const navigate = useNavigate(); // Corrected: variable name must match usage

  const ongoingCourses = [
    { 
      id: 1, 
      title: "Advanced JavaScript Patterns", 
      instructor: "Dr. Elena Smith", 
      lessonsCompleted: 8, 
      totalLessons: 24,
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      id: 2, 
      title: "UI/UX Design Fundamentals", 
      instructor: "Marcus Thorne", 
      lessonsCompleted: 22, 
      totalLessons: 30,
      thumbnail: null 
    },
    { 
      id: 3, 
      title: "Database Design & SQL", 
      instructor: "Sarah Jenkins", 
      lessonsCompleted: 5, 
      totalLessons: 18,
      thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=400&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Machine Learning Basics",
        instructor: "Dr. Alan Turing",
        lessonsCompleted: 10,
        totalLessons: 20,
        thumbnail: null
    },
    {
        id: 5,
        title: "Introduction to Cybersecurity",
        instructor: "Lisa Wong",
        lessonsCompleted: 15,
        totalLessons: 25,
        thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400&auto=format&fit=crop"
    }
  ];

  const completedCourses = [
    { id: 101, title: "Introduction to React", completionDate: "Oct 12, 2025" },
    { id: 102, title: "Tailwind CSS Mastery", completionDate: "Sep 28, 2025" }
  ];

  const handleSignOut = () => {
    // Logic like localStorage.clear() goes here
    navigate('/'); // Using the correct variable name
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-gray-900">UpSkillr</span>
          </div>
          <div className="hidden md:flex gap-6">
            {['Dashboard', 'My Courses', 'Browse', 'Achievements'].map(item => (
              <button 
                key={item} 
                className={`text-sm font-bold transition-colors ${item === 'My Courses' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center bg-gray-100 rounded-xl px-3 py-2 w-64 group focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search courses..." className="bg-transparent border-none outline-none text-xs ml-2 w-full text-gray-600" />
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
          </div>
          <img src="https://i.pravatar.cc/150?u=sarah" alt="profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-semibold text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">My Courses</h1>
          <p className="text-gray-400 font-medium mt-1">Continue your learning journey</p>
        </header>

        {/* Custom Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-gray-200">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('ongoing')}
              className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'ongoing' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Ongoing Courses
              <span className="ml-2 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[10px]">
                {ongoingCourses.length}
              </span>
              {activeTab === 'ongoing' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'completed' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Completed Courses
              <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-[10px]">
                {completedCourses.length}
              </span>
              {activeTab === 'completed' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full" />}
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'ongoing' ? (
          ongoingCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingCourses.map((course, index) => (
                <OngoingCard 
                  key={course.id} 
                  course={course} 
                  themeColor={COURSE_THEMES.gradients[index % COURSE_THEMES.gradients.length]}
                />
              ))}
            </div>
          ) : <EmptyState type="ongoing" />
        ) : (
          completedCourses.length > 0 ? (
            <div className="space-y-4">
              {completedCourses.map((course) => (
                <CompletedCard key={course.id} course={course} />
              ))}
            </div>
          ) : <EmptyState type="completed" />
        )}
      </div>
    </div>
  );
}

export default LearnerCourses;