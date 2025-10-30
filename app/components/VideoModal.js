'use client';
import { useEffect, useState } from 'react';

export default function VideoModal({ video, isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      setHasError(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, video]);

  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-8 sm:-top-10 right-0 text-white hover:text-gray-300 text-xl sm:text-2xl z-10"
        >
          ✕
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="aspect-video relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              </div>
            )}
            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <p className="text-gray-500">Failed to load video</p>
              </div>
            ) : (
              <iframe
                src={video.src}
                title={video.title}
                className="w-full h-full"
                allow="fullscreen"
                allowFullScreen
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
              />
            )}
          </div>
          <div className="p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{video.title}</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">{video.description}</p>
            <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm capitalize">
              {video.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}