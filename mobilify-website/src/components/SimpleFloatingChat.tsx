'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

const SimpleFloatingChat: React.FC = () => {
  const handleChatOpen = () => {
    // Try to open Crisp chat if available
    if (typeof window !== 'undefined' && (window as any).$crisp) {
      (window as any).$crisp.push(['do', 'chat:open']);
    } else {
      // Fallback to mailto if Crisp is not available
      window.location.href = 'mailto:hello@mobilify.com?subject=Chat%20Request';
    }

    // Track chat interaction for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'chat_opened', {
        event_category: 'engagement',
        event_label: 'floating_chat'
      });
    }
  };

  return (
    <button
      onClick={handleChatOpen}
      className="fixed bottom-6 right-6 z-50 bg-electric-blue text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Chat with us
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
};

export default SimpleFloatingChat;
