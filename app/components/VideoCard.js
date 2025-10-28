import { FavoriteButton } from './Favorites';

export default function VideoCard({ video, isFavorite, onToggleFavorite, onOpenModal, viewMode = 'grid' }) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onOpenModal(video)}>
        <div className="w-48 h-28 flex-shrink-0 relative">
          <iframe
            src={video.src}
            title={video.title}
            className="w-full h-full"
            allow="fullscreen"
            allowFullScreen
          />
          <FavoriteButton videoId={video.id} isFavorite={isFavorite} onToggle={onToggleFavorite} />
        </div>
        <div className="p-4 flex-1">
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-2">
            {video.description}
          </p>
          <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs capitalize">
            {video.category}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onOpenModal(video)}>
      <div className="h-40 relative">
        <iframe
          src={video.src}
          title={video.title}
          className="w-full h-full"
          allow="fullscreen"
          allowFullScreen
        />
        <FavoriteButton videoId={video.id} isFavorite={isFavorite} onToggle={onToggleFavorite} />
      </div>
      <div className="p-2">
        <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white line-clamp-2">
          {video.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2 mb-2">
          {video.description}
        </p>
        <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs capitalize">
          {video.category}
        </span>
      </div>
    </div>
  );
}