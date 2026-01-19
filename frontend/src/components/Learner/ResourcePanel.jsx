import React, { useState } from 'react';
import { FileText, Download, HelpCircle, CheckCircle2, MessageSquare, Eye, Loader2 } from 'lucide-react';
import API from "../../api/axios"; // Import your configured Axios instance

const ResourcePanel = ({ 
  resources = [], 
  onMarkComplete, 
  onShowFeedback,
  hasQuiz, 
  quizStatus, 
  onAttemptQuiz, 
  onViewSolutions,
  currentLessonId // ✅ We need this prop passed from CoursePlayer!
}) => {
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = async (resource) => {
    try {
      setDownloadingId(resource._id);

      // 1. Request the file from our Backend (which pipes the Cloudinary stream)
      const response = await API.get(
        `/api/lessons/${currentLessonId}/resources/${resource._id}/download`, 
        { responseType: 'blob' } // CRITICAL: Tells axios this is a file, not JSON
      );

      // 2. Create a hidden link to force the browser to save the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Use the name from the resource object for the filename
      link.setAttribute('download', `${resource.name}.pdf`); 
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download failed", error);
      alert("Failed to download resource. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="w-80 flex flex-col bg-white border-l border-gray-100 h-[calc(100vh-73px)] sticky top-[73px] p-6">
      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-4">Resources</h3>
      
      {/* Resources List */}
      <div className="space-y-3 mb-8 overflow-y-auto flex-1">
        {resources.length > 0 ? (
          resources.map((res, idx) => (
            <button
              key={res._id || idx}
              onClick={() => handleDownload(res)}
              disabled={downloadingId === res._id}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/50 transition-all group text-left"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 shrink-0" />
                <span className="text-xs font-bold text-gray-700 truncate">{res.name}</span>
              </div>
              
              {downloadingId === res._id ? (
                <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
              ) : (
                <Download className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 shrink-0" />
              )}
            </button>
          ))
        ) : (
          <p className="text-xs text-gray-400 italic">No resources for this lesson.</p>
        )}
      </div>

      <div className="mt-auto space-y-4">
        {/* ... Keep your existing Feedback, Quiz, and Complete buttons here ... */}
        
        <button 
          onClick={onShowFeedback}
          className="w-full py-4 bg-amber-50 border-2 border-amber-200 text-amber-600 rounded-2xl font-black text-sm hover:bg-amber-100 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageSquare className="w-5 h-5" />
          Give Feedback
        </button>

        {hasQuiz && (
          <button 
            onClick={quizStatus === "attempted" ? onViewSolutions : onAttemptQuiz}
            className={`w-full py-4 border-2 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm
              ${quizStatus === "attempted" 
                ? "bg-emerald-50 border-emerald-500 text-emerald-600 hover:bg-emerald-100" 
                : "bg-white border-indigo-600 text-indigo-600 hover:bg-indigo-50" 
              }`}
          >
            {quizStatus === "attempted" ? (
              <> <Eye className="w-5 h-5" /> View Solutions </>
            ) : (
              <> <HelpCircle className="w-5 h-5" /> Attempt Quiz </>
            )}
          </button>
        )}
        
        <button 
          onClick={onMarkComplete}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
        >
          <CheckCircle2 className="w-5 h-5" />
          Mark as Complete
        </button>
      </div>
    </div>
  );
};

export default ResourcePanel;