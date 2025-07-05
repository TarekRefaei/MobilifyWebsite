import React from 'react';
import { Metadata } from 'next';
import FAQClient from './FAQClient';
import { generateFAQMetadata } from '../../lib/metadata';

// Sample FAQ data for metadata generation
const sampleFAQs = [
  {
    question: 'How much does it cost to build a mobile app?',
    answer: 'Our pricing depends on your specific needs. We offer three main packages: Starter App ($5,000+) for website conversions, Custom App ($15,000+) for new app development, and Enterprise (custom pricing) for complex projects.'
  },
  {
    question: 'How long does it take to develop an app?',
    answer: 'Timeline varies by project complexity: Simple apps take 4-6 weeks, custom designs take 6-10 weeks, and complex features take 10-16 weeks. We provide detailed timelines during our consultation.'
  },
  {
    question: 'Do you develop for both iOS and Android?',
    answer: 'Yes, we develop native apps for both iOS and Android platforms, as well as cross-platform solutions using React Native when appropriate for your project needs.'
  }
];

export const metadata: Metadata = generateFAQMetadata(sampleFAQs);

export default function FAQPage() {
  // For now, we'll use sample data since Sanity isn't set up yet
  const sampleFAQItems = [
    {
      _id: '1',
      _type: 'faqItem' as const,
      question: 'How much does it cost to build a mobile app?',
      answer: [
        {
          _type: 'block' as const,
          _key: '1',
          children: [
            {
              _type: 'span' as const,
              _key: '1',
              text: 'Our pricing depends on your specific needs. We offer three main packages: Starter App ($5,000+) for website conversions, Custom App ($15,000+) for new app development, and Enterprise (custom pricing) for complex projects.',
              marks: []
            }
          ]
        }
      ],
      topic: {
        _id: 'pricing',
        _type: 'faqTopic' as const,
        title: 'Pricing',
        slug: { current: 'pricing' },
        description: 'Questions about costs and packages'
      },
      relatedPosts: [],
      _createdAt: '2024-01-01',
      _updatedAt: '2024-01-01'
    },
    {
      _id: '2',
      _type: 'faqItem' as const,
      question: 'How long does it take to develop an app?',
      answer: [
        {
          _type: 'block' as const,
          _key: '1',
          children: [
            {
              _type: 'span' as const,
              _key: '1',
              text: 'Timeline varies by project complexity: Simple apps take 4-6 weeks, custom designs take 6-10 weeks, and complex features take 10-16 weeks. We provide detailed timelines during our consultation.',
              marks: []
            }
          ]
        }
      ],
      topic: {
        _id: 'process',
        _type: 'faqTopic' as const,
        title: 'Process',
        slug: { current: 'process' },
        description: 'How we work and timelines'
      },
      relatedPosts: [],
      _createdAt: '2024-01-01',
      _updatedAt: '2024-01-01'
    },
    {
      _id: '3',
      _type: 'faqItem' as const,
      question: 'Do you develop for both iOS and Android?',
      answer: [
        {
          _type: 'block' as const,
          _key: '1',
          children: [
            {
              _type: 'span' as const,
              _key: '1',
              text: 'Yes! We develop cross-platform apps that work on both iOS and Android using modern frameworks like React Native. This approach saves time and cost while ensuring your app reaches the widest audience.',
              marks: []
            }
          ]
        }
      ],
      topic: {
        _id: 'technical',
        _type: 'faqTopic' as const,
        title: 'Technical',
        slug: { current: 'technical' },
        description: 'Technical questions about development'
      },
      relatedPosts: [],
      _createdAt: '2024-01-01',
      _updatedAt: '2024-01-01'
    },
    {
      _id: '4',
      _type: 'faqItem' as const,
      question: 'Can you convert my existing website into an app?',
      answer: [
        {
          _type: 'block' as const,
          _key: '1',
          children: [
            {
              _type: 'span' as const,
              _key: '1',
              text: 'Absolutely! Our Starter package is specifically designed for website-to-app conversions. We optimize your existing content for mobile and add native app features like push notifications and offline access.',
              marks: []
            }
          ]
        }
      ],
      topic: {
        _id: 'technical',
        _type: 'faqTopic' as const,
        title: 'Technical',
        slug: { current: 'technical' },
        description: 'Technical questions about development'
      },
      relatedPosts: [],
      _createdAt: '2024-01-01',
      _updatedAt: '2024-01-01'
    },
    {
      _id: '5',
      _type: 'faqItem' as const,
      question: "What's included in the Starter package?",
      answer: [
        {
          _type: 'block' as const,
          _key: '1',
          children: [
            {
              _type: 'span' as const,
              _key: '1',
              text: 'The Starter package includes website conversion, basic mobile optimization, app store submission, push notifications, offline access, and 30 days of support. Perfect for getting your existing business mobile quickly.',
              marks: []
            }
          ]
        }
      ],
      topic: {
        _id: 'pricing',
        _type: 'faqTopic' as const,
        title: 'Pricing',
        slug: { current: 'pricing' },
        description: 'Questions about costs and packages'
      },
      relatedPosts: [],
      _createdAt: '2024-01-01',
      _updatedAt: '2024-01-01'
    }
  ];

  return <FAQClient faqItems={sampleFAQItems} />;
}
