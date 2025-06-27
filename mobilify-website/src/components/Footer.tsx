import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Logo />
            <span className="ml-2 text-xl font-bold">Mobilify</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              © 2024 Mobilify. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Transforming ideas into mobile reality.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
