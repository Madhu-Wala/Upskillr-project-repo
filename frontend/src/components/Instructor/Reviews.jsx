import { Star, MessageSquare, ThumbsUp, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import API from '../../api/axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await API.get('/api/instructor/reviews');
        setReviews(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        const errorMessage = err.response?.status === 404 
          ? 'Reviews endpoint not found. Please ensure the backend is running and the route is correctly configured.'
          : err.response?.data?.message || 'Failed to load reviews';
        setError(errorMessage);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-indigo-600" size={40} />
          <p className="text-gray-500">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Reviews</h1>
            <p className="text-gray-500 text-sm mt-1">See what your students are saying.</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Student Reviews</h1>
           <p className="text-gray-500 text-sm mt-1">See what your students are saying.</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-indigo-600">{reviews.length}</p>
          <p className="text-xs text-gray-500">Total Reviews</p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center">
          <MessageSquare size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No reviews yet</p>
          <p className="text-sm text-gray-400 mt-1">When your students review your courses, they'll appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          {review.userId.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-900 text-sm">{review.userId.name}</h4>
                          <p className="text-xs text-gray-500">{review.courseId.title} • {formatDate(review.createdAt)}</p>
                      </div>
                  </div>
                  <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                      ))}
                  </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-6">"{review.feedback}"</p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;