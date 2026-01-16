import React from 'react';
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, Award, FileText, ArrowRight 
} from 'lucide-react';

const CompletedCard = ({ course }) => {
  const navigate = useNavigate();   // ✅ Must be inside the component

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{course.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <Award className="w-3 h-3" /> Completed
            </span>
            {course.completionDate && (
              <span className="text-xs text-gray-400">
                on {course.completionDate}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" /> Certificate
        </button>

        <button
          onClick={() => navigate(`/Learner/courses/${course.id}`)}   // ✅ Correct navigation
          className="flex-1 md:flex-none px-5 py-2.5 bg-slate-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 flex items-center justify-center gap-2"
        >
          Open Course <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CompletedCard;
