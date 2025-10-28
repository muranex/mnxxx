export default function QuickActions({ onClearFavorites, onClearHistory, favoritesCount, historyCount }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={onClearFavorites}
        disabled={favoritesCount === 0}
        className="px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear Favorites ({favoritesCount})
      </button>
      <button
        onClick={onClearHistory}
        disabled={historyCount === 0}
        className="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear History ({historyCount})
      </button>
    </div>
  );
}