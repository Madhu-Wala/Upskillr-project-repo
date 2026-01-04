import React, { useState } from 'react';
import { 
  Search, Bell, BookOpen, LogOut, Filter, 
  ChevronDown, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';

const THEME_GRADIENTS = [
  "from-indigo-500 to-purple-500",
  "from-fuchsia-500 to-pink-500",
  "from-rose-500 to-orange-500",
  "from-emerald-400 to-teal-600",
  "from-sky-400 to-blue-600"
];

function Browse() {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const navigate = useNavigate();

  const categories = ['All Categories', 'Development', 'Design', 'Business', 'Marketing', 'Data Science'];

  const courseData = [
    { id: 1, title: "Complete React Development Bootcamp", instructor: "Sarah Johnson", rating: 4.8, students: 2341,  thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop" },
    { id: 2, title: "UI/UX Design Masterclass", instructor: "Michael Chen", rating: 4.9, students: 1892, thumbnail: null }, // Falls back to gradient
    { id: 3, title: "Data Science with Python", instructor: "Dr. Emma Wilson", rating: 4.7, students: 3156, thumbnail: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=400&auto=format&fit=crop" },
    { id: 4, title: "Modern Web Security", instructor: "Mark Anderson", rating: 4.6, students: 987, thumbnail: null }, // Falls back to gradient
    { id: 5, title: "Digital Marketing Strategy", instructor: "Alex Rodriguez", rating: 4.6, students: 1567, thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Discover Courses</h1>
          <p className="text-gray-400 font-medium mt-2 text-lg">Enhance your skills with our extensive library</p>
        </header>

        {/* Categories and Filters Bar */}
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

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
              Sort by: Popular <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {courseData.map((course, index) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              fallbackGradient={THEME_GRADIENTS[index % THEME_GRADIENTS.length]}
            />
          ))}
        </div>

        
      </div>
    </div>
  );
}

export default Browse;