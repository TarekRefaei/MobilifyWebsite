'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import NoSSR from './NoSSR';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Services', href: '#services-overview' },
    { label: 'How It Works', href: '#process' },
    { label: 'About Us', href: '#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-bold text-gray-900">Mobilify</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href.substring(1))}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Get a Quote
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <NoSSR>
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-white z-40">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className="block w-full text-left text-lg text-gray-600 hover:text-gray-900 py-2"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 mt-6"
              >
                Get a Quote
              </button>
            </div>
          </div>
        )}
      </NoSSR>
    </header>
  );
};

export default Header;
