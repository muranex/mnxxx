export default function Stats({ totalVideos, filteredVideos, categories }) {
  return (
    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
      <span>{totalVideos} videos</span>
      <span>•</span>
      <span>{categories.length} categories</span>
      <span>•</span>
      <span>Showing {filteredVideos}</span>
    </div>
  );
}