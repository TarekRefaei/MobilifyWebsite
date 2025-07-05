/**
 * Site Configuration
 * 
 * Centralized configuration for static, developer-controlled values.
 * This file contains non-sensitive data that doesn't belong in the CMS.
 */

// Site Identity
export const SITE_CONFIG = {
  name: 'Mobilify',
  tagline: 'Turn Your Website or Idea Into a Custom Mobile App',
  description: 'Mobilify converts your existing website or new idea into a high-quality, native mobile app for iOS and Android. Get a beautiful, custom-designed app without the complexity.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mobilify.app',
  author: 'Mobilify Team',
} as const;

// Contact Information
export const CONTACT_INFO = {
  email: 'contact@mobilify.dev',
  phone: '+1 (555) 123-4567', // Update with actual phone
  address: {
    street: '123 Tech Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'USA'
  }
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/mobilify',
  linkedin: 'https://linkedin.com/company/mobilify',
  github: 'https://github.com/mobilify',
  facebook: 'https://facebook.com/mobilify',
  instagram: 'https://instagram.com/mobilify'
} as const;

// Navigation Structure
export const NAVIGATION = {
  main: [
    { label: 'Services', href: '#services-overview', id: 'services-overview' },
    { label: 'How It Works', href: '#process', id: 'process' },
    { label: 'About Us', href: '#about', id: 'about' },
  ],
  footer: {
    company: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
    support: [
      { label: 'Contact Us', href: '#contact' },
      { label: 'Help Center', href: '/help' },
      { label: 'Documentation', href: '/docs' },
    ]
  }
} as const;

// Default/Fallback Content (used when CMS is unavailable)
export const FALLBACK_CONTENT = {
  hero: {
    headline: 'Your Idea. Your App. Realized.',
    subtext: 'Mobilify transforms your concepts and existing websites into stunning, high-performance mobile apps. We are the bridge from vision to launch.',
    buttonText: 'See How It Works'
  },
  contact: {
    headline: 'Ready to Build Your Mobile Future?',
    subtext: "Let's discuss your project. We're happy to provide a free, no-obligation consultation and quote.",
    buttonText: 'Send Message',
    successMessage: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
    errorMessage: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
  },
  services: {
    headline: 'Our Services',
    subtext: 'Choose the perfect solution for your mobile app needs'
  },
  process: {
    headline: 'How It Works',
    subtext: 'Our proven process to turn your idea into a successful mobile app'
  },
  about: {
    headline: 'About Mobilify',
    subtext: 'We are passionate about helping businesses and entrepreneurs bring their ideas to life through mobile technology.'
  }
} as const;

// Service Offerings
export const SERVICES = {
  starter: {
    name: 'Starter App',
    description: 'Perfect for converting existing websites into mobile apps.',
    price: 'Starting at $5,000',
    features: ['Website Conversion', 'iOS & Android', 'Basic Features'],
    popular: false
  },
  custom: {
    name: 'Custom App',
    description: 'Turn your new ideas into reality with custom development.',
    price: 'Starting at $15,000',
    features: ['Idea to App', 'Custom UI/UX', 'Advanced Features'],
    popular: true
  },
  enterprise: {
    name: 'Enterprise Solution',
    description: 'Comprehensive solutions for large-scale applications.',
    price: 'Custom Pricing',
    features: ['Full Development', 'Scalable Architecture', 'Ongoing Support'],
    popular: false
  }
} as const;

// External Service URLs
export const EXTERNAL_SERVICES = {
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
  forms: {
    web3forms: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
  },
  chat: {
    crisp: process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID,
    tawkTo: process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID,
  },
  newsletter: {
    mailchimp: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
    convertkit: process.env.CONVERTKIT_API_KEY,
  }
} as const;

// SEO Configuration
export const SEO_CONFIG = {
  defaultTitle: SITE_CONFIG.name + ' | ' + SITE_CONFIG.tagline,
  titleTemplate: '%s | ' + SITE_CONFIG.name + ' - Custom Mobile App Development',
  description: SITE_CONFIG.description,
  keywords: [
    'mobile app development',
    'website to app conversion',
    'custom mobile apps',
    'iOS app development',
    'Android app development',
    'mobile app builder',
    'app development services',
    'native mobile apps',
    'mobile app design',
    'app development company'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name + ' - ' + SITE_CONFIG.tagline,
      },
    ],
  },
  twitter: {
    handle: '@mobilify',
    site: '@mobilify',
    cardType: 'summary_large_image',
  },
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    verySlow: 1.0
  },
  easing: {
    easeInOut: [0.4, 0, 0.2, 1],
    easeOut: [0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1]
  }
} as const;

// Development Configuration
export const DEV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  enableDebugLogs: process.env.NODE_ENV === 'development',
  enableAnalytics: process.env.NODE_ENV === 'production',
} as const;
