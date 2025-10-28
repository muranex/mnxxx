'use client';
import { useState, useEffect } from 'react';

export function useVideoRatings() {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('videoRatings');
    if (saved) {
      setRatings(JSON.parse(saved));
    }
  }, []);

  const rateVideo = (videoId, rating) => {
    const newRatings = { ...ratings, [videoId]: rating };
    setRatings(newRatings);
    localStorage.setItem('videoRatings', JSON.stringify(newRatings));
  };

  return { ratings, rateVideo };
}

export default function VideoRating({ videoId, currentRating, onRate }) {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(videoId, star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          className="text-lg transition-colors"
        >
          <span className={
            star <= (hoveredStar || currentRating)
              ? 'text-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          }>
            ⭐
          </span>
        </button>
      ))}
      {currentRating > 0 && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          {currentRating}/5
        </span>
      )}
    </div>
  );
}