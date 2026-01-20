import React, { useEffect, useState } from 'react';
import { Search, Mail, Loader, Download, User } from 'lucide-react';
import API from '../../api/axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch Real Data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await API.get('/api/instructor/courses');
        const courses = response.data;

        // Flatten the data
        const allStudents = courses.flatMap(course => {
          // Priority 1: Use actual student data if available
          if (Array.isArray(course.students) && course.students.length > 0) {
            return course.students.map(student => ({
              // ✅ FIX: Combine Course ID + Student ID to ensure uniqueness across different courses
              id: `${course._id}-${student._id}`, 
              name: student.name || "Unknown Student",
              email: student.email || "No email",
              course: course.title || "Untitled Course",
              date: student.enrolledAt ? new Date(student.enrolledAt).toLocaleDateString() : "Recently",
            }));
          } 
          
          // Priority 2: Fallback ONLY if student data is missing but count > 0
          else if (course.enrollmentsCount > 0) {
            return Array.from({ length: course.enrollmentsCount }).map((_, i) => ({
              id: `${course._id}-placeholder-${i}`,
              name: `Enrolled Student ${i + 1}`, 
              email: "details@hidden.com",       
              course: course.title || "Untitled Course",
              date: "Recently",
              isPlaceholder: true 
            }));
          }

          // No students found
          return [];
        });

        setStudents(allStudents);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // 2. Filter Logic (Safe & Case-insensitive)
  const filteredStudents = students.filter(student => {
    const query = searchQuery.toLowerCase();
    const name = (student.name || "").toLowerCase();
    const email = (student.email || "").toLowerCase();
    const course = (student.course || "").toLowerCase();

    return name.includes(query) || email.includes(query) || course.includes(query);
  });

  // 3. Export to CSV
  const handleExportCSV = () => {
    const headers = ["Student Name,Email,Course,Enrolled Date"];
    const rows = filteredStudents.map(s => 
      `"${s.name}","${s.email}","${s.course}","${s.date}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Enrolled Students</h1>
           <p className="text-gray-500 text-sm mt-1">Manage your {students.length} students.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={handleExportCSV}
             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors"
           >
             <Download size={16} /> Export CSV
           </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, or course..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent text-sm focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Enrolled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border border-white shadow-sm ${student.isPlaceholder ? 'bg-gray-100 text-gray-400' : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600'}`}>
                        {student.isPlaceholder ? <User size={14} /> : student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${student.isPlaceholder ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 group-hover:text-indigo-500 transition-colors">
                          <Mail size={10} /> {student.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{student.course}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{student.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <User size={48} className="mb-2 text-gray-200" />
                    <p className="font-medium text-gray-500">No students found</p>
                    <p className="text-sm mt-1">
                      {searchQuery ? "Try adjusting your search terms." : "Once students enroll in your courses, they will appear here."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;