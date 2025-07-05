'use client';

import React from 'react';

const OrganizationSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mobilify",
    "description": "Mobilify converts your existing website or new idea into a high-quality, native mobile app for iOS and Android. We specialize in custom mobile app development for startups and businesses.",
    "url": "https://mobilify.vercel.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mobilify.vercel.app/logo.svg",
      "width": 200,
      "height": 200
    },
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Mobilify Team"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://linkedin.com/company/mobilify",
      "https://twitter.com/mobilify"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Website to Mobile App Conversion",
        "description": "Convert your existing website into a native mobile app for iOS and Android",
        "provider": {
          "@type": "Organization",
          "name": "Mobilify"
        }
      },
      {
        "@type": "Service", 
        "name": "Custom Mobile App Development",
        "description": "Build custom mobile applications from scratch based on your ideas and requirements",
        "provider": {
          "@type": "Organization",
          "name": "Mobilify"
        }
      },
      {
        "@type": "Service",
        "name": "Mobile App Consulting",
        "description": "Expert consultation on mobile app strategy, design, and development",
        "provider": {
          "@type": "Organization",
          "name": "Mobilify"
        }
      }
    ],
    "keywords": [
      "mobile app development",
      "website to app conversion", 
      "custom app development",
      "iOS app development",
      "Android app development",
      "startup app development",
      "mobile app consulting"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema, null, 2)
      }}
    />
  );
};

export default OrganizationSchema;
