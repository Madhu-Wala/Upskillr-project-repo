import { Outlet, Link, useLocation } from "react-router-dom";
import { Bell, GraduationCap } from "lucide-react";

const InstructorDashboard = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path) ? "text-indigo-600 font-semibold" : "text-gray-500 hover:text-gray-900";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Links */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-xl text-gray-900">UpSkillr</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm">
              <Link to="/Instructor" className={isActive("/Instructor")}>Dashboard</Link>
              <Link to="/Instructor/my-courses" className="text-indigo-600 font-semibold">Courses</Link>
              <a href="#" className="text-gray-500 hover:text-gray-900">Analytics</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Students</a>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-gray-600">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Profile" 
              className="w-8 h-8 rounded-full border border-gray-200"
            />
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorDashboard;