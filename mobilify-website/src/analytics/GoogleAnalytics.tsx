'use client';

import Script from 'next/script';

// Google Analytics Types
type GtagCommand = 'config' | 'event' | 'js' | 'set';

declare global {
  interface Window {
    gtag: (command: GtagCommand, ...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GoogleAnalytics = () => {
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  // Only render in production and if GA_ID is provided
  if (!GA_ID || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
