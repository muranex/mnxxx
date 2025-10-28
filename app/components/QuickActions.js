export default function QuickActions({ onClearFavorites, onClearHistory, favoritesCount, historyCount }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onClearFavorites}
        disabled={favoritesCount === 0}
        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Clear Favorites"
      >
        Clear ❤️ ({favoritesCount})
      </button>
      <button
        onClick={onClearHistory}
        disabled={historyCount === 0}
        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Clear History"
      >
        Clear 🕒 ({historyCount})
      </button>
    </div>
  );
}