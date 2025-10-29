'use client';
import { useState, useEffect, useMemo } from 'react';
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
import HotBanner from './components/HotBanner';
import RandomVideo from './components/RandomVideo';
import AdvancedFilters from './components/AdvancedFilters';
import Pagination from './components/Pagination';
import { useFavorites } from './components/Favorites';
import { useWatchLater } from './components/WatchLater';
import { useVideoRatings } from './components/VideoRating';
import videosData from './data/videos.js';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState(() => 
    typeof window !== 'undefined' ? localStorage.getItem('activeCategory') || 'all' : 'all'
  );
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(() => 
    typeof window !== 'undefined' ? localStorage.getItem('sortBy') || 'default' : 'default'
  );
  const [viewMode, setViewMode] = useState(() => 
    typeof window !== 'undefined' ? localStorage.getItem('viewMode') || 'grid' : 'grid'
  );
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(() => 
    typeof window !== 'undefined' ? Number(localStorage.getItem('videosPerPage')) || 20 : 20
  );
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { watchLater, toggleWatchLater } = useWatchLater();
  const { ratings, rateVideo } = useVideoRatings();

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Handle browser back button for modal
  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) {
        closeModal();
        window.history.pushState(null, '', window.location.href);
      }
    };

    if (isModalOpen) {
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [isModalOpen]);

  useEffect(() => {
    setTimeout(() => {
      setVideos(videosData.videos);
      const uniqueCategories = [...new Set(videosData.videos.map(video => video.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    }, 500);
  }, []);

  const filteredVideos = useMemo(() => {
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

    // Apply advanced filters
    if (advancedFilters.minRating) {
      filtered = filtered.filter(video => (ratings[video.id] || 0) >= parseInt(advancedFilters.minRating));
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

    return filtered;
  }, [activeCategory, videos, searchTerm, sortBy, showFavoritesOnly, favorites, advancedFilters, ratings]);



  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage);

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    addToRecentlyViewed(video);
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
        onToggleFavoritesOnly={() => {
          setShowFavoritesOnly(!showFavoritesOnly);
          setCurrentPage(1);
        }}
        favoritesCount={favorites.length}
      />
      
      <div className="container mx-auto px-4 py-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }} />
        
        <RecentlyViewed videos={recentlyViewed} onVideoClick={openModal} />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Stats 
            totalVideos={videos.length}
            filteredVideos={filteredVideos.length}
            categories={categories}
          />
          
          <QuickActions 
            onClearFavorites={clearFavorites}
            onClearHistory={clearRecentlyViewed}
            favoritesCount={favorites.length}
            historyCount={recentlyViewed.length}
          />
        </div>
        
        <AdvancedFilters 
          filters={advancedFilters}
          onFilterChange={(key, value) => {
            setAdvancedFilters(prev => ({ ...prev, [key]: value }));
            setCurrentPage(1);
          }}
        />
        
        <div className="space-y-4 mb-6">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(category) => {
              setActiveCategory(category);
              setCurrentPage(1);
              localStorage.setItem('activeCategory', category);
            }}
          />
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <RandomVideo videos={filteredVideos} onVideoSelect={openModal} />
            <select
              value={videosPerPage}
              onChange={(e) => {
                const value = Number(e.target.value);
                setVideosPerPage(value);
                setCurrentPage(1);
                localStorage.setItem('videosPerPage', value.toString());
              }}
              className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded"
            >
              <option value={20}>20 per page</option>
              <option value={40}>40 per page</option>
              <option value={60}>60 per page</option>
              <option value={100}>100 per page</option>
            </select>
            <SortOptions sortBy={sortBy} onSortChange={(sort) => {
              setSortBy(sort);
              setCurrentPage(1);
              localStorage.setItem('sortBy', sort);
            }} />
            <ViewToggle viewMode={viewMode} onViewChange={(view) => {
              setViewMode(view);
              localStorage.setItem('viewMode', view);
            }} />
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
            ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4"
            : "space-y-4"
          }>
            {paginatedVideos.map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                isFavorite={favorites.includes(video.id)}
                onToggleFavorite={toggleFavorite}
                isInWatchLater={watchLater.includes(video.id)}
                onToggleWatchLater={toggleWatchLater}
                videoRating={ratings[video.id] || 0}
                onRateVideo={rateVideo}
                onOpenModal={openModal}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Showing {startIndex + 1}-{Math.min(startIndex + videosPerPage, filteredVideos.length)} of {filteredVideos.length} videos ({videos.length} total)
        </div>
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
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