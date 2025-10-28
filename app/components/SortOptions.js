export default function SortOptions({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500"
      >
        <option value="default">Default</option>
        <option value="title">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="category">Category</option>
      </select>
    </div>
  );
}