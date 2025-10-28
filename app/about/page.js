import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About MNXXX</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Premium Adult Entertainment
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              MNXXX is a premium adult video platform offering high-quality content with advanced 
              filtering and search capabilities. Our platform is designed for adults (18+) seeking 
              a sophisticated viewing experience.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• HD Video Streaming</li>
                  <li>• Advanced Search & Filtering</li>
                  <li>• Favorites System</li>
                  <li>• Dark/Light Theme</li>
                  <li>• Mobile Responsive Design</li>
                  <li>• Category Organization</li>
                  <li>• Recently Viewed History</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['MILF', 'Teen', 'Teacher', 'Threesome', 'Black Cock', 'Squirt', 'Wrestling', 'Slut'].map(cat => (
                    <span key={cat} className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              ⚠️ Age Verification Required
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              This website contains adult content and is intended for viewers 18 years of age and older. 
              By accessing this site, you confirm that you are of legal age in your jurisdiction.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Privacy & Security
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We take your privacy seriously. All data is stored locally in your browser and never 
              transmitted to external servers. Your viewing history and favorites remain completely private.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Secure</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Local storage only</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚫</div>
                <h4 className="font-semibold text-gray-900 dark:text-white">No Tracking</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">No analytics or cookies</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔐</div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Private</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your data stays yours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}