import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Check if Sanity is configured with valid values
const isValidProjectId = (projectId: string | undefined): boolean => {
  if (!projectId) return false;
  // Sanity project IDs can only contain a-z, 0-9, and dashes
  // Also exclude placeholder values
  return /^[a-z0-9-]+$/.test(projectId) && !projectId.includes('your_sanity_project_id');
};

const isConfigured = !!(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_DATASET &&
  isValidProjectId(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  !process.env.NEXT_PUBLIC_SANITY_DATASET.includes('your_sanity_dataset')
);

// Sanity client configuration (only if configured)
export const client = isConfigured ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}) : null;

// Image URL builder (only if configured)
const builder = isConfigured && client ? imageUrlBuilder(client) : null;

export function urlFor(source: any) {
  if (!builder) {
    console.warn('Sanity not configured, returning placeholder image URL');
    return { url: () => '/placeholder-image.jpg' };
  }
  return builder.image(source);
}

// Type definitions for Sanity documents
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Category {
  _id: string;
  _type: 'category';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface BlogPost {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  author: string;
  mainImage?: SanityImage;
  categories: Category[];
  publishedAt: string;
  excerpt?: string;
  body: any[]; // Portable Text
  _createdAt: string;
  _updatedAt: string;
}

export interface FAQTopic {
  _id: string;
  _type: 'faqTopic';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  // Hero Section
  heroHeadline?: string;
  heroSubtext?: string;
  heroButtonText?: string;
  // Contact Section
  contactHeadline?: string;
  contactSubtext?: string;
  contactButtonText?: string;
  // Form Messages
  formSuccessMessage?: string;
  formErrorMessage?: string;
  // Services Section
  servicesHeadline?: string;
  servicesSubtext?: string;
  // Process Section
  processHeadline?: string;
  processSubtext?: string;
  // About Section
  aboutHeadline?: string;
  aboutSubtext?: string;
  // Footer
  footerTagline?: string;
  footerCopyright?: string;
}

export interface FAQItem {
  _id: string;
  _type: 'faqItem';
  question: string;
  answer: any[]; // Portable Text
  topic: FAQTopic;
  relatedPosts?: BlogPost[];
  _createdAt: string;
  _updatedAt: string;
}

// GROQ queries
export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author,
  mainImage,
  categories[]-> {
    _id,
    title,
    slug
  },
  publishedAt,
  excerpt,
  _createdAt
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  mainImage,
  categories[]-> {
    _id,
    title,
    slug,
    description
  },
  publishedAt,
  excerpt,
  body,
  _createdAt,
  _updatedAt
}`;

export const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`;

export const POSTS_BY_CATEGORY_QUERY = `*[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author,
  mainImage,
  categories[]-> {
    _id,
    title,
    slug
  },
  publishedAt,
  excerpt,
  _createdAt
}`;

export const FAQ_ITEMS_QUERY = `*[_type == "faqItem"] | order(topic->title asc, _createdAt asc) {
  _id,
  question,
  answer,
  topic-> {
    _id,
    title,
    slug,
    description
  },
  relatedPosts[]-> {
    _id,
    title,
    slug
  },
  _createdAt
}`;

export const FAQ_TOPICS_QUERY = `*[_type == "faqTopic"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`;

export const RELATED_POSTS_QUERY = `*[_type == "post" && _id != $postId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt
}`;

// Site Settings Query (Singleton)
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  _id,
  heroHeadline,
  heroSubtext,
  heroButtonText,
  contactHeadline,
  contactSubtext,
  contactButtonText,
  formSuccessMessage,
  formErrorMessage,
  servicesHeadline,
  servicesSubtext,
  processHeadline,
  processSubtext,
  aboutHeadline,
  aboutSubtext,
  footerTagline,
  footerCopyright
}`;

// Utility functions
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!client) {
    console.warn('Sanity not configured, returning empty posts array');
    return [];
  }
  return await client.fetch(POSTS_QUERY);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!client) {
    console.warn('Sanity not configured, returning null for post');
    return null;
  }
  return await client.fetch(POST_QUERY, { slug });
}

export async function getAllCategories(): Promise<Category[]> {
  if (!client) {
    console.warn('Sanity not configured, returning empty categories array');
    return [];
  }
  return await client.fetch(CATEGORIES_QUERY);
}

export async function getPostsByCategory(categoryId: string): Promise<BlogPost[]> {
  if (!client) {
    console.warn('Sanity not configured, returning empty posts array');
    return [];
  }
  return await client.fetch(POSTS_BY_CATEGORY_QUERY, { categoryId });
}

export async function getAllFAQItems(): Promise<FAQItem[]> {
  if (!client) {
    console.warn('Sanity not configured, returning empty FAQ items array');
    return [];
  }
  return await client.fetch(FAQ_ITEMS_QUERY);
}

export async function getAllFAQTopics(): Promise<FAQTopic[]> {
  if (!client) {
    console.warn('Sanity not configured, returning empty FAQ topics array');
    return [];
  }
  return await client.fetch(FAQ_TOPICS_QUERY);
}

export async function getRelatedPosts(postId: string, categoryIds: string[]): Promise<BlogPost[]> {
  if (!client) {
    console.warn('Sanity not configured, returning empty related posts array');
    return [];
  }
  return await client.fetch(RELATED_POSTS_QUERY, { postId, categoryIds });
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!client) {
    console.warn('Sanity not configured, returning null for site settings');
    return null;
  }
  try {
    return await client.fetch(SITE_SETTINGS_QUERY);
  } catch (error) {
    console.warn('Failed to fetch site settings from Sanity:', error);
    return null;
  }
}
