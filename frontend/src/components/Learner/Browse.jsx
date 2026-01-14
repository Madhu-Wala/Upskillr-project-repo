import React, { useEffect, useState } from 'react';
import API from "../../api/axios";
import { 
  Search, Bell, BookOpen, LogOut, Filter, 
  ChevronDown, ChevronLeft, ChevronRight ,Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import CourseDrawer from './CourseDrawer';

const THEME_GRADIENTS = [
  "from-indigo-500 to-purple-500",
  "from-fuchsia-500 to-pink-500",
  "from-rose-500 to-orange-500",
  "from-emerald-400 to-teal-600",
  "from-sky-400 to-blue-600"
];

function Browse() {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());

  const categories = ['All Categories', 'Programming', 'Frontend', 'Design', 'Business', 'Marketing', 'Data Science'];

  // 🔹 Load courses
  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const response = await API.get('/api/courses', {
          params: { category: activeCategory }
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, [activeCategory]);

  // 🔹 Load enrolled courses for this learner
  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const res = await API.get("/api/learner/my-courses");
        const ids = new Set(res.data.map(c => c.courseId._id));
        setEnrolledCourses(ids);
      } catch {
        // Not logged in or no enrollments
      }
    };
    loadEnrollments();
  }, []);

  // 🔹 Enroll
  const handleEnroll = async (courseId) => {
    try {
      setEnrolling(true);

      await API.post(`/api/enrollments/${courseId}`);

      setEnrolledCourses(prev => new Set([...prev, courseId]));
      setIsDrawerOpen(false);
      
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Discover Courses</h1>
          <p className="text-gray-400 font-medium mt-2 text-lg">Enhance your skills with our extensive library</p>
        </header>

        {/* Categories */}
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'bg-white text-gray-400 border border-gray-100 hover:border-indigo-200 hover:text-indigo-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <CourseCard 
                key={course._id} 
                course={{
                  ...course,
                  instructor: course.instructorId?.name || "Instructor",
                  id: course._id,
                  enrolled: enrolledCourses.has(course._id)
                }} 
                fallbackGradient={THEME_GRADIENTS[index % THEME_GRADIENTS.length]}
                onQuickView={(course) => {
                  setSelectedCourse(course);
                  setIsDrawerOpen(true);
                }}
              />
            ))}

            <CourseDrawer 
              course={selectedCourse}
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              onEnroll={handleEnroll}
              loading={enrolling}
              enrolled={enrolledCourses.has(selectedCourse?._id)}
            />

            {!loading && courses.length === 0 && (
              <div className="text-center py-20 text-gray-400 font-medium">
                No courses found in this category.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
