import { Check, Clock, File, Save, Send } from 'lucide-react';

const Step4Publish = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      
      {/* LEFT: PREVIEW */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Course Preview</h2>
              <p className="text-gray-500 text-sm">How your course will appear to students</p>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">Draft</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden mb-6 group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" alt="Course" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
               <h3 className="text-white text-2xl font-bold mb-2">Complete Web Development Bootcamp</h3>
               <div className="flex items-center gap-4 text-white/90 text-sm">
                  <span className="flex items-center gap-1"><Clock size={14}/> 12h 30m</span>
                  <span>⭐ Beginner</span>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">What you'll learn</h4>
            <ul className="grid grid-cols-1 gap-2">
               {["Build responsive websites", "Master React.js", "Deploy to production"].map((item,i)=>(
                 <li key={i} className="flex items-center gap-2 text-gray-600 text-sm"><Check size={16} className="text-green-500"/> {item}</li>
               ))}
            </ul>
          </div>
        </div>
         <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
      </div>

      {/* RIGHT: SETTINGS */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
           <h3 className="font-bold text-gray-900 mb-4">Course Settings</h3>
           
           <div className="mb-4">
             <label className="text-sm font-bold text-gray-700 block mb-2">Pricing</label>
             <div className="flex items-center gap-4">
               <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="price" className="text-indigo-600" defaultChecked /> Free</label>
               <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="price" className="text-indigo-600" /> Paid</label>
             </div>
           </div>

           <div className="mb-4">
             <label className="text-sm font-bold text-gray-700 block mb-2">Language</label>
             <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none"><option>English</option></select>
           </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
           <div className="bg-indigo-50 p-4 rounded-xl mb-4 border border-indigo-100">
              <p className="text-xs text-indigo-800 font-medium">ℹ️ Course Review: Usually takes 24-48 hours.</p>
           </div>
           <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold mb-3 hover:bg-indigo-700 flex items-center justify-center gap-2">
              <Send size={18} /> Submit for Review
           </button>
           <button className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center justify-center gap-2">
              <Save size={18} /> Save as Draft
           </button>
        </div>
      </div>
    </div>
  );
};
export default Step4Publish;