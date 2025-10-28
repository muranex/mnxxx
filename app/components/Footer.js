export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              MN<span className="text-red-600">XXX</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Premium adult video collection with advanced filtering and search capabilities.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• HD Video Streaming</li>
              <li>• Advanced Search & Filter</li>
              <li>• Favorites System</li>
              <li>• Dark/Light Theme</li>
              <li>• Mobile Responsive</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {['MILF', 'Teen', 'Teacher', 'Threesome', 'Black Cock'].map(cat => (
                <span key={cat} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 MNXXX. All rights reserved. | 18+ Only
          </p>
        </div>
      </div>
    </footer>
  );
}