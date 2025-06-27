import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`inline-flex items-center justify-center w-10 h-10 bg-gray-900 rounded-lg ${className}`}>
      <span className="text-white font-bold text-xl">M</span>
    </div>
  );
};

export default Logo;
