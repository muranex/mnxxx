'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import VideoCard from '../../components/VideoCard';
import VideoModal from '../../components/VideoModal';
import Breadcrumb from '../../components/Breadcrumb';
import { useFavorites } from '../../components/Favorites';
import { useRecentlyViewed } from '../../components/RecentlyViewed';
import videosData from '../../data/videos.js';

export default function CategoryPage() {
  const params = useParams();
  const [categoryVideos, setCategoryVideos] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    if (params.slug) {
      const category = params.slug.replace(/-/g, ' ');
      const videos = videosData.videos.filter(video => 
        video.category.toLowerCase() === category.toLowerCase()
      );
      setCategoryVideos(videos);
      setCategoryName(category);
    }
  }, [params.slug]);

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
        <Breadcrumb items={[
          { href: '/', label: 'Home' },
          { href: '/categories', label: 'Categories' },
          { label: categoryName }
        ]} />
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
          {categoryName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {categoryVideos.length} videos in this category
        </p>
        
        {categoryVideos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No videos found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              This category doesn't contain any videos yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categoryVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isFavorite={favorites.includes(video.id)}
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