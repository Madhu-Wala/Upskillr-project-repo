import { 
  Search, Filter, ChevronDown, Plus, 
  MoreVertical, Star, Users, Clock, X,
  Edit, Trash2, Eye, UploadCloud ,Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import API from '../../api/axios';

const THEME_GRADIENTS = [
  "bg-gradient-to-br from-indigo-500 to-purple-500",
  "bg-gradient-to-br from-fuchsia-500 to-pink-500",
  "bg-gradient-to-br from-rose-500 to-orange-500",
  "bg-gradient-to-br from-emerald-400 to-teal-600",
  "bg-gradient-to-br from-sky-400 to-blue-600",
  "bg-gradient-to-br from-yellow-400 to-orange-500",
  "bg-gradient-to-br from-green-400 to-lime-500",
  "bg-gradient-to-br from-pink-400 to-rose-500",
  "bg-gradient-to-br from-purple-400 to-indigo-500",
  "bg-gradient-to-br from-red-400 to-pink-500"
];

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulty");

  // --- FETCH COURSES FROM BACKEND ---
  useEffect(()=>{
    const fetchCourses = async ()=>{
      try{
        setLoading(true);
        const response=await API.get('/api/instructor/courses');
        setCourses(response.data);
        console.log("Fetched courses:", response.data);
      }catch(err){
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
      }finally{
        setLoading(false);
      }
    }
    fetchCourses();
  },[]);

  // --- FILTER LOGIC ---
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "All Status" || 
                          course.status?.toLowerCase() === selectedStatus.toLowerCase();
    
    const matchesCategory = selectedCategory === "All Categories" || 
                            course.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesDifficulty = selectedDifficulty === "All Difficulty" || 
                              course.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory && matchesDifficulty;
  });

  // Helper for Badge Colors
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()){ 
      case "published": return "bg-emerald-500 text-white";
      case "draft": return "bg-amber-400 text-white";
      default: return "bg-gray-400 text-white";
    }
  };
  // 3. LOADING & ERROR STATES
  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  if (error) return (
    <div className="p-8 text-center bg-red-50 text-red-600 rounded-2xl">
      {error}
    </div>
  );

  const handleDelete=async(courseId)=>{
    const confirmDelete=window.confirm("Are you sure you want to delete this course? This action cannot be undone.");
    if(!confirmDelete) return;
    setLoading(true);
    try {
    // 2. Hit the backend route 
    // Path: /api/instructor/courses/:courseId
    await API.delete(`/api/instructor/courses/${courseId}`);

    // 3. Update local state to remove the course from UI
    setCourses((prevCourses) => prevCourses.filter((c) => c._id !== courseId));

    // 4. Success feedback
    alert("Course successfully deleted!");
  } catch (err) {
    console.error("Delete failed:", err);
    alert(err.response?.data?.message || "Delete karne mein kuch error aaya. Please try again.");
  }finally{
    setLoading(false);
  }
  }

  return (
    <div className="space-y-8">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Courses</h1>
          <p className="text-gray-500 mt-1">Create, edit, and manage your course content</p>
        </div>
        
        {/* CREATE COURSE BUTTON (With Navigation Logic) */}
        <button 
          onClick={() => navigate('/Instructor/create-course')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all font-medium shadow-md shadow-indigo-200"
        >
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
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-sm"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative">
            <select 
            value={selectedStatus}
            onChange={(e)=>setSelectedStatus(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm font-medium py-3 pl-4 pr-10 rounded-xl focus:outline-none cursor-pointer hover:bg-gray-50">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          <div className="relative">
            <select 
            value={selectedCategory}
            onChange={(e)=>setSelectedCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm font-medium py-3 pl-4 pr-10 rounded-xl focus:outline-none cursor-pointer hover:bg-gray-50">
              <option>All Categories</option>
              
              <option>Development</option>
              <option>Marketting</option>
              <option>Programming</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Reset Button */}
            {(searchTerm || selectedStatus !== "All Status" || selectedCategory !== "All Categories" || selectedDifficulty !== "All Difficulty") && (
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatus("All Status");
                  setSelectedCategory("All Categories");
                  setSelectedDifficulty("All Difficulty");
                }}
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2 text-xs font-bold"
              >
                <X size={16} /> Clear
              </button>
            )}
        </div>
      </div>

      {/* 3. COURSE GRID */}
      {/* 3. COURSE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div key={course._id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                {course.thumbnail?.url ? (
                  <img src={course.thumbnail.url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${THEME_GRADIENTS[index % THEME_GRADIENTS.length]}`}>
                    <UploadCloud className="text-white opacity-50" size={32} />
                  </div>
                )}
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide shadow-sm ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-1">{course.title}</h3>
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                    <Star size={16} fill="currentColor" />
                    <span className="text-gray-700">{course.rating || "N/A"}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mb-5 line-clamp-2">{course.description}</p>

                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-50 pb-6">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                      <Users size={14}/> <span>{course.enrollmentsCount || 0} Students</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                      <Clock size={14}/> <span>{course.difficulty}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => navigate(`/Instructor/edit-course/${course._id}`)} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
                    <Edit size={16} /> Edit
                  </button>
                  <button onClick={() => handleDelete(course._id)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => navigate(`/Instructor/course-preview/${course._id}`)} className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">No courses match your search or filters.</p>
          </div>
        )}
      </div>

      

    </div>
  );
};

export default MyCourses;