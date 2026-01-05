
import { GraduationCap, Star, Clock, BarChart, CheckCircle, PlayCircle, BookOpen } from "lucide-react";

const CourseCard = ({ image, category, title, description, lessons, level, rating }) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100 group">
    <div className="h-48 overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">
        {category}
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
          <Star size={16} fill="currentColor" />
          <span>{rating}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm mb-6 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-6">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          {lessons}
        </div>
        <div className="flex items-center gap-1">
          <BarChart size={14} />
          {level}
        </div>
      </div>
      <button className="w-full py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
        Enroll Now
      </button>
    </div>
  </div>
);


function CourseSection(){
    return  <section id="courses" className="py-24 bg-white/30 backdrop-blur-3xl relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs uppercase tracking-wider">Popular Courses</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-4">Start Learning Today</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Choose from our curated collection of courses designed by industry experts to help you level up your skills.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CourseCard 
                image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
                category="Development"
                title="Web Development Fundamentals"
                description="Master HTML, CSS, and JavaScript with hands-on projects and real-world examples."
                lessons="8 weeks"
                level="Beginner"
                rating="4.8"
              />
              <CourseCard 
                image="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80"
                category="Design"
                title="UI/UX Design Mastery"
                description="Learn to create stunning user interfaces and exceptional user experiences from scratch."
                lessons="6 weeks"
                level="Intermediate"
                rating="4.9"
              />
              <CourseCard 
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                category="Data Science"
                title="Data Analytics Essentials"
                description="Unlock insights from data using Python, SQL, and modern analytics tools and techniques."
                lessons="10 weeks"
                level="Advanced"
                rating="4.7"
              />
            </div>
          </div>
        </section>
}
export default CourseSection;