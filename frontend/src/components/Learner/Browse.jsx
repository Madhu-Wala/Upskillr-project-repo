import React, { useEffect, useState, useRef } from 'react';
import API from "../../api/axios";
import { Loader2, Search, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import CourseDrawer from './CourseDrawer';

// Same Gradient List
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

function Browse() {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = ['All Categories', 'Development', 'Marketing', 'Programming'];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      try {
        const categoryParam = activeCategory === 'All Categories' ? '' : activeCategory;
        const response = await API.get('/api/courses', {
          params: { category: categoryParam }
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

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const res = await API.get("/api/learners/my-courses");
        const ids = new Set(res.data.map(c => c.courseId._id));
        setEnrolledCourses(ids);
      } catch { }
    };
    loadEnrollments();
  }, []);

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

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Discover Courses</h1>
          <p className="text-gray-400 font-medium mt-2 text-lg">Enhance your skills with our extensive library</p>
        </header>

        {/* SEARCH & CATEGORY BAR */}
        <section className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            <input 
              type="text" 
              placeholder="Search for courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all"
            />
          </div>

          <div className="relative w-full md:w-64" ref={dropdownRef}>
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-left flex items-center justify-between shadow-sm hover:border-indigo-300 transition-all"
            >
              <span className={`font-semibold ${activeCategory === 'All Categories' ? 'text-gray-700' : 'text-indigo-600'}`}>
                {activeCategory}
              </span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCategoryOpen && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm font-medium flex items-center justify-between hover:bg-gray-50 transition-colors
                        ${activeCategory === cat ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600'}
                      `}
                    >
                      {cat}
                      {activeCategory === cat && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCourses.map((course, index) => {
               // ✅ LOGIC: Check for valid thumbnail
               let thumbnail = course.thumbnail?.url || course.thumbnail;
               if (thumbnail && thumbnail.includes("via.placeholder.com")) thumbnail = null;

               return (
                <CourseCard 
                  key={course._id} 
                  course={{
                    ...course,
                    instructor: course.instructorId?.name || "Instructor",
                    id: course._id,
                    thumbnail: thumbnail, // Pass null if placeholder
                    enrolled: enrolledCourses.has(course._id)
                  }} 
                  // ✅ Pass the gradient here
                  fallbackGradient={THEME_GRADIENTS[index % THEME_GRADIENTS.length]}
                  onQuickView={(course) => {
                    setSelectedCourse(course);
                    setIsDrawerOpen(true);
                  }}
                />
               )
            })}

            <CourseDrawer 
              course={selectedCourse}
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              onEnroll={handleEnroll}
              loading={enrolling}
              enrolled={enrolledCourses.has(selectedCourse?._id)}
            />

            {!loading && filteredCourses.length === 0 && (
              <div className="col-span-full text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No courses found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;