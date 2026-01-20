import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import

const CTASection = () => {
  const navigate = useNavigate(); // 2. Initialize

  return (
    <section className="relative py-20 md:py-30 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5a2ff3] via-[#850ce8] to-[#ac02c2] opacity-90" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center text-white z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter leading-tight">
          Ready to Transform <br className="hidden md:block" /> Your Career?
        </h2>
        
        <p className="text-white/80 font-medium text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Join 10,000+ professionals who are already upskilling with UpSkillr. 
          Start your journey today and unlock your full potential.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* 3. Add onClick handler */}
          <button 
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto px-12 py-5 bg-white text-indigo-600 font-black rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-black/20 text-lg"
          >
            Start Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;