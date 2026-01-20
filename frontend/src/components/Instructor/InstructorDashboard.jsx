import { useState } from "react"; 
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, X, User } from "lucide-react"; 
import logo from '../../assets/logo.png'; 

const InstructorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const handleSignOut = () => {
    navigate("/");
  };

  const getLinkClass = (path, exact = false) => {
    const isActive = exact 
      ? location.pathname === path 
      : location.pathname.includes(path);
      
    return isActive 
      ? "text-indigo-600 font-bold block py-2" 
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
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Upskillr Logo" 
                  className="w-full h-full object-contain rounded-lg" 
                />
              </div>
              <span className="font-bold text-xl text-gray-900">UpSkillr</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/Instructor" className={getLinkClass("/Instructor", true)}>Dashboard</Link>
              <Link to="/Instructor/my-courses" className={getLinkClass("my-courses")}>Courses</Link>
              <Link to="/Instructor/students" className={getLinkClass("students")}>Students</Link>
              <Link to="/Instructor/reviews" className={getLinkClass("reviews")}>Reviews</Link>
            </div>
          </div>

          {/* RIGHT SIDE: Profile & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* 2. UPDATED: Profile Icon (Disconnected from Link) */}
            {/* The Link wrapper has been removed, making this just a static icon */}
            <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100 shadow-sm">
              <User className="w-4 h-4 text-indigo-600" />
            </div>

            {/* Desktop Sign Out */}
            <button 
              onClick={handleSignOut}
              className="hidden md:flex items-center gap-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition-all font-bold text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

            {/* MOBILE MENU BUTTON */}
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <div 
          className={`
            md:hidden absolute w-full left-0 z-40 bg-white border-t border-gray-100 shadow-xl rounded-b-3xl px-6 flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out origin-top
            ${isMobileMenuOpen 
              ? "max-h-96 opacity-100 py-6 translate-y-0" 
              : "max-h-0 opacity-0 py-0 -translate-y-2 pointer-events-none"}
          `}
        >
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