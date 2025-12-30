import React from 'react';
import { FileText, ExternalLink, HelpCircle, CheckCircle2,MessageSquare } from 'lucide-react';

const ResourcePanel = ({ resources, quizId, onMarkComplete ,onShowFeedback}) => {
  return (
    <div className="w-80 flex flex-col bg-white border-l border-gray-100 h-[calc(100vh-73px)] sticky top-[73px] p-6">
      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-4">Resources</h3>
      
      <div className="space-y-3 mb-8">
        {resources.map((res, idx) => (
          <a
            key={idx}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
              <span className="text-xs font-bold text-gray-700">{res.name}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-300" />
          </a>
        ))}
      </div>

      <div className="mt-auto space-y-4">

        <button 
          onClick={onShowFeedback}
          className="w-full py-4 bg-amber-50 border-2 border-amber-200 text-amber-600 rounded-2xl font-black text-sm hover:bg-amber-100 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageSquare className="w-5 h-5" />
          Give Feedback
        </button>

        <button 
          onClick={() => alert(`Starting Quiz: ${quizId}`)}
          className="w-full py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <HelpCircle className="w-5 h-5" />
          Attempt Quiz
        </button>
        
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