import { Link } from "react-router-dom";
import { GraduationCap, Star, Clock, BarChart, CheckCircle, PlayCircle, BookOpen } from "lucide-react";

function Navbar(){
    const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
    return <>
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={22} />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">UpSkillr</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-md font-medium text-gray-600">
            <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="hover:text-indigo-600 transition-colors cursor-pointer">Courses</a>
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-indigo-600 transition-colors cursor-pointer">Features</a>
            <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="hover:text-indigo-600 transition-colors cursor-pointer">Testimonials</a>
            
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
    </>
}
export default Navbar;