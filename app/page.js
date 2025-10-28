'use client';
import { useState, useEffect } from 'react';
import VideoCard from './components/VideoCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import SortOptions from './components/SortOptions';
import ViewToggle from './components/ViewToggle';
import VideoModal from './components/VideoModal';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import Stats from './components/Stats';
import Footer from './components/Footer';
import RecentlyViewed, { useRecentlyViewed } from './components/RecentlyViewed';
import QuickActions from './components/QuickActions';
import { useFavorites } from './components/Favorites';
import videosData from './data/videos.js';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    setTimeout(() => {
      setVideos(videosData.videos);
      setFilteredVideos(videosData.videos);
      const uniqueCategories = [...new Set(videosData.videos.map(video => video.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = videos;

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter(video => favorites.includes(video.id));
    }

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(video => video.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort videos
    switch (sortBy) {
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    setFilteredVideos(filtered);
  }, [activeCategory, videos, searchTerm, sortBy, showFavoritesOnly, favorites]);

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    addToRecentlyViewed(video);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        favoritesCount={favorites.length}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Stats 
          totalVideos={videos.length}
          filteredVideos={filteredVideos.length}
          categories={categories}
        />
        
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <RecentlyViewed videos={recentlyViewed} onVideoClick={openModal} />
        
        <QuickActions 
          onClearFavorites={clearFavorites}
          onClearHistory={clearRecentlyViewed}
          favoritesCount={favorites.length}
          historyCount={recentlyViewed.length}
        />
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <div className="flex items-center gap-4">
            <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          </div>
        </div>
        
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {showFavoritesOnly ? 'No favorite videos found.' : 'No videos found matching your criteria.'}
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            : "space-y-4"
          }>
            {filteredVideos.map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                isFavorite={favorites.includes(video.id)}
                onToggleFavorite={toggleFavorite}
                onOpenModal={openModal}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredVideos.length} of {videos.length} videos
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