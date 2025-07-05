# Contributing to Mobilify Website

Welcome to the Mobilify website project! This guide will help you understand the project structure and how to contribute effectively.

## 📁 Project Structure

The project follows a well-organized structure designed for scalability and maintainability:

```
src/
├── analytics/          # Analytics & tracking components
│   ├── CrispChat.tsx   # Crisp chat integration
│   ├── GoogleAnalytics.tsx # GA4 integration
│   ├── WebVitals.tsx   # Performance monitoring
│   └── index.ts        # Clean exports
├── app/                # Next.js 13+ app directory
│   ├── (pages)/        # Route groups
│   ├── globals.css     # Global styles
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── layout/         # Layout components (Header, Footer, Navigation)
│   ├── sections/       # Page sections (Hero, Contact, InteractiveDemo)
│   ├── ui/             # Reusable UI components (Button, Input, Card)
│   └── [other]/        # Utility and feature components
├── config/             # Configuration files
│   └── site.ts         # Site-wide configuration and fallbacks
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and external integrations
├── types/              # TypeScript type definitions
│   ├── analytics.ts    # Analytics event types
│   ├── forms.ts        # Form-related types
│   ├── sanity.ts       # CMS content types
│   └── index.ts        # Centralized exports
└── utils/              # Helper functions
```

## 🎯 Component Architecture

### Layout Components (`src/components/layout/`)
- **Purpose**: Structural elements that define the overall page layout
- **Examples**: Header, Footer, Navigation, MobileMenu
- **Guidelines**: Should be reusable across different pages

### Section Components (`src/components/sections/`)
- **Purpose**: Large, compositional components representing page sections
- **Examples**: Hero, InteractiveDemo, Contact, ServicesOverview
- **Guidelines**: Should be self-contained and focused on a single responsibility

### UI Components (`src/components/ui/`)
- **Purpose**: Small, reusable interface elements
- **Examples**: Button, Input, Card, Modal
- **Guidelines**: Should be highly reusable and follow design system patterns

## 🚀 Adding New Components

### 1. Creating a New UI Component

```bash
# Create the component file
touch src/components/ui/NewComponent.tsx

# Add to the UI index file
echo "export { default as NewComponent } from './NewComponent';" >> src/components/ui/index.ts
```

**Component Template:**
```tsx
/**
 * NewComponent
 * 
 * Brief description of what this component does.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <NewComponent className="custom-class" />
 * ```
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NewComponentProps {
  /** Additional CSS classes */
  className?: string;
}

const NewComponent: React.FC<NewComponentProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={cn('base-classes', className)}>
      {/* Component content */}
    </div>
  );
};

export default NewComponent;
```

### 2. Creating a New Page Section

```bash
# Create the section component
touch src/components/sections/NewSection.tsx

# Add to the sections index file
echo "export { default as NewSection } from './NewSection';" >> src/components/sections/index.ts
```

### 3. Adding a New Page

```bash
# Create the page directory and file
mkdir src/app/new-page
touch src/app/new-page/page.tsx
```

**Page Template:**
```tsx
import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { NewSection } from '@/components/sections';

export const metadata: Metadata = {
  title: 'New Page | Mobilify',
  description: 'Page description for SEO',
};

export default function NewPage() {
  return (
    <>
      <Header />
      <main>
        <NewSection />
      </main>
      <Footer />
    </>
  );
}
```

## 📝 Content Management

### Static Configuration (src/config/site.ts)
- Site-wide settings and fallback content
- Navigation structure
- Contact information
- SEO defaults

### Dynamic Content (Sanity CMS)
- Blog posts and articles
- Team member profiles
- Case studies
- FAQ items
- Testimonials

### Adding New Content Types

1. **Define TypeScript types** in `src/types/sanity.ts`
2. **Create Sanity schema** (when CMS is configured)
3. **Add fallback data** in `src/config/site.ts`
4. **Create data fetching functions** in `src/lib/sanity.ts`

## 🎨 Styling Guidelines

### Color System
Use semantic color tokens from `tailwind.config.js`:

```tsx
// ✅ Good - semantic colors
<div className="bg-surface-light dark:bg-surface-dark">
<p className="text-text-primary dark:text-text-primary-dark">

// ❌ Avoid - hardcoded colors
<div className="bg-white dark:bg-gray-900">
<p className="text-gray-900 dark:text-white">
```

### Component Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Implement dark mode support
- Use semantic color tokens

## 🧪 Testing

### Running Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Writing Tests
- Create test files alongside components: `Component.test.tsx`
- Test component rendering, user interactions, and edge cases
- Mock external dependencies (CMS, analytics)
- Test both success and fallback scenarios

## 📊 Analytics Integration

### Tracking Events
```tsx
import { useAnalytics } from '@/hooks';

const { trackNavigation, trackFormSubmission } = useAnalytics();

// Track navigation
trackNavigation('contact', 'header_nav');

// Track form submission
trackFormSubmission('contact', true, { source: 'hero' });
```

## 🔧 Development Workflow

1. **Create feature branch**: `git checkout -b feature/new-feature`
2. **Make changes** following the guidelines above
3. **Add/update tests** for your changes
4. **Run quality checks**: `npm run lint && npm run test`
5. **Build and verify**: `npm run build`
6. **Commit changes**: Use descriptive commit messages
7. **Create pull request** with detailed description

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Getting Help

- Check existing documentation and code examples
- Review similar components for patterns
- Ask questions in team discussions
- Refer to the main README.md for setup instructions

Thank you for contributing to Mobilify! 🚀
