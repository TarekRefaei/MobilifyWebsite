/**
 * Sanity CMS Type Definitions
 * 
 * This file contains all TypeScript interfaces for data fetched from Sanity CMS.
 * These types ensure type safety when working with CMS content.
 */

// Base Sanity document interface
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// Site Settings (singleton document)
export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings';
  
  // Hero Section
  heroHeadline?: string;
  heroSubtext?: string;
  heroButtonText?: string;
  
  // Services Section
  servicesHeadline?: string;
  servicesSubtext?: string;
  
  // Process Section
  processHeadline?: string;
  processSubtext?: string;
  
  // About Section
  aboutHeadline?: string;
  aboutSubtext?: string;
  
  // Contact Section
  contactHeadline?: string;
  contactSubtext?: string;
  contactButtonText?: string;
  
  // Form Messages
  formSuccessMessage?: string;
  formErrorMessage?: string;
  formValidationMessages?: {
    nameRequired?: string;
    emailRequired?: string;
    emailInvalid?: string;
    messageRequired?: string;
  };
  
  // Newsletter
  newsletterHeadline?: string;
  newsletterSubtext?: string;
  newsletterButtonText?: string;
  newsletterSuccessMessage?: string;
  newsletterErrorMessage?: string;
}

// Blog Post
export interface BlogPost extends SanityDocument {
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  content?: any; // Portable Text content
  publishedAt: string;
  author?: {
    name: string;
    image?: SanityImage;
  };
  mainImage?: SanityImage;
  categories?: Category[];
  tags?: string[];
  seo?: SEOSettings;
}

// Category
export interface Category extends SanityDocument {
  _type: 'category';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

// FAQ Item
export interface FAQItem extends SanityDocument {
  _type: 'faqItem';
  question: string;
  answer: any; // Portable Text content
  category?: string;
  order?: number;
}

// FAQ Topic/Category
export interface FAQTopic extends SanityDocument {
  _type: 'faqTopic';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  order?: number;
}

// Team Member
export interface TeamMember extends SanityDocument {
  _type: 'teamMember';
  name: string;
  role: string;
  bio?: any; // Portable Text content
  image?: SanityImage;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  order?: number;
}

// Service
export interface Service extends SanityDocument {
  _type: 'service';
  title: string;
  slug: {
    current: string;
  };
  description: string;
  longDescription?: any; // Portable Text content
  icon?: string; // Icon name or SVG
  features?: string[];
  pricing?: {
    startingPrice?: number;
    priceRange?: string;
    customPricing?: boolean;
  };
  order?: number;
}

// Testimonial
export interface Testimonial extends SanityDocument {
  _type: 'testimonial';
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    image?: SanityImage;
  };
  rating?: number;
  featured?: boolean;
  order?: number;
}

// Case Study
export interface CaseStudy extends SanityDocument {
  _type: 'caseStudy';
  title: string;
  slug: {
    current: string;
  };
  client: {
    name: string;
    industry: string;
    logo?: SanityImage;
  };
  summary: string;
  content?: any; // Portable Text content
  challenge?: string;
  solution?: string;
  results?: string[];
  technologies?: string[];
  images?: SanityImage[];
  testimonial?: Testimonial;
  publishedAt: string;
  featured?: boolean;
}

// Sanity Image
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// SEO Settings
export interface SEOSettings {
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: SanityImage;
  noIndex?: boolean;
  keywords?: string[];
}

// Page
export interface Page extends SanityDocument {
  _type: 'page';
  title: string;
  slug: {
    current: string;
  };
  content?: any; // Portable Text content
  seo?: SEOSettings;
  publishedAt?: string;
}

// Navigation Item
export interface NavigationItem {
  title: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

// Site Navigation
export interface SiteNavigation extends SanityDocument {
  _type: 'navigation';
  title: string;
  items: NavigationItem[];
}
