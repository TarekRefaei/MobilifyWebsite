import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import PortableText from '../../../components/PortableText';
import { BlogPost } from '../../../types/sanity';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  // For now, return sample metadata since Sanity isn't configured
  return {
    title: `${slug.replace(/-/g, ' ')} | Mobilify Blog`,
    description: 'Read our latest insights on mobile app development.',
    openGraph: {
      title: `${slug.replace(/-/g, ' ')} | Mobilify Blog`,
      description: 'Read our latest insights on mobile app development.',
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // For now, return a sample post since Sanity isn't configured
  const samplePost = {
    _id: '1',
    _type: 'post',
    title: 'Sample Blog Post',
    slug: { current: slug },
    author: 'Mobilify Team',
    mainImage: undefined,
    categories: [
      {
        _id: 'mobile-dev',
        _type: 'category',
        title: 'Mobile Development',
        slug: { current: 'mobile-development' },
        description: 'Tips and tutorials for mobile app development'
      }
    ],
    publishedAt: '2024-01-15T10:00:00Z',
    excerpt: 'This is a sample blog post to demonstrate the blog functionality.',
    body: [
      {
        _type: 'block',
        _key: '1',
        children: [
          {
            _type: 'span' as const,
            _key: '1',
            text: 'This is a sample blog post. In a real implementation, this content would come from Sanity CMS.',
            marks: []
          }
        ]
      }
    ],
    _createdAt: '2024-01-15T10:00:00Z',
    _updatedAt: '2024-01-15T10:00:00Z'
  };

  const post = samplePost;

  if (!post) {
    notFound();
  }

  // For now, use empty related posts since Sanity isn't configured
  const relatedPosts: BlogPost[] = [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: '/placeholder-image.svg',
      width: 1200,
      height: 630
    },
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mobilify',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.svg',
        width: 200,
        height: 200
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://mobilify.com/blog/${post.slug.current}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen w-full overflow-x-hidden">
        <Header />
        
        <main className="pt-16">
          {/* Back to Blog */}
          <section className="py-6 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-electric-blue hover:underline font-medium"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </section>

          {/* Article Header */}
          <article className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/blog?category=${category.slug.current}`}
                    className="text-sm font-medium text-electric-blue bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-dark-charcoal mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="flex items-center gap-6 text-gray-500 mb-8 pb-8 border-b">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>

              {/* Featured Image - with explicit dimensions to prevent CLS */}
              <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-12 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {post.mainImage ? (
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                    priority // LCP optimization for hero image
                  />
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">Sample Blog Post Image</span>
                )}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <PortableText content={post.body} />
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-dark-charcoal mb-8 text-center">
                  Related Articles
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <article
                      key={relatedPost._id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    >
                      <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        {relatedPost.mainImage ? (
                          <Image
                            src={typeof relatedPost.mainImage === 'string' ? relatedPost.mainImage : '/images/placeholders/blog-placeholder.jpg'}
                            alt={relatedPost.title}
                            width={400}
                            height={192}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">Related Post Image</span>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-dark-charcoal mb-2 line-clamp-2">
                          <Link
                            href={`/blog/${relatedPost.slug.current}`}
                            className="hover:text-electric-blue transition-colors duration-200"
                          >
                            {relatedPost.title}
                          </Link>
                        </h3>
                        
                        {relatedPost.excerpt && (
                          <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                            {relatedPost.excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {formatDate(relatedPost.publishedAt)}
                          </span>
                          <Link
                            href={`/blog/${relatedPost.slug.current}`}
                            className="inline-flex items-center text-electric-blue font-medium hover:underline text-sm"
                          >
                            Read More
                            <ArrowRight className="ml-1 w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
