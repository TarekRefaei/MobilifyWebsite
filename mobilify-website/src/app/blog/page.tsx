import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export const metadata: Metadata = {
  title: 'Blog | Mobilify - Mobile App Development Insights',
  description: 'Get the latest insights on mobile app development, industry trends, and tips for turning your ideas into successful mobile apps.',
  openGraph: {
    title: 'Blog | Mobilify - Mobile App Development Insights',
    description: 'Get the latest insights on mobile app development, industry trends, and tips for turning your ideas into successful mobile apps.',
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  // For now, we'll use sample data since Sanity isn't set up yet
  const sampleCategories = [
    {
      _id: 'mobile-dev',
      _type: 'category',
      title: 'Mobile Development',
      slug: { current: 'mobile-development' },
      description: 'Tips and tutorials for mobile app development'
    },
    {
      _id: 'industry-news',
      _type: 'category',
      title: 'Industry News',
      slug: { current: 'industry-news' },
      description: 'Latest trends and news in the mobile industry'
    },
    {
      _id: 'startup-tips',
      _type: 'category',
      title: 'Startup Tips',
      slug: { current: 'startup-tips' },
      description: 'Advice for entrepreneurs building mobile apps'
    }
  ];

  const samplePosts = [
    {
      _id: '1',
      _type: 'post',
      title: '5 Essential Features Every Mobile App Needs',
      slug: { current: '5-essential-features-every-mobile-app-needs' },
      author: 'Mobilify Team',
      mainImage: undefined,
      categories: [sampleCategories[0]],
      publishedAt: '2024-01-15T10:00:00Z',
      excerpt: 'Discover the must-have features that make mobile apps successful and keep users engaged.',
      _createdAt: '2024-01-15T10:00:00Z'
    },
    {
      _id: '2',
      _type: 'post',
      title: 'The Future of Mobile App Development in 2024',
      slug: { current: 'future-of-mobile-app-development-2024' },
      author: 'Mobilify Team',
      mainImage: undefined,
      categories: [sampleCategories[1]],
      publishedAt: '2024-01-10T14:30:00Z',
      excerpt: 'Explore the latest trends and technologies shaping the mobile app development landscape.',
      _createdAt: '2024-01-10T14:30:00Z'
    },
    {
      _id: '3',
      _type: 'post',
      title: 'From Idea to App Store: A Startup\'s Journey',
      slug: { current: 'from-idea-to-app-store-startup-journey' },
      author: 'Mobilify Team',
      mainImage: undefined,
      categories: [sampleCategories[2]],
      publishedAt: '2024-01-05T09:15:00Z',
      excerpt: 'Follow the complete journey of turning a startup idea into a successful mobile app.',
      _createdAt: '2024-01-05T09:15:00Z'
    }
  ];

  const posts = samplePosts;
  const categories = sampleCategories;

  // Filter posts by category if specified
  const filteredPosts = category
    ? posts.filter(post =>
        post.categories.some(cat => cat.slug.current === category)
      )
    : posts;

  const selectedCategory = category
    ? categories.find(cat => cat.slug.current === category)
    : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-electric-blue to-indigo-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {selectedCategory ? selectedCategory.title : 'Mobile App Insights'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {selectedCategory 
                ? selectedCategory.description || `Articles about ${selectedCategory.title.toLowerCase()}`
                : 'Discover the latest trends, tips, and insights in mobile app development'
              }
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  !category
                    ? 'bg-electric-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Posts
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/blog?category=${cat.slug.current}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    category === cat.slug.current
                      ? 'bg-electric-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-dark-charcoal mb-4">
                  No posts found
                </h2>
                <p className="text-gray-600 mb-8">
                  {selectedCategory 
                    ? `No posts found in the ${selectedCategory.title} category.`
                    : 'No blog posts are available at the moment.'
                  }
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center bg-electric-blue text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
                >
                  View All Posts
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post._id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Blog Post Image</span>
                    </div>
                    
                    <div className="p-6">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category) => (
                          <Link
                            key={category._id}
                            href={`/blog?category=${category.slug.current}`}
                            className="text-xs font-medium text-electric-blue bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                          >
                            {category.title}
                          </Link>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-dark-charcoal mb-3 line-clamp-2">
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="hover:text-electric-blue transition-colors duration-200"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Read More */}
                      <div className="mt-4 pt-4 border-t">
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="inline-flex items-center text-electric-blue font-medium hover:underline"
                        >
                          Read More
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
