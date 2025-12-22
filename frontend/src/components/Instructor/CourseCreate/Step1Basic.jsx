import { ChevronDown } from 'lucide-react';

const Step1Basic = ({ onNext }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Tell us about your course</h2>
        <p className="text-gray-500 mt-1">Let's start with the basics to help students discover your course.</p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Course Title</label>
          <input type="text" placeholder="e.g., Complete Web Development Bootcamp" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Course Description</label>
          <textarea rows="4" placeholder="Describe what students will learn..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all resize-none"></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-indigo-600 outline-none">
                <option>Select a category</option>
                <option>Development</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty Level</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-indigo-600 outline-none">
                <option>Select difficulty</option>
                <option>Beginner</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button type="button" onClick={onNext} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
export default Step1Basic;