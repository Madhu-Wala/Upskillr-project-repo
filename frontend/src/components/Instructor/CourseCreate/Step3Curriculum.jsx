import { PlayCircle, FileText, Plus, Edit2, Trash2, UploadCloud } from 'lucide-react';
import MarkdownEditor from './MarkdownEditor';
import { useState } from 'react';
const Step3Curriculum = ({ onNext, onBack }) => {

  const [lessonContent, setLessonContent] = useState("");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Existing Lessons List */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between group hover:border-indigo-200 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <PlayCircle size={20} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Introduction to Web Development</h4>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              <span>📹 12:45 min</span>
              <span>📎 2 Resources</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">Completed</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 hover:bg-gray-100 rounded text-gray-500"><Edit2 size={16}/></button>
          <button className="p-2 hover:bg-red-50 hover:text-red-500 rounded text-gray-500"><Trash2 size={16}/></button>
        </div>
      </div>

      {/* Add New Lesson Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-2 mb-6 text-indigo-600 font-bold">
            <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center"><Plus size={14} /></div>
            Add New Lesson
        </div>

        <div className="space-y-6">
            <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Lesson Title</label>
                <input type="text" placeholder="Enter lesson title..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" />
            </div>

            <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Video Upload</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3"><UploadCloud size={20} /></div>
                    <p className="text-sm text-gray-600 font-medium mb-2">Drop your video here, or browse</p>
                    <button className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg">Browse Files</button>
                </div>
            </div>

            <div>
                 <label className="text-sm font-bold text-gray-700 block mb-2">Lesson Summary</label>
                 <textarea rows="3" placeholder="Brief summary..." className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none"></textarea>
            {/* NEW MARKDOWN EDITOR (Replacing the old textarea) */}
      <div className="py-4">
        <MarkdownEditor 
          value={lessonContent} 
          onChange={setLessonContent} 
        />
      </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-50 rounded-lg">Cancel</button>
                <button className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"> + Add Lesson</button>
            </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8">
        <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
        <button onClick={onNext} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200">Continue →</button>
      </div>
    </div>
  );
};
export default Step3Curriculum;