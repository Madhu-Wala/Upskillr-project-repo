import React from 'react';
import { Star, Layout } from 'lucide-react';
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const RecommendationCard = ({ course, gradient }) => {
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      await API.post(`/api/enrollments/${course._id}`);
      navigate("/Learner/my-courses");
    } catch (err) {
      console.error("Enrollment failed", err);
      alert("Failed to enroll");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all shrink-0 w-72">
      <div className={`h-32 bg-gradient-to-br ${gradient} p-6 flex items-center justify-center`}>
        <Layout className="text-white w-8 h-8 opacity-50" />
      </div>

      <div className="p-5">
        <div className="flex justify-between mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 uppercase">
            {course.level}
          </span>
          <span className="text-[10px] font-bold text-gray-400">
            {course.duration}
          </span>
        </div>

        <h4 className="font-bold text-gray-800 text-sm mb-4">
          {course.title}
        </h4>

        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-gray-800">
              {course.rating}
            </span>
          </div>

          <button
            onClick={handleEnroll}
            className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
