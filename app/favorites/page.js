'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';
import { useFavorites } from '../components/Favorites';
import { useRecentlyViewed } from '../components/RecentlyViewed';
import videosData from '../data/videos.js';

export default function Favorites() {
  const [favoriteVideos, setFavoriteVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    const favVideos = videosData.videos.filter(video => favorites.includes(video.id));
    setFavoriteVideos(favVideos);
  }, [favorites]);

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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Favorites ({favoriteVideos.length})
        </h1>
        
        {favoriteVideos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start adding videos to your favorites by clicking the heart icon
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favoriteVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
                onOpenModal={openModal}
                viewMode="grid"
              />
            ))}
          </div>
        )}
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