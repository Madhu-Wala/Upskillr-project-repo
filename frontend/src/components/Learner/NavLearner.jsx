import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, X, User } from 'lucide-react'; 
// 1. Import your logo
import logo from '../../assets/logo.png'; 

function NavLearner() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleSignOut() {
    localStorage.clear();
    navigate('/login');
  }

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
            
            {/* 2. REPLACED LOGO HERE */}
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src={logo} 
                alt="Upskillr Logo" 
                className="w-full h-full object-contain rounded-lg" 
              />
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

        {/* RIGHT SIDE: Icons & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Icons Group */}
          <div className="flex items-center gap-4">
            
            {/* Default Profile Icon */}
            <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100 shadow-sm cursor-pointer hover:ring-2 hover:ring-indigo-100 transition-all">
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