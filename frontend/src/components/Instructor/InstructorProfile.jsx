import { Camera, Save, User, Lock, Bell } from 'lucide-react';

const InstructorProfile = () => {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Settings Menu */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
            <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">Settings</h2>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-medium text-sm border border-indigo-100">
               <User size={18} /> Public Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium text-sm transition-colors">
               <Lock size={18} /> Account & Security
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium text-sm transition-colors">
               <Bell size={18} /> Notifications
            </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="mb-8 border-b border-gray-100 pb-6">
                   <h1 className="text-2xl font-bold text-gray-900">Public Profile</h1>
                   <p className="text-gray-500 text-sm mt-1">This information will be displayed on your course landing pages.</p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative group cursor-pointer">
                        <img 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" size={24} />
                        </div>
                    </div>
                    <div>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50">Change Photo</button>
                        <p className="text-xs text-gray-400 mt-2">Max file size: 5MB (JPG, PNG)</p>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                            <input type="text" defaultValue="John" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                            <input type="text" defaultValue="Doe" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm transition-all" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Headline</label>
                        <input type="text" defaultValue="Senior Software Engineer & Instructor" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm transition-all" />
                        <p className="text-xs text-gray-400 mt-1">Add a professional headline like "Instructor at UpSkillr" or "Architect".</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Biography</label>
                        <textarea rows="4" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm resize-none transition-all" defaultValue="I have been coding for 10 years and love teaching complex topics in a simple way..." ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                            <input type="text" placeholder="https://" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm" />
                         </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Twitter / X</label>
                            <input type="text" placeholder="@username" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm" />
                         </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-50 mt-4">
                        <button type="button" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all">
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;