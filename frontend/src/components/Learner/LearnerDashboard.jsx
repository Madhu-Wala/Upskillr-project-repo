import { 
  Clock, BookOpen, Trophy, Flame, 
  Star, Award, CheckCircle
} from 'lucide-react';
import StatCard from './StatCard';
import EnrolledCourseCard from './EnrolledCourseCard';
import AchievementRow from './AchievementRow';
import RecommendationCard from './RecommendationCard';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from "../../api/axios";

// --- THEMES ---
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
  ],
  progressColors: [
    "bg-indigo-600","bg-pink-500","bg-orange-500","bg-emerald-500"
  ]
};

const LearnerDashboard = () => {
  const [userName, setUserName] = useState("Learner");
  const [statsData, setStatsData] = useState([]);
  const [learningData, setLearningData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.name);
    }

    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const res = await API.get("/api/learners/dashboard");

    // Stats
    setStatsData([
      { id: 1, label: "Hours Learned", value: res.data.stats.hoursLearned, icon: Clock },
      { id: 2, label: "Lessons Done", value: res.data.stats.lessonsDone, icon: BookOpen },
      { id: 3, label: "Certificates", value: res.data.stats.certificates, icon: Award },
      { id: 4, label: "Day Streak", value: res.data.stats.dayStreak, icon: Flame }
    ]);

    // Continue Learning
    setLearningData(
      res.data.continueLearning.map(c => ({
        id: c.courseId,
        title: c.title,
        lessonsCount: `${c.completed}/${c.total}`,
        timeLeft: "",
        progress: Math.round((c.completed / c.total) * 100)
      }))
    );

    // Recommended
    const rec = await API.get("/api/courses/recommended");
    setRecommendedData(rec.data);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userName}!</h1>
          <p className="text-gray-400">Continue your learning journey today</p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsData.map((item, index) => (
            <StatCard key={item.id} item={item} theme={THEME_CONFIG.stats[index % 4]} />
          ))}
        </div>

        {/* Continue Learning */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Continue Learning</h2>
            {learningData.map((course, index) => (
              <EnrolledCourseCard 
                key={course.id}
                course={course}
                colorClass={THEME_CONFIG.progressColors[index % 4]}
                onClick={() => nav(`/Learner/courses/${course.id}`)}
              />
            ))}
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Achievements</h2>
            <AchievementRow 
              achievement={{ title: "Course Completed", date: "Today", icon: Trophy }} 
              theme={THEME_CONFIG.stats[0]} 
            />

          </div>
        </div>

        {/* Recommended */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recommended For You</h2>

          {recommendedData.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-gray-400 font-semibold">
              🎉 You are enrolled in all available top-rated courses.
              <br />
              No new recommendations right now.
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {recommendedData.map((course, index) => (
                <RecommendationCard
                  key={course._id}
                  course={course}
                  gradient={THEME_CONFIG.gradients[index % 6]}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default LearnerDashboard;
