'use client';
import { useState, useEffect } from 'react';

export function useWatchLater() {
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('watchLater');
    if (saved) {
      setWatchLater(JSON.parse(saved));
    }
  }, []);

  const toggleWatchLater = (videoId) => {
    const newWatchLater = watchLater.includes(videoId)
      ? watchLater.filter(id => id !== videoId)
      : [...watchLater, videoId];
    
    setWatchLater(newWatchLater);
    localStorage.setItem('watchLater', JSON.stringify(newWatchLater));
  };

  return { watchLater, toggleWatchLater };
}

export function WatchLaterButton({ videoId, isInWatchLater, onToggle }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(videoId);
      }}
      className={`absolute top-2 left-2 p-2 rounded-full transition-colors ${
        isInWatchLater 
          ? 'bg-blue-500 text-white' 
          : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
      }`}
      title={isInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    </button>
  );
}