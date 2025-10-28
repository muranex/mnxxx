'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';
import { useFavorites } from '../components/Favorites';
import { useRecentlyViewed } from '../components/RecentlyViewed';
import videosData from '../data/videos.js';

export default function Trending() {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    // Simulate trending by shuffling and taking first 12 videos
    const shuffled = [...videosData.videos].sort(() => 0.5 - Math.random());
    setTrendingVideos(shuffled.slice(0, 12));
  }, []);

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    addToRecentlyViewed(video);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">🔥</span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trending Now
          </h1>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
          <p className="text-red-800 dark:text-red-200 text-sm">
            🔥 Hot videos that are popular right now! Updated daily.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {trendingVideos.map((video, index) => (
            <div key={video.id} className="relative">
              <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center z-10">
                {index + 1}
              </div>
              <VideoCard
                video={video}
                isFavorite={favorites.includes(video.id)}
                onToggleFavorite={toggleFavorite}
                onOpenModal={openModal}
                viewMode="grid"
              />
            </div>
          ))}
        </div>
      </div>
      
      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      
      <Footer />
    </div>
  );
}