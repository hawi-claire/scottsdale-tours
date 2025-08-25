import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Scottsdale Tours - Discover Amazing Experiences',
  description: 'Book the best tours and experiences in Scottsdale, Arizona. From Old Town adventures to sunset tours.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ST</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Scottsdale Tours</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Tours</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Experiences</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              </div>

              <div className="flex items-center space-x-4">
                <button className="text-gray-700 hover:text-blue-600 transition-colors">
                  Sign In
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">ST</span>
                  </div>
                  <span className="text-xl font-bold">Scottsdale Tours</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Discover the best of Scottsdale with our curated tours and experiences. 
                  Creating unforgettable memories in the heart of Arizona.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">All Tours</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Golf Cart Tours</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sunset Experiences</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Wine Tasting</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cancellation Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Scottsdale Tours. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

