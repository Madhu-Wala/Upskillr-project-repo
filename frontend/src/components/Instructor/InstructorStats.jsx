import React, { useEffect, useState } from 'react';
import { Users, Star, BookOpen, FileVideo, TrendingUp, Loader } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import API from '../../api/axios';

const InstructorStats = () => {
  const [statsData, setStatsData] = useState({
    totalStudents: 0,
    averageRating: 0,
    activeCourses: 0,
    totalLessons: 0
  });
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Parallel fetch for speed
        const [coursesRes, reviewsRes] = await Promise.allSettled([
          API.get('/api/instructor/courses'),
          API.get('/api/instructor/reviews')
        ]);

        let courseCount = 0;
        let lessonCount = 0;
        let studentCount = 0;
        let chartData = [];

        // 1. Process Courses Data
        if (coursesRes.status === 'fulfilled') {
          const allCourses = coursesRes.value.data;
          
          // ✅ FIX: Strict Filter for Published Courses (Case-Insensitive)
          // This ensures "Draft" or "Archived" courses are ignored in stats
          const publishedCourses = allCourses.filter(c => c.status?.toLowerCase() === 'published');
          
          courseCount = publishedCourses.length;
          
          // Loop through ONLY published courses
          publishedCourses.forEach(course => {
            // Count Lessons
            if (course.lessonsCount !== undefined) {
              lessonCount += course.lessonsCount;
            } else if (Array.isArray(course.lessons)) {
              lessonCount += course.lessons.length;
            }

            // Count Students
            const currentEnrolled = course.enrollmentsCount || (Array.isArray(course.students) ? course.students.length : 0);
            studentCount += currentEnrolled;

            // Prepare Graph Data
            chartData.push({
              name: course.title.length > 15 ? course.title.substring(0, 15) + '...' : course.title, // Truncate long titles
              students: currentEnrolled,
              lessons: course.lessonsCount || 0
            });
          });
        }

        // 2. Process Reviews Data
        let avgRating = 0;
        if (reviewsRes.status === 'fulfilled') {
          const reviews = reviewsRes.value.data;
          if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
            avgRating = (totalRating / reviews.length).toFixed(1);
          }
        }

        // 3. Update State
        setStatsData({
          activeCourses: courseCount, 
          totalLessons: lessonCount,
          totalStudents: studentCount,
          averageRating: avgRating
        });

        setGraphData(chartData);

      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { 
      label: "Total Students", 
      value: statsData.totalStudents, 
      icon: Users, 
      color: "bg-blue-100 text-blue-600", 
      trend: "Enrolled" 
    },
    { 
      label: "Average Rating", 
      value: statsData.averageRating, 
      icon: Star, 
      color: "bg-amber-100 text-amber-600", 
      trend: "From Reviews" 
    },
    { 
      label: "Active Courses", 
      value: statsData.activeCourses, 
      icon: BookOpen, 
      color: "bg-indigo-100 text-indigo-600", 
      trend: "Published" 
    },
    { 
      label: "Total Lessons", 
      value: statsData.totalLessons, 
      icon: FileVideo, 
      color: "bg-purple-100 text-purple-600", 
      trend: "Created" 
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's how your courses are performing today.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full uppercase tracking-wider">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
      
      {/* Chart Section */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Student Enrollment per Course</h3>
            <p className="text-sm text-gray-500">Performance overview across all your <strong>published</strong> courses</p>
          </div>
        </div>

        {graphData.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="students" radius={[6, 6, 0, 0]} barSize={40}>
                  {graphData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#818cf8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[200px] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
            <p>No published courses with enrollment data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorStats;