    import { UploadCloud, CheckCircle, Image as ImageIcon } from 'lucide-react';

const Step2Thumbnail = ({ onNext, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Course Thumbnail</h2>
        <p className="text-gray-500 mb-8">Add an eye-catching thumbnail to attract students.</p>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <UploadCloud size={32} />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Drop your thumbnail here</h3>
          <p className="text-gray-500 text-sm mb-6">or click to browse from your computer</p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">Browse Files</button>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">Recommended size: 1280x720 pixels (16:9 ratio). Max file size: 5MB.</p>

        {/* Tips Box */}
        <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-amber-500">💡</span> Thumbnail Tips
          </h3>
          <div className="space-y-3">
            {["Use high-quality, clear images", "Include text overlay with course title", "Use contrasting colors", "Avoid cluttered designs"].map((tip, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-emerald-500" /> {tip}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-8">
          <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
          <button onClick={onNext} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200">Continue →</button>
        </div>
      </div>

      {/* Example Thumbnails */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
         <h4 className="font-bold text-gray-900 mb-4">Example Thumbnails</h4>
         <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">Code Master</div>
            <div className="h-24 bg-cover bg-center rounded-lg relative" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300)'}}>
                <span className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-[10px]">Marketing</span>
            </div>
            <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400"><ImageIcon /></div>
         </div>
      </div>
    </div>
  );
};
export default Step2Thumbnail;