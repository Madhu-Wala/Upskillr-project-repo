import React, { useRef } from 'react';
import { Maximize, Play } from 'lucide-react';

const VideoPlayer = ({ videoURL, title }) => {
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl group">
      {/* Simple iframe for YouTube/Vimeo or <video> tag for direct URLs */}
      <iframe
        ref={videoRef}
        src={videoURL}
        title={title}
        className="w-full h-full"
        allowFullScreen
      ></iframe>
      
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