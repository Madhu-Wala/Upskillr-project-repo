import { NavLink } from "react-router-dom";
import { BookOpen, Bell, LogOut, Search,ChevronLeft } from 'lucide-react';
function NavLearner(){

    function handleSignOut(){
    // Add sign-out logic here
    nav('/');
  }

     const navLinkClass = ({ isActive }) =>
  `relative transition-all duration-300 text-sm py-1 ${
    isActive 
      ? "text-[#5715f1] font-bold" 
      : "text-gray-500 font-medium hover:text-[#5715f1]"
  }`;

    return <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-gray-900">UpSkillr</span>
          </div>
          <div className="hidden md:flex gap-6">
            
            <NavLink to="/Learner" end className={navLinkClass} >Dashboard</NavLink>
            <NavLink to="/Learner/my-courses" className={navLinkClass} >My Courses</NavLink>
            <NavLink to="/Learner/browse-courses" className={navLinkClass} >Browse</NavLink>
          </div>

        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center bg-gray-100 rounded-xl px-3 py-2 w-64 group focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search courses..." className="bg-transparent border-none outline-none text-xs ml-2 w-full text-gray-600" />
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
          </div>
          <img src="https://i.pravatar.cc/150?u=sarah" alt="profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
          <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-semibold text-sm"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
        </div>
      </nav>
    
}
export default NavLearner;