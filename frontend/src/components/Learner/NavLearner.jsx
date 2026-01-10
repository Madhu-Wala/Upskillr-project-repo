import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Bell, LogOut, Search, Menu, X } from 'lucide-react';

function NavLearner() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleSignOut() {
    // Add sign-out logic here
    navigate('/');
  }

  // Matching the cleaner UpSkillr styling
  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 text-sm py-2 block md:py-1 ${
      isActive 
        ? "text-indigo-600 font-bold" 
        : "text-gray-500 font-medium hover:text-indigo-600"
    }`;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* LEFT SIDE: Logo & Desktop Links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/Learner')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">UpSkillr</span>
          </div>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex gap-6">
            <NavLink to="/Learner" end className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/Learner/my-courses" className={navLinkClass}>My Courses</NavLink>
            <NavLink to="/Learner/browse-courses" className={navLinkClass}>Browse</NavLink>
          </div>
        </div>

        {/* RIGHT SIDE: Search, Icons, Profile */}
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

          {/* Icons Group */}
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer group">
              <Bell className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            </div>

            <img 
              src="https://i.pravatar.cc/150?u=sarah" 
              alt="profile" 
              className="w-8 h-8 rounded-full border border-gray-200 shadow-sm hover:ring-2 hover:ring-indigo-100 transition-all cursor-pointer" 
            />

            {/* Desktop Sign Out */}
            <button 
              onClick={handleSignOut}
              className="hidden md:flex items-center gap-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition-all font-bold text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div 
        className={`
          md:hidden absolute w-full left-0 z-40 bg-white border-t border-gray-100 shadow-xl rounded-b-[2rem] px-6 flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out origin-top
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
          <NavLink to="/Learner" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/Learner/my-courses" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>My Courses</NavLink>
          <NavLink to="/Learner/browse-courses" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Browse</NavLink>
        </div>

        <div className="h-px bg-gray-100"></div>

        {/* Mobile Sign Out */}
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 text-rose-500 font-bold py-2 hover:bg-rose-50 rounded-xl px-2 transition-colors -ml-2"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
}

export default NavLearner;