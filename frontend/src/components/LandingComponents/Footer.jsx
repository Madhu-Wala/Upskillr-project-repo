import React from 'react';
import { GraduationCap, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#111827] text-gray-400 py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-xl text-white">UpSkillr</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs font-medium">
              Empowering professionals worldwide with accessible, high-quality 
              education that fits into busy schedules.
            </p>
            <div className="flex gap-4">
              <Twitter size={18} className="hover:text-indigo-400 cursor-pointer transition-colors" />
              <Linkedin size={18} className="hover:text-indigo-400 cursor-pointer transition-colors" />
              <Facebook size={18} className="hover:text-indigo-400 cursor-pointer transition-colors" />
              <Instagram size={18} className="hover:text-indigo-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Spacer for layout on large screens */}
          <div className="hidden lg:block"></div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">
                <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')}>Courses</a>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>Features</a>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} >Testimonials</a>
              </li>
              
            </ul>
          </div>

          

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] font-bold uppercase tracking-wider">
          <p>© {currentYear} UpSkillr. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;