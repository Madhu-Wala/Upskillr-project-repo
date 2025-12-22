import {BookOpen} from 'lucide-react';

const EmptyState = ({ type }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white/50 backdrop-blur-sm rounded-[2.5rem] border-2 border-dashed border-gray-200">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <BookOpen className="w-10 h-10 text-gray-400" />
    </div>
    <h3 className="text-xl font-bold text-gray-800">No {type} courses yet</h3>
    <p className="text-gray-500 mt-2 max-w-xs">
      {type === 'ongoing' 
        ? "Explore our library and start learning something new today!" 
        : "Complete your first course to earn certificates and badges."}
    </p>
    <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
      Browse Courses
    </button>
  </div>
);
export default EmptyState;