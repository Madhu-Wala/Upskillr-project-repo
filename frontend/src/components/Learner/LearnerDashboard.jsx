import React, { use } from 'react';
import { 
  Search, Bell, Clock, BookOpen, Trophy, Flame, 
   Star, Award, CheckCircle,LogOut
} from 'lucide-react';
import StatCard from './StatCard';
import EnrolledCourseCard from './EnrolledCourseCard';
import AchievementRow from './AchievementRow';
import RecommendationCard from './RecommendationCard';
import { useNavigate } from 'react-router-dom';


// --- 1. GLOBAL STYLING CONFIG (THEMES) ---
// This ensures that even if backend data is plain text, your UI stays colorful in a sequence.
const THEME_CONFIG = {
  stats: [
    { bg: "bg-blue-50", text: "text-blue-600", iconBg: "bg-blue-100" },
    { bg: "bg-purple-50", text: "text-purple-600", iconBg: "bg-purple-100" },
    { bg: "bg-pink-50", text: "text-pink-600", iconBg: "bg-pink-100" },
    { bg: "bg-orange-50", text: "text-orange-600", iconBg: "bg-orange-100" },
  ],
  gradients: [
    "from-indigo-500 to-purple-500",
    "from-fuchsia-500 to-pink-500",
    "from-rose-500 to-orange-500",
    "from-emerald-400 to-teal-600",
    "from-yellow-400 to-amber-600",
    "from-sky-400 to-blue-600",
    "from-purple-500 to-pink-500",
    "from-green-500 to-lime-500",
    "from-red-400 to-rose-600",
    "from-cyan-400 to-sky-500"
  ],
  progressColors: [
    "bg-indigo-600", "bg-pink-500", "bg-orange-500", "bg-emerald-500","bg-purple-600", "bg-teal-500", "bg-rose-500", "bg-sky-500"
  ]
};

const LearnerDashboard = () => {
    const nav=useNavigate();
    //mock data, we have to fetch it from backend and model it in this format
  // Imagine these individual objects are fetched from different API endpoints, avatar can be some default image like user icon
  const userProfile = { name: "Sarah", avatar: "https://i.pravatar.cc/150?u=sarah" };

  const statsData = [
    { id: 1, label: "Hours Learned", value: "47.5", icon: Clock },
    { id: 2, label: "Lessons Done", value: "124", icon: BookOpen },
    { id: 3, label: "Certificates", value: "18", icon: Award },
    { id: 4, label: "Day Streak", value: "28", icon: Flame },
  ];

  const learningData = [
    { id: 101, title: "Advanced JavaScript Patterns", lessonsCount: "12/24", timeLeft: "8h 30m", progress: 50 },
    { id: 102, title: "UI/UX Design Fundamentals", lessonsCount: "22/30", timeLeft: "4h 15m", progress: 73 },
    { id: 103, title: "Database Design & SQL", lessonsCount: "5/18", timeLeft: "10h 45m", progress: 28 },
  ];

  const achievementData = [
    { id: 201, title: "Fast Learner", date: "Completed today", icon: Trophy }, //completed course in record time
    { id: 202, title: "Perfect Score", date: "2 days ago", icon: CheckCircle }, //got perfect score in quiz
    { id: 203, title: "Course Master", date: "Last week", icon: Star }, //completed the course with high score
  ];

  const recommendedData = [
    { id: 301, title: "React & Redux Mastery", level: "Advanced", duration: "18h", rating: 4.9 },
    { id: 302, title: "Mobile App Design", level: "Intermediate", duration: "14h", rating: 4.8 },
    { id: 303, title: "Data Analytics Basics", level: "Beginner", duration: "10h", rating: 4.7 },
    { id: 304, title: "Cloud Architecture", level: "Advanced", duration: "22h", rating: 4.9 },
    { id: 305, title: "Cybersecurity Essentials", level: "Intermediate", duration: "16h", rating: 4.8 },
    { id: 306, title: "Digital Marketing 101", level: "Beginner", duration: "12h", rating: 4.7 },
    { id: 307, title: "Project Management Pro", level: "Advanced", duration: "20h", rating: 4.9 },
    { id: 308, title: "AI & Machine Learning", level: "Intermediate", duration: "25h", rating: 4.8 },
    { id: 309, title: "Blockchain Basics", level: "Beginner", duration: "15h", rating: 4.7 },
    { id: 310, title: "DevOps Fundamentals", level: "Advanced", duration: "19h", rating: 4.9 },
  ];

  function handleSignOut(){
    // Add sign-out logic here
    nav('/');
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Navbar */}
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
              <a key={item} href="#" className={`text-sm font-bold ${item === 'Dashboard' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
                {item}
              </a>
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
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userProfile.name}!</h1>
          <p className="text-gray-400">Continue your learning journey today</p>
        </header>

        {/* 1. Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsData.map((item, index) => (
            <StatCard 
              key={item.id} 
              item={item} 
              theme={THEME_CONFIG.stats[index % THEME_CONFIG.stats.length]} 
            />
          ))}
        </div>

        {/* 2. Learning & Achievements Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Continue Learning</h2>
            <div className="grid gap-4">
              {learningData.map((course, index) => (
                <EnrolledCourseCard 
                  key={course.id} 
                  course={course} 
                  colorClass={THEME_CONFIG.progressColors[index % THEME_CONFIG.progressColors.length]} 
                />
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Achievements</h2>
            <div className="space-y-2">
              {achievementData.map((ach, index) => (
                <AchievementRow 
                  key={ach.id} 
                  achievement={ach} 
                  theme={THEME_CONFIG.stats[index % THEME_CONFIG.stats.length]} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3. Recommendations */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recommended For You</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {recommendedData.map((course, index) => (
              <RecommendationCard 
                key={course.id} 
                course={course} 
                gradient={THEME_CONFIG.gradients[index % THEME_CONFIG.gradients.length]} 
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearnerDashboard;