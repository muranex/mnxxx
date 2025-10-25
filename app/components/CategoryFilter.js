export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full whitespace-nowrap ${
          activeCategory === 'all'
            ? 'bg-red-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap capitalize ${
            activeCategory === category
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}