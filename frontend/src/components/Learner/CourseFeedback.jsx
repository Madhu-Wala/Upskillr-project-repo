import React, { useState } from 'react';
import { Star, Send, X, CheckCircle2, MessageSquare } from 'lucide-react';

const CourseFeedback = ({ courseTitle, onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send { rating, feedback } to your DB here
    setIsSubmitted(true);
    setTimeout(() => {
      if (onSubmit) onSubmit({ rating, feedback });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-gray-100 max-w-lg mx-auto animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Thank You!</h2>
        <p className="text-gray-400 font-medium">Your feedback helps us make {courseTitle} even better for future learners.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 max-w-2xl mx-auto relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <MessageSquare className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Course Feedback</h2>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{courseTitle}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Star Rating Section */}
          <div className="text-center py-6 bg-slate-50 rounded-[2rem] border border-dashed border-gray-200">
            <p className="text-gray-900 font-bold mb-4">How would you rate this course?</p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90"
                >
                  <Star 
                    className={`w-10 h-10 transition-all duration-200 ${
                      (hover || rating) >= star 
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]' 
                        : 'text-gray-200'
                    }`} 
                  />
                </button>
              ))}
            </div>
            <p className="text-[10px] font-black text-gray-400 mt-4 uppercase tracking-tighter">
              {rating > 0 ? `You selected ${rating} stars` : 'Select a rating'}
            </p>
          </div>

          {/* Text Feedback */}
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-700 ml-1">Tell us more about your experience</label>
            <textarea
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What did you like? What could be improved?"
              className="w-full h-32 p-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all text-gray-700 font-medium resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={rating === 0 || !feedback}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 disabled:bg-gray-200 disabled:shadow-none transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100"
          >
            <Send className="w-4 h-4" />
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseFeedback;