import { Loader2,RefreshCw,Trash2,X,CloudUpload, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import API from '../../../api/axios';
const Step2Thumbnail = ({ courseId,initialThumbnail,onUpdate, onNext, onBack }) => {
  const [preview,setPreview]= useState(initialThumbnail||'');
  const [loading, setLoading] = useState(false);

  // --- 1. SYNC & RELOAD PROTECTION ---
  useEffect(() => {
    // If we have an initialThumbnail from parent, use it
    console.log("Initial Thumbnail:", initialThumbnail);
    if (initialThumbnail) {
      const thumbUrl = initialThumbnail.url || initialThumbnail;
    setPreview(thumbUrl);
    } 
    // If the page reloaded and initialThumbnail is empty, fetch from DB
    else if (courseId) {
      const fetchMedia = async () => {
        try {
          const { data } = await API.get(`/api/instructor/courses/${courseId}`);
const thumb = data.data?.thumbnail || data.thumbnail;
        if (thumb) setPreview(thumb.url || thumb);        } catch (err) {
          console.error("Failed to sync thumbnail on reload");
        }
      };
      fetchMedia();
    }
  }, [initialThumbnail, courseId]);

  // --- 2. ACCIDENTAL CLOSING LOCK ---
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // If we are currently uploading, or if we have a thumbnail that hasn't been "Confirmed" by clicking Next
      if (loading || preview) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [loading, preview]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("thumbnail", file);

    setLoading(true);
    try {
      const { data } = await API.put(`/api/instructor/courses/${courseId}/thumbnail`, formData);
      // data.url is the Cloudinary URL returned from backend
      console.log("Thumbnail uploaded:", data.thumbnail);
      const newThumbnail=data.thumbnail;
      setPreview(newThumbnail.url);
      if (onUpdate) {
        onUpdate(newThumbnail); 
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert(err.response?.data?.message || "Thumbnail upload failed");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to remove the thumbnail?")) return;
    
    setLoading(true);
    try {
      await API.delete(`/api/instructor/courses/${courseId}/thumbnail`);
      setPreview("");
      if (onUpdate) {
        onUpdate(null); 
      }
    } catch (err) {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Course Thumbnail</h2>
        <p className="text-gray-500 mb-8">Add an eye-catching thumbnail to attract students.</p>

        {preview ? (
          <div className="relative group w-full aspect-video"> {/* Added 'group' and 'aspect-video' */}
            <img 
              src={preview} 
              alt="Thumbnail" 
              className="w-full h-full object-cover rounded-2xl border border-gray-200" 
            />
            
            {/* Overlay appears on hover because of 'group' class above */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-2xl">
              <label className="p-3 bg-white rounded-2xl cursor-pointer hover:scale-110 transition-transform shadow-xl">
                <RefreshCw size={20} className="text-indigo-600" />
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
              <button 
                onClick={handleDelete} 
                className="p-3 bg-white rounded-2xl hover:scale-110 transition-transform shadow-xl"
              >
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-12 bg-gray-50 hover:bg-gray-100 transition-all">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
              <CloudUpload size={40} />
            </div>
            <span className="text-sm font-bold text-gray-500">Click to upload thumbnail</span>
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        )}
        
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-[2rem]">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        )}
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
          <button onClick={() => onNext(preview)} disabled={  loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200">Continue →</button>
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