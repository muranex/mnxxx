'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/categories', label: 'Categories', icon: '📂' },
    { href: '/favorites', label: 'Favorites', icon: '❤️' },
    { href: '/trending', label: 'Trending', icon: '🔥' },
    { href: '/about', label: 'About', icon: 'ℹ️' }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  pathname === item.href
                    ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-full py-3 text-gray-600 dark:text-gray-400"
          >
            <span className="mr-2">☰</span>
            Menu
          </button>
          
          {isOpen && (
            <div className="pb-3">
              <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}