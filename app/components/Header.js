import Link from 'next/link';
import Navigation from './Navigation';

export default function Header({ showFavoritesOnly, onToggleFavoritesOnly, favoritesCount }) {
  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                MN<span className="text-red-600">XXX</span>
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Premium Collection
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              {showFavoritesOnly !== undefined && (
                <button
                  onClick={onToggleFavoritesOnly}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    showFavoritesOnly
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Favorites ({favoritesCount || 0})
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <Navigation />
    </>
  );
}