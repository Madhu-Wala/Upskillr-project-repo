import { Star, MessageSquare, ThumbsUp } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    { id: 1, student: "Alice Johnson", rating: 5, date: "2 days ago", course: "Web Dev Bootcamp", comment: "This course was absolutely amazing! The instructor explains everything so clearly." },
    { id: 2, student: "Mark Smith", rating: 4, date: "1 week ago", course: "UI/UX Masterclass", comment: "Great content, but I wish there were more Figma exercises." },
    { id: 3, student: "Sarah Lee", rating: 5, date: "2 weeks ago", course: "Python for Data Science", comment: "Best Python course on the internet. Highly recommended!" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Student Reviews</h1>
           <p className="text-gray-500 text-sm mt-1">See what your students are saying.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        {review.student.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">{review.student}</h4>
                        <p className="text-xs text-gray-500">{review.course} • {review.date}</p>
                    </div>
                </div>
                <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                    ))}
                </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6">"{review.comment}"</p>
            
            <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                <button className="text-indigo-600 text-sm font-bold hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2">
                    <MessageSquare size={16} /> Reply
                </button>
                <button className="text-gray-400 text-sm font-medium hover:text-gray-600 flex items-center gap-2">
                    <ThumbsUp size={16} /> Helpful
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;