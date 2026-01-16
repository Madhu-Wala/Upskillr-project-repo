import React, { useRef } from 'react';
import { Maximize } from 'lucide-react';

const VideoPlayer = ({ videoURL, title }) => {
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  if (!videoURL) {
    return (
      <div className="relative aspect-video bg-black rounded-[2.5rem] flex items-center justify-center text-white">
        No video available
      </div>
    );
  }

  // Detect YouTube / Vimeo
  const isEmbed =
    videoURL.includes("youtube.com") ||
    videoURL.includes("youtu.be") ||
    videoURL.includes("vimeo.com");

  return (
    <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl group">
      
      {isEmbed ? (
        // 🎥 YouTube / Vimeo
        <iframe
          ref={videoRef}
          src={videoURL}
          title={title}
          className="w-full h-full"
          allowFullScreen
        />
      ) : (
        // 🎥 Cloudinary / MP4
        <video
          ref={videoRef}
          src={videoURL}
          controls
          playsInline
          className="w-full h-full object-contain bg-black"
        />
      )}

      <button 
        onClick={handleFullScreen}
        className="absolute bottom-6 right-6 p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
      >
        <Maximize className="w-5 h-5" />
      </button>
    </div>
  );
};

export default VideoPlayer;
