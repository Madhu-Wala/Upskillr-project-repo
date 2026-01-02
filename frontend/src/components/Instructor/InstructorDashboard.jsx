import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, GraduationCap, Search, LogOut } from "lucide-react";

const InstructorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Sign Out Logic
  const handleSignOut = () => {
    // In a real app, clear tokens here
    navigate("/"); // Redirect to Landing Page
  };

  // Helper to determine if a link is active
  const getLinkClass = (path, exact = false) => {
    const isActive = exact 
      ? location.pathname === path 
      : location.pathname.includes(path);
      
    return isActive 
      ? "text-indigo-600 font-bold" 
      : "text-gray-500 hover:text-gray-900 font-medium";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LEFT SIDE: Logo & Links */}
          <div className="flex items-center gap-8">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-xl text-gray-900">UpSkillr</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/Instructor" className={getLinkClass("/Instructor", true)}>Dashboard</Link>
              <Link to="/Instructor/my-courses" className={getLinkClass("my-courses")}>Courses</Link>
              {/* ❌ REMOVED: Messages Link */}
              <Link to="/Instructor/students" className={getLinkClass("students")}>Students</Link>
              {/* ❌ REMOVED: Earnings Link */}
              <Link to="/Instructor/reviews" className={getLinkClass("reviews")}>Reviews</Link>
            </div>
          </div>

          {/* RIGHT SIDE: Search, Icons, Profile & Sign Out */}
          <div className="flex items-center gap-4">
            
            {/* 1. SEARCH BAR */}
            <div className="hidden lg:block relative mr-2">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
               <input 
                 type="text" 
                 placeholder="Search courses..." 
                 className="bg-gray-50 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 w-48 transition-all" 
               />
            </div>

            {/* Separator Line */}
            <div className="h-6 w-px bg-gray-200 hidden lg:block mx-2"></div>

            {/* Notification Bell */}
            <Link to="/Instructor/notifications" className="relative text-gray-400 hover:text-gray-600 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </Link>
            
            {/* Profile Picture */}
            <Link to="/Instructor/profile">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-gray-200 hover:ring-2 hover:ring-indigo-100 transition-all object-cover"
              />
            </Link>

            {/* 2. SIGN OUT BUTTON */}
            <button 
              onClick={handleSignOut}
              className="hidden lg:flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium ml-2"
            >
               <LogOut size={18} />
               <span>Sign Out</span>
            </button>

          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorDashboard;