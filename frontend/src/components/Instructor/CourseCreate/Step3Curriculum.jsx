import { PlayCircle,RefreshCw, Video, CheckCircle2, FileText, Plus, Edit2, Trash2, UploadCloud, Loader2, X ,Save} from 'lucide-react';
import MarkdownEditor from './MarkdownEditor';
import { useState, useEffect } from 'react';
import API from '../../../api/axios.js';

const Step3Curriculum = ({ courseId, initialLessons,onRefresh, onNext, onBack }) => {

  const [lessons, setLessons] = useState(initialLessons || []);
  const [loading, setLoading] = useState(false);
  const [editingId,setEditingId]= useState(null);
  // State for "New Lesson" or "Edit Lesson"
  const [formData, setFormData] = useState({
    title: "",
    contentMarkdown: "",
    videoFile: null,
    pdfFiles: [] // Array for multiple PDFs
  });



  // 1. Fetch existing lessons on mount
  const fetchLessons = async () => {
    try {
      const { data } = await API.get(`/api/instructor/courses/${courseId}/lessons`);
      setLessons(data.data);
      if(onRefresh) onRefresh(); // Notify parent to refresh if needed
    } catch (err) {
      console.error("Failed to fetch lessons");
    }
  };
  useEffect(() => {
    if (initialLessons?.length > 0) setLessons(initialLessons);
    else fetchLessons();
  }, [initialLessons,courseId]);

  // --- 2. DRAFT RECOVERY (LocalStorage) ---
  useEffect(() => {
    // Save draft for "New Lesson" only
    if (!editingId && (formData.title || formData.contentMarkdown)) {
      localStorage.setItem(`draft_${courseId}`, JSON.stringify({
        title: formData.title,
        contentMarkdown: formData.contentMarkdown
      }));
    }
  }, [formData, editingId, courseId]);

  useEffect(() => {
    const saved = localStorage.getItem(`draft_${courseId}`);
    if (saved && !editingId) {
      const parsed = JSON.parse(saved);
      setFormData(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  // --- 3. ACCIDENTAL CLOSING LOCK ---
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (loading || formData.title || formData.contentMarkdown || editingId) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [loading, formData, editingId]);

  

const handleReplaceVideo = async (lessonId, file, isNewUpload = false) => {
  if (!file) return;
  const vData = new FormData();
  vData.append("video", file);

  try {
    setLoading(true);

    // 🚩 Logic: POST for new, PUT for replace
    const response = isNewUpload 
      ? await API.post(`/api/instructor/lessons/${lessonId}/video`, vData)
      : await API.put(`/api/instructor/lessons/${lessonId}/video`, vData);


    
    const updatedVideo = response.data.video || response.data.data?.video;
    
    // State update
    setLessons(prev => prev.map(l => 
      l._id === lessonId ? { ...l, video: updatedVideo } : l
    ));

    alert(isNewUpload ? "Video uploaded!" : "Video replaced!");
  } catch (err) {
    console.error("Upload Error:", err.response?.data || err);
    alert("Action failed. Ensure server limits are set to 150MB.");
  } finally {
    setLoading(false);
  }
};
// DELETE (Immediate for Editing)
const handleDeleteVideo = async (lessonId) => {
  if (!window.confirm("Remove this video?")) return;
  try {
    await API.delete(`/api/instructor/lessons/${lessonId}/video`);
    setLessons(prev => prev.map(l => 
      l._id === lessonId ? { ...l, video: null } : l
    ));
  } catch (err) {
    alert("Delete failed");
  }
};

  // Fix 1: Handle Multiple PDF Uploads
const handleMultiplePDFUpload = async (lessonId, files) => {
  const dataForm = new FormData();
  Array.from(files).forEach(file => dataForm.append("files", file));

  try {
    const { data } = await API.post(`/api/instructor/lessons/${lessonId}/pdf`, dataForm);
    // Sync the specific lesson's resources in your state
    setLessons(prev => prev.map(l => l._id === lessonId ? { ...l, resources: data.resources } : l));
  } catch (err) {
    alert("Upload failed");
  }
};
const handleReplacePDF = async (lessonId, resourceId, file) => {
  if (!file) return;
  
  const fData = new FormData();
  fData.append("file", file); // Must match uploadPDF.single("file") in route

  try {
    const { data } = await API.put(`/api/instructor/lessons/${lessonId}/pdf/${resourceId}`, fData);
    
    // Update local state: Find the lesson, then find the specific resource and swap it
    setLessons(prev => prev.map(l => {
      if (l._id === lessonId) {
        return {
          ...l,
          resources: l.resources.map(r => r._id === resourceId ? data.resource : r)
        };
      }
      return l;
    }));
    
    alert("PDF replaced!");
  } catch (err) {
    alert("Replacement failed");
  }
};

// Fix 2: Delete by ID
const handleDeleteResource = async (lessonId, resourceId) => {
  try {
    await API.delete(`/api/instructor/lessons/${lessonId}/pdf/${resourceId}`);
    setLessons(prev => prev.map(l => 
      l._id === lessonId ? { ...l, resources: l.resources.filter(r => r._id !== resourceId) } : l
    ));
  } catch (err) {
    alert("Delete failed");
  }
};

  
  const saveLesson = async (isEdit = false, lessonId = null) => {
    if (!formData.title) return alert("Title is required");
    if (formData.pdfFiles.length > 5) {
    alert("Max 5 PDFs allowed. Please remove some before saving.");
    return; // EXITS the function here. Nothing is saved.
  }
    setLoading(true);

    try {
      let currentLessonId = lessonId;

      // Step A: Text Content
      if (isEdit) {
        await API.put(`/api/instructor/lessons/${lessonId}`, {
          title: formData.title,
          contentMarkdown: formData.contentMarkdown,
        });
      } else {
        const res = await API.post(`/api/instructor/courses/${courseId}/lessons`, {
          title: formData.title,
          contentMarkdown: formData.contentMarkdown,
           // Placeholder, video upload is separate
        });
        currentLessonId =res.data?.data?._id || res.data?._id;
      }

      // Step B: Video Upload (Only if new file selected)
      // if (!isEdit && formData.videoFile) {
      //   const vData = new FormData();
      //   vData.append("video", formData.videoFile);
      //   await API.post(`/api/instructor/lessons/${currentLessonId}/video`, vData);
      // }
      if (formData.videoFile) {
        const vData = new FormData();
        vData.append("video", formData.videoFile);
        if (isEdit) {
          await API.put(`/api/instructor/lessons/${currentLessonId}/video`, vData);
        } else {
          await API.post(`/api/instructor/lessons/${currentLessonId}/video`, vData);
        }
      }
      // Step C: Multiple PDF Uploads
      if (!isEdit && formData.pdfFiles.length > 0) {
      
        const pData = new FormData();
        
        // 1. Just one loop to fill the pData object
        formData.pdfFiles.forEach(file => {
          pData.append("files", file); 
        });

        // 2. Just ONE api call to send everything at once
        await API.post(`/api/instructor/lessons/${currentLessonId}/pdf`, pData);
      }
      // SUCCESS: Clear everything and Sync
      localStorage.removeItem(`draft_${courseId}`);
      await fetchLessons();
      setEditingId(null);
      setFormData({ title: "", contentMarkdown: "", videoFile: null, pdfFiles: [] });
      alert(isEdit ? "Lesson updated!" : "Lesson added!");
    } catch (err) {

      alert("Error saving lesson");
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete Lesson
  const handleDelete = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    setLoading(true);
    try {
      await API.delete(`/api/instructor/lessons/${lessonId}`);
      setLessons((prev) => prev.filter(l => l._id !== lessonId));
      if(onRefresh) onRefresh(); // Notify parent to refresh if needed
      alert("Lesson deleted successfully");
    } catch (err) {
      alert("Delete failed");
    }finally{
      setLoading(false);
    }
  };

  const startEditing = (lesson) => {
    setEditingId(lesson._id);
    setFormData({
      title: lesson.title,
      contentMarkdown: lesson.contentMarkdown,
      videoFile: null,
      pdfFiles: []
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Existing Lessons List */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-700">Course Content ({lessons.length} Lessons)</h3>
        {lessons.map((lesson) => (
          <div key={lesson._id}>
            {editingId === lesson._id ? (
              /* --- INLINE EDIT CARD --- */
              <div className="bg-indigo-50/50 border-2 border-indigo-200 rounded-[2rem] p-8 space-y-6 animate-in fade-in slide-in-from-top-4">
                <div className="flex justify-between items-center">
                   <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Editing Mode</span>
                   <button onClick={() => {
                      setEditingId(null); 
                      // This is the key: Reset EVERYTHING so the New Lesson block starts empty
                      setFormData({ title: "", contentMarkdown: "", videoFile: null, pdfFiles: [] });
                    }}
                     className="text-gray-400 hover:text-red-500"><X size={20}/></button>
                </div>
                
                <input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-indigo-100 outline-none focus:ring-2 focus:ring-indigo-600"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Video Edit */}
                  <div className="bg-white p-4 rounded-2xl border border-indigo-100">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Lesson Video</p>
                      {lesson.video?.url && (
                        <button onClick={() => handleDeleteVideo(lesson._id)} className="text-red-400 hover:text-red-600">
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {lesson.video?.url ? (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <CheckCircle2 size={14} /> <span className="text-[10px] font-bold">Video Ready</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <Video size={14} /> <span className="text-[10px] font-bold">No Video</span>
                        </div>
                      )}
                    </div>

                    <label className="cursor-pointer bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase hover:bg-indigo-100 transition-colors block text-center">
                      {lesson.video?.url ? "Replace Video" : "Upload Video"}
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const isNew = !lesson.video?.url;
                          handleReplaceVideo(lesson._id, e.target.files[0],isNew)
                        }} 
                      />
                    </label>
                  </div>

                  {/* Multi-PDF Edit */}
                  <div className="bg-white p-4 rounded-2xl border border-indigo-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Resources ({lesson.resources?.length || 0})</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {lesson.resources?.map(res => (
                        <div key={res._id} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-[10px] font-bold">
                          <FileText size={10}/> <span>{res.name.slice(0,10)}...</span>
                          {/* REPLACE BUTTON */}
                          <label className="cursor-pointer text-indigo-500 hover:text-indigo-700 ml-1">
                            <RefreshCw size={10}/>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept=".pdf"
                              onChange={(e) => handleReplacePDF(lesson._id, res._id, e.target.files[0])} 
                            />
                          </label>

                          <button onClick={() => handleDeleteResource(lesson._id, res._id)} 
                          className="text-red-400 ml-1">
                            <X size={10}/></button>
                        </div>
                      ))}
                    </div>
                    <input type="file" 
                            multiple 
                            accept=".pdf" 
                            onChange={(e) => handleMultiplePDFUpload(lesson._id, e.target.files)} 
                            className="text-xs w-full"/>
                  </div>
                </div>

                <MarkdownEditor value={formData.contentMarkdown} onChange={(val) => setFormData({...formData, contentMarkdown: val})} />
                
                <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ title: "", contentMarkdown: "", videoFile: null, pdfFiles: [] });
                      }} 
                      className="font-bold text-gray-400"
                    >Cancel</button>                  
                    <button onClick={() => saveLesson(true, lesson._id)} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2">
                    {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Save Changes
                  </button>
                </div>
              </div>
            ) : (
              /* --- STATIC LESSON ROW --- */
              <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600"><PlayCircle size={24} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">{lesson.title}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`text-[10px] font-black uppercase ${!lesson.video?.url ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {!lesson.video?.url ? 'No Video' : 'Video Ready'}
                      </span>
                      <span className="text-[10px] font-black uppercase text-gray-400">{lesson.resources?.length || 0} PDFs</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEditing(lesson)} className="p-2 hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 rounded-lg"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(lesson._id)} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 size={18}/></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Lesson Section (Only visible when not editing) */}
      {!editingId && (
        <div className="bg-white rounded-[2rem] border-2 border-dashed border-gray-200 p-8">
           <div className="flex items-center gap-3 mb-6 text-indigo-600 font-black uppercase tracking-tighter">
              <Plus className="bg-indigo-100 rounded-lg p-1" /> Add New Lesson
           </div>
           
           <div className="space-y-6">
              <input 
                placeholder="Lesson Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-indigo-600"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl text-center border-2 border-dashed border-gray-200">
                  <Video className="mx-auto text-gray-400 mb-2" />
                  {!formData.videoFile ? (
    <input 
      type="file" 
      accept="video/*" 
      onChange={(e) => setFormData({...formData, videoFile: e.target.files[0]})} 
      className="text-xs" 
    />
  ) : (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-xl border border-indigo-100">
        <PlayCircle size={14} className="text-indigo-600" />
        <span className="text-xs font-bold text-indigo-700">{formData.videoFile.name.slice(0, 15)}...</span>
        <button 
          onClick={() => setFormData({...formData, videoFile: null})}
          className="text-red-500 hover:bg-red-100 p-1 rounded-full"
        >
          <X size={14} />
        </button>
      </div>
      <p className="text-[9px] text-gray-400 mt-1 uppercase font-black tracking-tighter">Ready to upload</p>
    </div>
  )}
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl text-center border-2 border-dashed border-gray-200">
                  <UploadCloud className="mx-auto text-gray-400 mb-2" />
                  <input 
                    type="file" 
                    multiple 
                    accept=".pdf" 
                    onChange={(e) => setFormData({
                      ...formData, 
                      pdfFiles: [...formData.pdfFiles, ...Array.from(e.target.files)] 
                    })} 
                    className="text-xs" 
                  />
                  
                  {/* LOCAL PREVIEW FOR NEW LESSON */}
                  {formData.pdfFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      {formData.pdfFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded text-[10px] font-bold shadow-sm">
                          <FileText size={10} className="text-indigo-500"/> 
                          <span>{file.name.slice(0,10)}...</span>
                          {/* This button removes the file from local state only */}
                          <button 
                            onClick={() => setFormData({
                              ...formData, 
                              pdfFiles: formData.pdfFiles.filter((_, i) => i !== idx)
                            })} 
                            className="text-red-400 hover:text-red-600"
                          >
                            <X size={10}/>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <MarkdownEditor 
              key={editingId || 'new-lesson'}
              value={formData.contentMarkdown} 
              onChange={(val) => setFormData({...formData, contentMarkdown: val})} />

              <div className="flex justify-end">
                <button 
                  disabled={loading}
                  type="button"
                  onClick={() => {
                    setFormData({ title: "", contentMarkdown: "", videoFile: null, pdfFiles: [] });
                    // This line clears the "File Selected" text from the browser inputs
                    document.querySelectorAll('input[type="file"]').forEach(input => input.value = "");
                  }}
                  className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => saveLesson(false)}
                  disabled={loading}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 shadow-lg shadow-indigo-100 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Plus />} Create Lesson
                </button>
              </div>
           </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-8">
        <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900">← Back</button>
        <button 
          onClick={onNext} 
          disabled={lessons.length === 0}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:bg-gray-300">
          Continue to Quizzes →
        </button>
      </div>
    </div>
  );
};

export default Step3Curriculum;