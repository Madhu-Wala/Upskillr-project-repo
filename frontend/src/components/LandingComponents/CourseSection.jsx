import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { GraduationCap, Star, Clock, BarChart } from "lucide-react";
import API from '../../api/axios'; 

// CourseCard Component
const CourseCard = ({ image, category, title, description, lessons, level, rating }) => {
  const navigate = useNavigate(); // 2. Initialize navigate hook

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100 group h-full flex flex-col">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">
          {category || "General"}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
            <Star size={16} fill="currentColor" />
            <span>{rating || "4.5"}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
          {description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-6">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {lessons || "Flexible"}
          </div>
          <div className="flex items-center gap-1">
            <BarChart size={14} />
            {level || "All Levels"}
          </div>
        </div>
        
        {/* 3. Add onClick event to redirect to Signup */}
        <button 
          onClick={() => navigate('/signup')}
          className="w-full py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all mt-auto"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

// Main Section Component
function CourseSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get('/api/courses'); 
        const courseData = response.data.courses || response.data || [];
        setCourses(courseData.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section id="courses" className="py-24 bg-white/30 backdrop-blur-3xl relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs uppercase tracking-wider">
            Popular Courses
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
            Start Learning Today
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Choose from our curated collection of courses designed by industry experts to help you level up your skills.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center text-gray-400 py-10">Loading...</div>
          ) : courses.map((course) => (
            <CourseCard 
              key={course._id || course.id}
              image={course.thumbnail}
              category={course.category}
              title={course.title}
              description={course.description}
              lessons={course.duration}
              level={course.level}
              rating={course.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CourseSection;