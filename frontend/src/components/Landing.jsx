import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { GraduationCap, Star, Clock, BarChart, CheckCircle, PlayCircle, BookOpen } from "lucide-react";

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-700 relative overflow-hidden">
      
      {/* GLOW BACKGROUND (Slightly increased opacity to 0.30 for better visibility) */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.25), transparent 80%)`
        }}
      />
      
      {/* 1. NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={22} />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">UpSkillr</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="hover:text-indigo-600 transition-colors cursor-pointer">Courses</a>
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-indigo-600 transition-colors cursor-pointer">Features</a>
            <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="hover:text-indigo-600 transition-colors cursor-pointer">Testimonials</a>
            <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-indigo-600 transition-colors cursor-pointer">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Learn at your own pace
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              Master New Skills <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Anytime, Anywhere
              </span>
            </h1>
            
            <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
              Transform your career with bite-sized lessons, real-time progress tracking, and personalized learning paths designed for busy professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all text-center">
                Get Started Free
              </Link>
              
              <button 
                onClick={(e) => scrollToSection(e, 'courses')}
                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 font-bold rounded-xl hover:border-indigo-100 hover:text-indigo-600 hover:-translate-y-1 transition-all text-center"
              >
                Explore Courses
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm font-medium text-gray-500">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="User" />
              </div>
              <div className="flex flex-col">
                <div className="flex text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <span>10k+ Active Learners</span>
              </div>
            </div>
          </div>

          {/* Right: Abstract Dashboard Visual */}
          <div className="relative hidden lg:block">
            <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">UI/UX Design</h3>
                    <p className="text-xs text-gray-500">Current Course</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-indigo-600">78%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
                <div className="bg-indigo-600 w-[78%] h-full rounded-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-indigo-50 p-4 rounded-2xl text-center">
                  <span className="block text-xl font-bold text-indigo-700">24</span>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase">Lessons</span>
                </div>
                <div className="bg-purple-50 p-4 rounded-2xl text-center">
                  <span className="block text-xl font-bold text-purple-700">8</span>
                  <span className="text-[10px] text-purple-400 font-bold uppercase">To Go</span>
                </div>
                <div className="bg-pink-50 p-4 rounded-2xl text-center">
                  <span className="block text-xl font-bold text-pink-700">12h</span>
                  <span className="text-[10px] text-pink-400 font-bold uppercase">Time Spent</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
              <CheckCircle className="text-green-500" size={32} />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
               <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                 <PlayCircle size={20} />
               </div>
               <div>
                 <p className="text-xs text-gray-400 font-bold">NEXT LESSON</p>
                 <p className="font-bold text-gray-800 text-sm">Wireframing Basics</p>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. POPULAR COURSES SECTION */}
      {/* 👇 CHANGED: Removed 'bg-gray-50' and added 'bg-white/30 backdrop-blur-3xl' */}
      <section id="courses" className="py-24 bg-white/30 backdrop-blur-3xl relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs uppercase tracking-wider">Popular Courses</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-4">Start Learning Today</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Choose from our curated collection of courses designed by industry experts to help you level up your skills.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CourseCard 
              image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
              category="Development"
              title="Web Development Fundamentals"
              description="Master HTML, CSS, and JavaScript with hands-on projects and real-world examples."
              lessons="8 weeks"
              level="Beginner"
              rating="4.8"
            />
            <CourseCard 
              image="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80"
              category="Design"
              title="UI/UX Design Mastery"
              description="Learn to create stunning user interfaces and exceptional user experiences from scratch."
              lessons="6 weeks"
              level="Intermediate"
              rating="4.9"
            />
            <CourseCard 
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
              category="Data Science"
              title="Data Analytics Essentials"
              description="Unlock insights from data using Python, SQL, and modern analytics tools and techniques."
              lessons="10 weeks"
              level="Advanced"
              rating="4.7"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const CourseCard = ({ image, category, title, description, lessons, level, rating }) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100 group">
    <div className="h-48 overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">
        {category}
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
          <Star size={16} fill="currentColor" />
          <span>{rating}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm mb-6 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-6">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          {lessons}
        </div>
        <div className="flex items-center gap-1">
          <BarChart size={14} />
          {level}
        </div>
      </div>
      <button className="w-full py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
        Enroll Now
      </button>
    </div>
  </div>
);

export default Landing;