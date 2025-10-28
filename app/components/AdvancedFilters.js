'use client';
import { useState } from 'react';

export default function AdvancedFilters({ onFilterChange, filters }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-3"
      >
        <span>{isExpanded ? '▼' : '▶'}</span>
        Advanced Filters
      </button>
      
      {isExpanded && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.minRating || ''}
              onChange={(e) => onFilterChange('minRating', e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
            
            <select
              value={filters.contentType || ''}
              onChange={(e) => onFilterChange('contentType', e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white"
            >
              <option value="">All Content</option>
              <option value="solo">Solo</option>
              <option value="couple">Couple</option>
              <option value="group">Group</option>
            </select>
            
            <select
              value={filters.quality || ''}
              onChange={(e) => onFilterChange('quality', e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white"
            >
              <option value="">Any Quality</option>
              <option value="4k">4K Ultra HD</option>
              <option value="hd">HD 1080p</option>
              <option value="sd">Standard</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}