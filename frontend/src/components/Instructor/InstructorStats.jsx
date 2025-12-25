import { DollarSign, Users, Star, BookOpen, TrendingUp, ArrowUpRight } from 'lucide-react';

const InstructorStats = () => {
  const stats = [
    { label: "Total Revenue", value: "$12,450", icon: DollarSign, color: "bg-emerald-100 text-emerald-600", trend: "+12%" },
    { label: "Total Students", value: "842", icon: Users, color: "bg-blue-100 text-blue-600", trend: "+5%" },
    { label: "Average Rating", value: "4.8", icon: Star, color: "bg-amber-100 text-amber-600", trend: "+0.2" },
    { label: "Active Courses", value: "6", icon: BookOpen, color: "bg-indigo-100 text-indigo-600", trend: "0" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's how your courses are performing today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.trend} <TrendingUp size={12} className="ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
      
      {/* Placeholder for charts */}
      <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center text-gray-400">
        <p>Analytics Graphs will go here</p>
      </div>
    </div>
  );
};

export default InstructorStats;