'use client';
import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('videoFavorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (videoId) => {
    const newFavorites = favorites.includes(videoId)
      ? favorites.filter(id => id !== videoId)
      : [...favorites, videoId];
    
    setFavorites(newFavorites);
    localStorage.setItem('videoFavorites', JSON.stringify(newFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('videoFavorites');
  };

  return { favorites, toggleFavorite, clearFavorites };
}

export function FavoriteButton({ videoId, isFavorite, onToggle }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(videoId);
      }}
      className={`absolute top-2 right-2 p-2 rounded-full ${
        isFavorite 
          ? 'bg-red-500 text-white' 
          : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
      }`}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    </button>
  );
}