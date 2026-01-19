import { ChevronDown,Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import API from '../../../api/axios.js';
import { useEffect } from 'react';
import { useRef } from 'react';
const Step1Basic = ({initialData,existingId,onUpdate, onNext }) => {
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "Development",
    difficulty: initialData?.difficulty || "beginner"
  });


// 1. Add this Ref at the top with your other hooks
const hasHydrated = useRef(false);

// Purane useEffect ko isse replace kar do:
// useEffect(() => {
//   // Check if initialData actually has content (API response has arrived)
//   const hasData = initialData && Object.keys(initialData).length > 0 && initialData.title;

//   if (hasData) {
//     // Priority 1: Agar Parent se data aa gaya (Edit Mode)
//     setFormData({
//       title: initialData.title || "",
//       description: initialData.description || "",
//       category: initialData.category || "Development",
//       difficulty: initialData.difficulty || "beginner"
//     });
//     hasHydrated.current = true; // Lock it so user typing isn't overwritten
//   } 
//   else if (!hasHydrated.current) {
//     // Priority 2: Agar Parent khali hai, toh local draft check karo (Fresh Create Mode)
//     const savedDraft = localStorage.getItem('course_step1_draft');
//     if (savedDraft) {
//       setFormData(JSON.parse(savedDraft));
//       hasHydrated.current = true;
//     }
//   }
// }, [initialData]); // Jab parent ka data update hoga, ye automatically chalega

// 2. Update the useEffect logic
useEffect(() => {
  // If we've already loaded data into the form, STOP. 
  // Don't let props overwrite the user's typing.
  if (hasHydrated.current) return;

  // Priority 1: Parent/Initial Data
  if (initialData && Object.keys(initialData).length > 0 && initialData.title) {
    setFormData(initialData);
    hasHydrated.current = true; // Mark as done forever for this mount
  } 
  // Priority 2: LocalStorage Draft
  else {
    const savedDraft = localStorage.getItem('course_step1_draft');
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      hasHydrated.current = true; // Mark as done
    }
  }
}, [initialData]); // Keep the dependency, but the 'Ref' will block repeat runs

  // --- 2. SAFETY LOCK & AUTO-SAVE ---
  useEffect(() => {
    const dataToStore = {
    title: formData.title || "",
    description: formData.description || "",
    category: formData.category || "",
    difficulty: formData.difficulty || ""
  };
    // Save to localStorage as they type
try {
    localStorage.setItem('course_step1_draft', JSON.stringify(dataToStore));
  } catch (err) {
    console.error("Storage failed:", err);
  }
    // Warn if closing tab
    const handleBeforeUnload = (e) => {
      if (formData.title || formData.description) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 2. UPDATE LOCAL STATE (This fixes the "can't type" issue)
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 3. UPDATE PARENT STATE (Optional: only if you want parent to see changes in real-time)
    if (onUpdate) {
      onUpdate({ [name]: value });
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const payload = {
  //   title: formData.title,
  //   description: formData.description,
  //   category: formData.category,
  //   difficulty: formData.difficulty
  // };
  //   try {
  //     let response;
  //     if(existingId){
  //       // UPDATE existing course if we have an ID (Going Forward again)
  //       response = await API.put(`/api/instructor/courses/${existingId}`, payload);
  //     }else{
  //       // CREATE new course first time
  //       response = await API.post('/api/instructor/courses', payload);
  //     }
  //     console.log("Course saved:", response.data);
  //     const saveId= response.data._id|| existingId;

  // // --- 3. CLEANUP: SUCCESSFUL SAVE ---
  //     localStorage.removeItem('course_step1_draft'); 

  //    onNext(formData,saveId); // This passes the new Course object (with _id) to parent
  //   } catch (err) {
  //     console.error("CREATE COURSE ERROR:", err);
  //     alert(err.response?.data?.message || "Failed to create course draft");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return;
  setLoading(true);

  try {
    // 🚩 RADAR CHECK: Browser ke URL se dekho ki hum Edit mode mein hain ya nahi
    const isEditURL = window.location.pathname.includes('/edit-course/');
    const urlId = window.location.pathname.split('/').pop();

    const cleanPayload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      difficulty: formData.difficulty
    };

    console.log("Sending Payload:", cleanPayload);

    let response;
    // Agar humpe ID hai, ya hum Edit URL par hain... toh sirf UPDATE
    if (existingId || (isEditURL && urlId !== 'create-course')) {
      const finalId = existingId || urlId;
      console.log("Updating Course:", finalId);
      response = await API.put(`/api/instructor/courses/${finalId}`, cleanPayload);
    } else {
      console.log("Creating New Course...");
      response = await API.post('/api/instructor/courses', cleanPayload);
    }

    // Backend structure fix
    const saveId = response.data?.data?._id || response.data?._id;

    localStorage.removeItem('course_step1_draft');
    
    // ✅ Parent ko object bhejo jisme _id ho
    onNext({ ...formData, _id: saveId });

  } catch (err) {
    console.error("Save Error:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Tell us about your course</h2>
        <p className="text-gray-500 mt-1">Let's start with the basics to help students discover your course.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div >
          <label className="block text-sm font-bold text-gray-700 mb-2">Course Title</label>
          <input name='title'
          required value={formData.title}
          onChange={handleChange}
          type="text" 
          placeholder="e.g., Complete Web Development Bootcamp" 
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Course Description</label>
          <input  name='description'
          required value={formData.description}
          onChange={handleChange}
          type='text' 
          placeholder="Describe what students will learn..." 
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all resize-none"/>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <div className="relative">
              <select value= {formData.category}
              onChange={handleChange} name='category'
              className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-indigo-600 outline-none">
                <option>Select a category</option>
                <option>Development</option>
                <option>Marketing</option>
                <option>Programming</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty Level</label>
            <div className="relative">
              <select 
              value={formData.difficulty} placeholder="Select difficulty level"
              onChange={handleChange} name="difficulty"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-indigo-600 outline-none">
                <option value="" disabled>Select difficulty level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            {loading && <Loader2 className="animate-spin" size={20} />}
           {loading 
              ? "Saving..." 
              : existingId 
                ? "Update & Continue"  // Edit mode text
                : "Continue to Thumbnail" // Create mode text
            }
          </button>
        </div>
      </form>
    </div>
  );
};
export default Step1Basic;