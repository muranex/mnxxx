'use client';
import { useState } from 'react';

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  const [showAll, setShowAll] = useState(false);
  
  // Show top 8 categories by default
  const topCategories = categories.slice(0, 8);
  const remainingCategories = categories.slice(8);
  const displayCategories = showAll ? categories : topCategories;
  
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-3 py-2 rounded-full whitespace-nowrap text-sm ${
            activeCategory === 'all'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All
        </button>
        {displayCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-2 rounded-full whitespace-nowrap capitalize text-sm ${
              activeCategory === category
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {remainingCategories.length > 0 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <span>{showAll ? '▲' : '▼'}</span>
          {showAll ? 'Show Less' : `Show ${remainingCategories.length} More Categories`}
        </button>
      )}
    </div>
  );
}