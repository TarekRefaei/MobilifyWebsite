import { Metadata } from 'next';

// Target keywords for SEO
const TARGET_KEYWORDS = [
  'convert website to app',
  'custom app development', 
  'app developer for startups',
  'mobile app development',
  'website to mobile app',
  'iOS app development',
  'Android app development'
];

// Base metadata for the site
export const BASE_METADATA = {
  siteName: 'Mobilify',
  siteUrl: 'https://mobilify.vercel.app',
  defaultTitle: 'Mobilify | Turn Your Website or Idea Into a Custom Mobile App',
  defaultDescription: 'Mobilify converts your existing website or new idea into a high-quality, native mobile app for iOS and Android. Get a beautiful, custom-designed app without the complexity.',
  keywords: TARGET_KEYWORDS,
  author: 'Mobilify Team',
  twitterHandle: '@mobilify'
};

// Generate dynamic meta description with keyword targeting
export function generateMetaDescription(
  content: string,
  targetKeywords: string[] = [],
  maxLength: number = 160
): string {
  // Clean and truncate content
  const cleanContent = content
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // If content is short enough, use it as-is
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Try to include target keywords if provided
  // const keywordsToInclude = targetKeywords.length > 0 ? targetKeywords : TARGET_KEYWORDS.slice(0, 2);
  
  // Find a good breaking point near the max length
  const truncateAt = maxLength - 3; // Leave room for "..."
  let description = cleanContent.substring(0, truncateAt);
  
  // Try to break at a word boundary
  const lastSpace = description.lastIndexOf(' ');
  if (lastSpace > truncateAt * 0.8) {
    description = description.substring(0, lastSpace);
  }
  
  // Add ellipsis if truncated
  if (description.length < cleanContent.length) {
    description += '...';
  }

  return description;
}

// Generate blog post metadata
export function generateBlogPostMetadata(post: {
  title: string;
  excerpt?: string;
  content?: string;
  slug: string;
  author?: string;
  publishedAt?: string;
  mainImage?: string;
  categories?: Array<{ title: string }>;
}): Metadata {
  const description = post.excerpt || 
    (post.content ? generateMetaDescription(post.content, ['mobile app development', 'app development tips']) : 
    `Read our latest insights on ${post.categories?.map(c => c.title.toLowerCase()).join(', ') || 'mobile app development'}.`);

  const title = `${post.title} | Mobilify Blog`;
  const url = `${BASE_METADATA.siteUrl}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: [...BASE_METADATA.keywords, ...(post.categories?.map(c => c.title.toLowerCase()) || [])],
    authors: [{ name: post.author || BASE_METADATA.author }],
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: BASE_METADATA.siteName,
      images: post.mainImage ? [
        {
          url: post.mainImage,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg'
        }
      ] : [
        {
          url: '/placeholder-image.svg',
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/svg+xml'
        }
      ],
      publishedTime: post.publishedAt,
      authors: [post.author || BASE_METADATA.author]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: BASE_METADATA.twitterHandle,
      images: post.mainImage ? [post.mainImage] : ['/placeholder-image.svg']
    },
    alternates: {
      canonical: url
    }
  };
}

// Generate FAQ page metadata
export function generateFAQMetadata(faqs: Array<{ question: string; answer: string }>): Metadata {
  const topQuestions = faqs.slice(0, 3).map(faq => faq.question).join(', ');
  const description = generateMetaDescription(
    `Get answers to frequently asked questions about mobile app development. Including: ${topQuestions}`,
    ['mobile app development', 'app development FAQ']
  );

  return {
    title: 'Frequently Asked Questions | Mobilify',
    description,
    keywords: [...BASE_METADATA.keywords, 'FAQ', 'mobile app questions', 'app development help'],
    openGraph: {
      title: 'Frequently Asked Questions | Mobilify',
      description,
      type: 'website',
      url: `${BASE_METADATA.siteUrl}/faq`,
      siteName: BASE_METADATA.siteName
    },
    twitter: {
      card: 'summary',
      title: 'Frequently Asked Questions | Mobilify',
      description,
      creator: BASE_METADATA.twitterHandle
    }
  };
}

// Generate service page metadata
export function generateServiceMetadata(service: {
  title: string;
  description: string;
  slug: string;
  features?: string[];
}): Metadata {
  const description = generateMetaDescription(
    service.description,
    ['custom app development', 'mobile app services']
  );

  const title = `${service.title} | Mobilify Services`;
  const url = `${BASE_METADATA.siteUrl}/services/${service.slug}`;

  return {
    title,
    description,
    keywords: [...BASE_METADATA.keywords, service.title.toLowerCase(), ...(service.features || [])],
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: BASE_METADATA.siteName
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: BASE_METADATA.twitterHandle
    },
    alternates: {
      canonical: url
    }
  };
}
