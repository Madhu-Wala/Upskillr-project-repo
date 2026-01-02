import { useState } from "react"; // 👈 Added useState
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, GraduationCap, Search, LogOut, Menu, X } from "lucide-react"; // 👈 Added Menu & X icons

const InstructorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 👈 State for mobile menu

  const handleSignOut = () => {
    navigate("/");
  };

  // Helper to determine if a link is active
  const getLinkClass = (path, exact = false) => {
    const isActive = exact 
      ? location.pathname === path 
      : location.pathname.includes(path);
      
    return isActive 
      ? "text-indigo-600 font-bold block py-2" // Added 'block py-2' for mobile spacing
      : "text-gray-500 hover:text-gray-900 font-medium block py-2";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* LEFT SIDE: Logo & Desktop Links */}
          <div className="flex items-center gap-8">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-xl text-gray-900">UpSkillr</span>
            </div>

            {/* Desktop Navigation Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/Instructor" className={getLinkClass("/Instructor", true)}>Dashboard</Link>
              <Link to="/Instructor/my-courses" className={getLinkClass("my-courses")}>Courses</Link>
              <Link to="/Instructor/students" className={getLinkClass("students")}>Students</Link>
              <Link to="/Instructor/reviews" className={getLinkClass("reviews")}>Reviews</Link>
            </div>
          </div>

          {/* RIGHT SIDE: Icons, Profile & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Desktop Search (Hidden on Mobile) */}
            <div className="hidden lg:block relative mr-2">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
               <input 
                 type="text" 
                 placeholder="Search courses..." 
                 className="bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 w-48 transition-all" 
               />
            </div>

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

            {/* Desktop Sign Out (Hidden on Mobile) */}
            <button 
              onClick={handleSignOut}
              className="hidden lg:flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium ml-2"
            >
               <LogOut size={18} />
               <span>Sign Out</span>
            </button>

            {/* 👇 MOBILE MENU BUTTON (Visible only on Mobile) */}
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>

        {/* 👇 MOBILE DROPDOWN MENU (Smooth Animation Version) */}
        <div 
          className={`
            md:hidden absolute w-full left-0 z-40 bg-white border-t border-gray-100 shadow-xl rounded-b-3xl px-6 flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out origin-top
            ${isMobileMenuOpen 
              ? "max-h-96 opacity-100 py-6 translate-y-0" 
              : "max-h-0 opacity-0 py-0 -translate-y-2 pointer-events-none"}
          `}
        >
            
            {/* Mobile Search */}
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
               <input 
                 type="text" 
                 placeholder="Search courses..." 
                 className="w-full bg-gray-50 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100" 
               />
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-1">
              <Link to="/Instructor" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass("/Instructor", true)}>Dashboard</Link>
              <Link to="/Instructor/my-courses" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass("my-courses")}>Courses</Link>
              <Link to="/Instructor/students" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass("students")}>Students</Link>
              <Link to="/Instructor/reviews" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass("reviews")}>Reviews</Link>
            </div>

            <div className="h-px bg-gray-100"></div>

            {/* Mobile Sign Out */}
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-500 font-medium py-2 hover:bg-red-50 rounded-xl px-2 transition-colors -ml-2"
            >
               <LogOut size={18} />
               <span>Sign Out</span>
            </button>
        </div>
      </nav>

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorDashboard;