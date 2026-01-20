import React, { useRef } from 'react';
import { Maximize, AlertCircle } from 'lucide-react';

const VideoPlayer = ({ videoURL, title }) => {
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // ✅ FIX 1: Strict check to ensure videoURL is a string. 
  // This prevents the "videoURL.includes is not a function" crash.
  if (!videoURL || typeof videoURL !== 'string') {
    return (
      <div className="relative aspect-video bg-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-500 border border-slate-800">
        <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
        <p className="font-medium">No video source available</p>
      </div>
    );
  }

  // Detect Platform
  const isYouTube = videoURL.includes("youtube.com") || videoURL.includes("youtu.be");
  const isVimeo = videoURL.includes("vimeo.com");
  const isEmbed = isYouTube || isVimeo;

  // ✅ FIX 2: Convert standard YouTube URLs to Embed URLs
  // 'https://www.youtube.com/watch?v=ID' -> 'https://www.youtube.com/embed/ID'
  let finalUrl = videoURL;
  if (isYouTube && videoURL.includes("watch?v=")) {
    const videoId = videoURL.split('v=')[1]?.split('&')[0];
    if (videoId) finalUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (isYouTube && videoURL.includes("youtu.be/")) {
     const videoId = videoURL.split('youtu.be/')[1]?.split('?')[0];
     if (videoId) finalUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl group border border-gray-100">
      
      {isEmbed ? (
        // 🎥 YouTube / Vimeo (Using Iframe)
        <iframe
          ref={videoRef}
          src={finalUrl} // Use the processed URL
          title={title || "Video player"}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        // 🎥 Cloudinary / MP4 (Using Native Video Tag)
        <video
          ref={videoRef}
          src={videoURL}
          controls
          playsInline
          className="w-full h-full object-contain bg-black"
        />
      )}

      {/* Fullscreen Button (Only works for native video tag usually, but kept for layout) */}
      {!isEmbed && (
        <button 
          onClick={handleFullScreen}
          className="absolute bottom-6 right-6 p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
        >
          <Maximize className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;