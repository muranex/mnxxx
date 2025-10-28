export default function ViewToggle({ viewMode, onViewChange }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
      <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => onViewChange('grid')}
          className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm ${
            viewMode === 'grid'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Grid
        </button>
        <button
          onClick={() => onViewChange('list')}
          className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm ${
            viewMode === 'list'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          List
        </button>
      </div>
    </div>
  );
}