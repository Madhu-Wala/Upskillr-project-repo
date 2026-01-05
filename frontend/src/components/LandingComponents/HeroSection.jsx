import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { GraduationCap, Star, Clock, BarChart, CheckCircle, PlayCircle, BookOpen } from "lucide-react";


function HeroSection(){


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

    return    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-700 relative overflow-hidden">

    {/* GLOW BACKGROUND (Slightly increased opacity to 0.30 for better visibility) */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.15), transparent 80%)`
        }}
      />
    <header className="relative pt-16 pb-10 lg:pt-32 lg:pb-40 z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Learn at your own pace
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
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
                Get Started 
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
    </div>
}
export default HeroSection;