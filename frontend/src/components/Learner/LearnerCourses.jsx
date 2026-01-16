import React, { useEffect, useState } from 'react';
import { 
  BookOpen, Search, Bell, LogOut, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from "../../api/axios";

// Import the child components
import OngoingCard from './OngoingCard';
import CompletedCard from './CompletedCard';
import EmptyState from './EmptyState';

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
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await API.get("/api/learners/my-courses");

        const ongoing = [];
        const completed = [];

        res.data.forEach((item) => {
          const formatted = {
            id: item._id,
            title: item.title,
            instructor: item.instructor,
            lessonsCompleted: item.completedLessonsCount || 0,
            totalLessons: item.lessonsCount || 0,
            thumbnail: item.thumbnail,
            progressPercent: item.progressPercent || 0
          };

          if (item.completed === true) {
            completed.push(formatted);
          } else {
            ongoing.push(formatted);
          }
        });


        setOngoingCourses(ongoing);
        setCompletedCourses(completed);

      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
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
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
          </div>
        ) : activeTab === 'ongoing' ? (
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
