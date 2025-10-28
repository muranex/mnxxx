export default function Stats({ totalVideos, filteredVideos, categories }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Library Stats</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-red-600">{totalVideos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Videos</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">{filteredVideos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Showing</div>
        </div>
      </div>
    </div>
  );
}