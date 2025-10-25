'use client';
import { useState, useEffect } from 'react';
import VideoCard from './components/VideoCard';
import CategoryFilter from './components/CategoryFilter';
import videosData from './data/videos.json';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setVideos(videosData.videos);
    setFilteredVideos(videosData.videos);
    const uniqueCategories = [...new Set(videosData.videos.map(video => video.category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter(video => video.category === activeCategory));
    }
  }, [activeCategory, videos]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Video Library
        </h1>
        
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
