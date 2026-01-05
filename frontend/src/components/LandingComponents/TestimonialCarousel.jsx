import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer at Google",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    text: "UpSkillr transformed my career! The bite-sized lessons fit perfectly into my schedule, and I landed my dream job as a frontend developer within 3 months."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "UX Designer at Airbnb",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    text: "The real-time progress tracking kept me motivated throughout my learning journey. The UI/UX course was exactly what I needed to transition into design."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Data Analyst at Meta",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    text: "Best investment in my career! The courses are practical, engaging, and taught by industry experts. I've already recommended UpSkillr to all my colleagues."
  }
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for animation offsets
  useEffect(() => {
    const checkRes = () => setIsMobile(window.innerWidth < 768);
    checkRes();
    window.addEventListener('resize', checkRes);
    return () => window.removeEventListener('resize', checkRes);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [index, isHovered]);

  const handleNext = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const { prev, curr, next } = {
    prev: (index - 1 + testimonials.length) % testimonials.length,
    curr: index,
    next: (index + 1) % testimonials.length
  };

  return (
    <section id='testimonials' className="bg-white py-12 md:py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-20">
        <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
          Success Stories
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">What Our Learners Say</h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto text-sm md:text-base px-4">
          Join thousands of professionals who transformed their careers with UpSkillr
        </p>
      </div>

      <div 
        className="relative flex items-center justify-center h-[400px] md:h-[500px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="popLayout">
          {[prev, curr, next].map((itemIndex, i) => {
            const isCenter = i === 1;
            const isLeft = i === 0;
            
            return (
              <motion.div
                key={testimonials[itemIndex].id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isCenter ? 1 : 0.4,
                  scale: isCenter ? (isMobile ? 1 : 1.1) : 0.85,
                  x: isCenter ? 0 : isLeft ? (isMobile ? -300 : -450) : (isMobile ? 300 : 450),
                  zIndex: isCenter ? 20 : 10,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                whileHover={isCenter ? { scale: isMobile ? 1.02 : 1.15, y: -10 } : {}}
                className={`absolute w-[90%] md:w-full max-w-[340px] md:max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl cursor-pointer ${
                  !isCenter && "pointer-events-none"
                }`}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={isMobile ? 14 : 18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 font-medium leading-relaxed mb-8 italic text-sm md:text-base">
                  "{testimonials[itemIndex].text}"
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={testimonials[itemIndex].image} 
                    alt={testimonials[itemIndex].name} 
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover ring-4 ring-indigo-50"
                  />
                  <div className="text-left">
                    <h4 className="font-black text-slate-900 text-sm md:text-lg leading-tight">{testimonials[itemIndex].name}</h4>
                    <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">{testimonials[itemIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute w-full max-w-6xl flex justify-between px-2 md:px-4 z-30">
          <button 
            onClick={handlePrev}
            className="p-3 md:p-5 rounded-2xl bg-white border border-gray-100 text-slate-400 hover:text-indigo-600 hover:shadow-xl transition-all shadow-md"
          >
            <ChevronLeft size={isMobile ? 20 : 28} />
          </button>
          <button 
            onClick={handleNext}
            className="p-3 md:p-5 rounded-2xl bg-white border border-gray-100 text-slate-400 hover:text-indigo-600 hover:shadow-xl transition-all shadow-md"
          >
            <ChevronRight size={isMobile ? 20 : 28} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;