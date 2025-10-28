'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import videosData from '../data/videos.js';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoryStats = {};
    videosData.videos.forEach(video => {
      if (categoryStats[video.category]) {
        categoryStats[video.category]++;
      } else {
        categoryStats[video.category] = 1;
      }
    });
    
    const categoryList = Object.entries(categoryStats).map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    })).sort((a, b) => b.count - a.count);
    
    setCategories(categoryList);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Categories</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.slug}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {category.count} videos
              </p>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}