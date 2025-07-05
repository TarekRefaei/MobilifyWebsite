'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

const SimpleHeaderChat: React.FC = () => {
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
        event_label: 'header_chat'
      });
    }
  };

  return (
    <button
      onClick={handleChatOpen}
      className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-dark-charcoal dark:hover:text-white transition-colors duration-200"
      aria-label="Open chat"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Chat</span>
    </button>
  );
};

export default SimpleHeaderChat;
