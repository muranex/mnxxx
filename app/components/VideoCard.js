import { FavoriteButton } from './Favorites';
import { WatchLaterButton } from './WatchLater';
import VideoRating from './VideoRating';

export default function VideoCard({ video, isFavorite, onToggleFavorite, onOpenModal, viewMode = 'grid', isInWatchLater, onToggleWatchLater, videoRating, onRateVideo }) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 border-transparent hover:border-red-500" onClick={() => onOpenModal(video)}>
        <div className="w-48 h-28 flex-shrink-0 relative group">
          <iframe
            src={video.src}
            title={video.title}
            className="w-full h-full"
            allow="fullscreen"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <FavoriteButton videoId={video.id} isFavorite={isFavorite} onToggle={onToggleFavorite} />
          <WatchLaterButton videoId={video.id} isInWatchLater={isInWatchLater} onToggle={onToggleWatchLater} />
        </div>
        <div className="p-4 flex-1">
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            {video.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
            {video.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs capitalize font-medium">
              🔥 {video.category}
            </span>
            <VideoRating videoId={video.id} currentRating={videoRating} onRate={onRateVideo} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.05] transition-all duration-300 border-2 border-transparent hover:border-red-500 group" onClick={() => onOpenModal(video)}>
      <div className="h-40 relative">
        <iframe
          src={video.src}
          title={video.title}
          className="w-full h-full"
          allow="fullscreen"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          HOT 🔥
        </div>
        <FavoriteButton videoId={video.id} isFavorite={isFavorite} onToggle={onToggleFavorite} />
        <WatchLaterButton videoId={video.id} isInWatchLater={isInWatchLater} onToggle={onToggleWatchLater} />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white line-clamp-2 hover:text-red-600 dark:hover:text-red-400 transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2 mb-3">
          {video.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs capitalize font-medium">
            🔥 {video.category}
          </span>
        </div>
        <VideoRating videoId={video.id} currentRating={videoRating} onRate={onRateVideo} />
      </div>
    </div>
  );
}