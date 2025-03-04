import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Scroll to top when layout mounts/route changes
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;