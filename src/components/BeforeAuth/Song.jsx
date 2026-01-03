import React, { useState, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import music from './assets/music.mp3';

const Song = () => {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef();

  // Auto-play when component mounts

  const togglePlay = () => {
    const audio = playerRef.current.audioEl.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <div>
      {/* Hidden Audio Player */}
      <ReactAudioPlayer
        src={music}
        ref={playerRef}
        controls={false}
      />

      {/* Fixed Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 bg-white/20 backdrop-blur-md border border-white/20 text-red-700 p-4 rounded-full shadow-lg hover:scale-105 hover:bg-red-500 transition duration-300 ease-in-out"
      >
        {playing ? (
          // Pause Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          // Play Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-4.586-2.65A1 1 0 009 9.382v5.236a1 1 0 001.166.964l4.586-2.65a1 1 0 000-1.764z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Song;
