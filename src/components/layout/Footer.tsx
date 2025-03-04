import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-4 sm:py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center md:text-left md:flex-row md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg sm:text-xl font-bold">Movix</h2>
            <p className="text-gray-300 text-xs sm:text-sm">Book your favorite movies online</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-300 hover:text-white text-sm">About Us</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">Contact</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">Terms</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">Privacy</a>
          </div>
          
          <div className="text-gray-300 text-xs sm:text-sm">
            &copy; {currentYear} MovieTickets. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;