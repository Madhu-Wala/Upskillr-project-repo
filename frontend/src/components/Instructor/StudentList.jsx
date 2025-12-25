import { Search, Mail, MoreVertical, Filter } from 'lucide-react';

const StudentList = () => {
  const students = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", course: "Web Dev Bootcamp", progress: 75, date: "Oct 24, 2023", status: "Active" },
    { id: 2, name: "Mark Smith", email: "mark@example.com", course: "UI/UX Masterclass", progress: 30, date: "Oct 22, 2023", status: "Inactive" },
    { id: 3, name: "Sarah Lee", email: "sarah@example.com", course: "Python for Data Science", progress: 100, date: "Oct 18, 2023", status: "Completed" },
    { id: 4, name: "John Doe", email: "john@example.com", course: "Web Dev Bootcamp", progress: 12, date: "Oct 15, 2023", status: "Active" },
    { id: 5, name: "Emma Wilson", email: "emma@design.com", course: "UI/UX Masterclass", progress: 0, date: "Today", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Enrolled Students</h1>
           <p className="text-gray-500 text-sm mt-1">Manage your {students.length} students and track their progress.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">
             <Filter size={16} /> Filter
           </button>
           <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200">
             Export CSV
           </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
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
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Enrolled</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 flex items-center justify-center font-bold text-xs border border-white shadow-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 group-hover:text-indigo-500 transition-colors"><Mail size={10} /> {student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{student.course}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${student.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`} style={{ width: `${student.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-500 w-8">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">{student.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${
                    student.status === 'Active' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    student.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    'bg-gray-50 text-gray-500 border-gray-100'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;