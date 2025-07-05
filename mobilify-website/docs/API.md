# API Documentation

This document provides comprehensive documentation for the Mobilify website's APIs, hooks, and utilities.

## 📊 Analytics API

### useAnalytics Hook

The `useAnalytics` hook provides a unified interface for tracking user interactions and events.

```tsx
import { useAnalytics } from '@/hooks';

const { trackNavigation, trackFormSubmission, trackDemoInteraction } = useAnalytics();
```

#### Available Methods

**trackNavigation(destination: string, source: string)**
- Tracks navigation events (clicks on links, buttons)
- `destination`: Target section or page
- `source`: Origin of the navigation (e.g., 'header', 'footer', 'hero')

**trackFormSubmission(formName: string, success: boolean, metadata?: object)**
- Tracks form submission events
- `formName`: Name of the form (e.g., 'contact', 'newsletter')
- `success`: Whether the submission was successful
- `metadata`: Additional data about the submission

**trackDemoInteraction(action: string, demoType: string)**
- Tracks interactions with the interactive demo
- `action`: Type of interaction ('tab_switch', 'preview_click', etc.)
- `demoType`: Demo type ('website', 'mobile', 'tablet')

**trackContentInteraction(contentType: string, action: string)**
- Tracks content engagement
- `contentType`: Type of content ('blog', 'case_study', 'faq')
- `action`: User action ('view', 'share', 'download')

#### Example Usage

```tsx
const Component = () => {
  const { trackNavigation, trackFormSubmission } = useAnalytics();

  const handleContactClick = () => {
    trackNavigation('contact', 'hero_cta');
  };

  const handleFormSubmit = async (formData) => {
    const success = await submitForm(formData);
    trackFormSubmission('contact', success, { source: 'hero' });
  };

  return (
    <button onClick={handleContactClick}>
      Contact Us
    </button>
  );
};
```

## 📝 Forms API

### useContactForm Hook

Comprehensive form management with validation, submission, and analytics.

```tsx
import { useContactForm } from '@/hooks';

const {
  formData,
  errors,
  isSubmitting,
  isSubmitted,
  submitSuccess,
  updateField,
  handleFieldFocus,
  validateSingleField,
  submitForm,
  resetForm
} = useContactForm();
```

#### Form Data Structure

```typescript
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}
```

#### Validation Rules

- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Message**: Required, minimum 10 characters
- **Company**: Optional
- **Project Type**: Optional, predefined options
- **Budget**: Optional, predefined ranges

#### Example Usage

```tsx
const ContactForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    updateField,
    submitForm
  } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(e.target.name as keyof ContactFormData, e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
      />
      {errors.name && <span className="error">{errors.name}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
```

## 🎨 UI Components API

### Button Component

Reusable button component with multiple variants and states.

```tsx
import { Button } from '@/components/ui';

<Button
  variant="primary"    // 'primary' | 'secondary' | 'ghost'
  size="lg"           // 'sm' | 'md' | 'lg'
  isLoading={false}   // boolean
  onClick={handleClick}
>
  Click Me
</Button>
```

#### Variants

- **primary**: Filled button with brand colors
- **secondary**: Outlined button
- **ghost**: Text-only button

#### Sizes

- **sm**: Small button (32px height)
- **md**: Medium button (40px height) - default
- **lg**: Large button (48px height)

### Input Component

Form input component with validation states and labels.

```tsx
import { Input } from '@/components/ui';

<Input
  label="Email Address"
  type="email"
  variant="base"        // 'base' | 'error' | 'success'
  errorMessage="Invalid email"
  helperText="We'll never share your email"
  placeholder="Enter your email"
/>
```

## 🔧 Utility Functions

### Theme Management

```tsx
import { useTheme } from '@/contexts/ThemeContext';

const { theme, setTheme, toggleTheme } = useTheme();

// Set specific theme
setTheme('dark');

// Toggle between light/dark
toggleTheme();
```

### Site Settings

```tsx
import { useSiteSettings, useSectionSettings } from '@/hooks';

// Get all site settings
const settings = useSiteSettings();

// Get specific section settings
const heroSettings = useSectionSettings('hero');
const contactSettings = useSectionSettings('contact');
```

#### Available Sections

- `hero`: Hero section content
- `contact`: Contact section content
- `services`: Services section content
- `process`: Process section content
- `about`: About section content

## 📱 Responsive Design Utilities

### Breakpoints

```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Mobile-First Approach

All components are designed mobile-first:

```tsx
// Mobile-first responsive classes
<div className="w-full md:w-1/2 lg:w-1/3">
  <p className="text-sm md:text-base lg:text-lg">
    Responsive text
  </p>
</div>
```

## 🎭 Animation System

### Animation Configuration

```tsx
import { ANIMATION_CONFIG } from '@/config/site';

// Duration options
ANIMATION_CONFIG.duration.fast    // 0.2s
ANIMATION_CONFIG.duration.normal  // 0.4s
ANIMATION_CONFIG.duration.slow    // 0.6s

// Easing options
ANIMATION_CONFIG.easing.easeInOut  // [0.4, 0, 0.2, 1]
ANIMATION_CONFIG.easing.easeOut    // [0, 0, 0.2, 1]
ANIMATION_CONFIG.easing.easeIn     // [0.4, 0, 1, 1]
```

### Framer Motion Integration

```tsx
import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '@/config/site';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    duration: ANIMATION_CONFIG.duration.normal,
    ease: ANIMATION_CONFIG.easing.easeInOut
  }}
  viewport={{ once: true }}
>
  Animated content
</motion.div>
```

## 🔍 SEO & Metadata

### Page Metadata

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Mobilify',
  description: 'Page description for SEO',
  keywords: ['mobile app', 'development', 'startup'],
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    images: ['/images/og-image.jpg'],
  },
};
```

### Structured Data

```tsx
import StructuredData from '@/components/StructuredData';

<StructuredData
  type="Organization"
  data={{
    name: "Mobilify",
    url: "https://mobilify.app",
    description: "Mobile app development startup"
  }}
/>
```

## 🚀 Performance Optimization

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/images/hero-image.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority={true}  // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting

Components are automatically code-split by Next.js. For manual splitting:

```tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false  // Disable server-side rendering if needed
});
```

## 🔐 Environment Variables

### Required Variables

```bash
# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Forms
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key

# Chat (Optional)
NEXT_PUBLIC_CRISP_WEBSITE_ID=your_crisp_id

# CMS (Optional)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Usage in Code

```tsx
// Client-side only (prefixed with NEXT_PUBLIC_)
const analyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

// Server-side (no prefix needed)
const secretKey = process.env.SECRET_API_KEY;
```

## 🧪 Testing Utilities

### Test Helpers

```tsx
import { renderWithProviders, mockAnalytics } from '@/__tests__/test-utils';

// Render component with all providers
const { getByText } = renderWithProviders(<Component />);

// Mock analytics for testing
const mockTrack = mockAnalytics();
expect(mockTrack).toHaveBeenCalledWith('event_name', expect.any(Object));
```

For more detailed information, see the [CONTRIBUTING.md](../CONTRIBUTING.md) file.
