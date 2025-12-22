import { 
  Search, Filter, ChevronDown, Plus, 
  MoreVertical, Star, Users, Clock, 
  Edit, Trash2, Eye, UploadCloud 
} from 'lucide-react';

const MyCourses = () => {
  // MOCK DATA (Matches your image exactly)
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      category: "Web Dev",
      rating: 4.8,
      students: 247,
      duration: "2 hours",
      status: "Published",
      description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      category: "Design",
      rating: 4.6,
      students: 92,
      duration: "5 hours",
      status: "Unpublished",
      description: "Master the fundamentals of user interface and user experience design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      category: "Marketing",
      rating: 4.9,
      students: 156,
      duration: "6 hours",
      status: "Published",
      description: "Learn SEO, social media marketing, and paid advertising",
      image: "https://images.unsplash.com/photo-1533750349088-cd875817407c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "Python for Data Science",
      category: "Data",
      rating: "N/A",
      students: 0,
      duration: "10 hours",
      status: "Draft",
      description: "Learn Python programming and data analysis with pandas and numpy",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title: "React Native Mobile Apps",
      category: "Mobile",
      rating: 4.7,
      students: 3,
      duration: "8 hours",
      status: "Published",
      description: "Build cross-platform mobile applications with React Native",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      title: "Blockchain Development",
      category: "Crypto",
      rating: 4.5,
      students: 56,
      duration: "2 hours",
      status: "Unpublished",
      description: "Learn blockchain technology and smart contract development",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    }
  ];

  // EXACT BADGE COLORS FROM IMAGE
  const getStatusColor = (status) => {
    switch(status) {
      case "Published": return "bg-emerald-500 text-white"; // Green badge
      case "Unpublished": return "bg-gray-400 text-white";  // Grey badge
      case "Draft": return "bg-amber-400 text-white";       // Yellow/Orange badge
      default: return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Courses</h1>
          <p className="text-gray-500 mt-1">Create, edit, and manage your course content</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all font-medium shadow-md shadow-indigo-200">
          <Plus size={20} />
          Create Course
        </button>
      </div>

      {/* 2. FILTERS & SEARCH BAR */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full pl-11 pr-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-sm"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm font-medium py-3 pl-4 pr-10 rounded-xl focus:outline-none cursor-pointer hover:bg-gray-50">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm font-medium py-3 pl-4 pr-10 rounded-xl focus:outline-none cursor-pointer hover:bg-gray-50">
              <option>All Categories</option>
              <option>Design</option>
              <option>Development</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* 3. COURSE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 group">
            
            {/* Image & Badge */}
            <div className="relative h-48 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide shadow-sm ${getStatusColor(course.status)}`}>
                {course.status}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-900 leading-tight">{course.title}</h3>
                <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                  {course.rating !== "N/A" && <Star size={16} fill="currentColor" />}
                  <span className="text-gray-700">{course.rating}</span>
                </div>
              </div>

              <p className="text-gray-500 text-xs mb-5 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center gap-6 text-xs font-medium text-gray-500 mb-6 border-b border-gray-50 pb-6">
                <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-gray-400"/>
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-gray-400"/>
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-indigo-100 shadow-lg">
                   <Edit size={16} /> Edit
                </button>
                <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
                <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Users size={18} />
                </button>
                <button className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  {course.status === 'Draft' ? <UploadCloud size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. PAGINATION */}
      <div className="flex justify-center items-center gap-2 pt-8 pb-12">
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 text-sm">‹</button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-bold shadow-md shadow-indigo-200">1</button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 text-sm font-medium">2</button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 text-sm font-medium">3</button>
        <span className="text-gray-300 px-2">...</span>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 text-sm font-medium">8</button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 text-sm">›</button>
      </div>

    </div>
  );
};

export default MyCourses;