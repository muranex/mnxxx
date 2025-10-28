'use client';
import { useState, useEffect } from 'react';

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
  }, []);

  const addToRecentlyViewed = (video) => {
    const updated = [video, ...recentlyViewed.filter(v => v.id !== video.id)].slice(0, 10);
    setRecentlyViewed(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('recentlyViewed');
  };

  return { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed };
}

export default function RecentlyViewed({ videos, onVideoClick }) {
  if (videos.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recently Viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {videos.slice(0, 5).map((video) => (
          <div
            key={video.id}
            className="flex-shrink-0 w-48 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onVideoClick(video)}
          >
            <div className="h-28 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-2">
              <iframe
                src={video.src}
                title={video.title}
                className="w-full h-full"
                allow="fullscreen"
                allowFullScreen
              />
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
              {video.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}