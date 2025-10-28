'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';
import { useFavorites } from '../components/Favorites';
import { useWatchLater } from '../components/WatchLater';
import { useRecentlyViewed } from '../components/RecentlyViewed';
import { useVideoRatings } from '../components/VideoRating';
import videosData from '../data/videos.js';

export default function WatchLater() {
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { watchLater, toggleWatchLater } = useWatchLater();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { ratings, rateVideo } = useVideoRatings();

  useEffect(() => {
    const videos = videosData.videos.filter(video => watchLater.includes(video.id));
    setWatchLaterVideos(videos);
  }, [watchLater]);

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
          <span className="text-3xl">⏰</span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Watch Later ({watchLaterVideos.length})
          </h1>
        </div>
        
        {watchLaterVideos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⏰</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No videos saved for later
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Add videos to your watch later list by clicking the clock icon
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {watchLaterVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isFavorite={favorites.includes(video.id)}
                onToggleFavorite={toggleFavorite}
                isInWatchLater={true}
                onToggleWatchLater={toggleWatchLater}
                videoRating={ratings[video.id] || 0}
                onRateVideo={rateVideo}
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