# 🚀 Mobilify Website

> **A modern, responsive website for Mobilify - transforming ideas into powerful mobile applications**

Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion for optimal performance and user experience.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TarekRefaei/MobilifyWebsite)

## ✨ Key Features

- **🎨 Modern Design**: Clean, professional design with smooth Framer Motion animations
- **📱 Mobile-First**: Responsive design optimized for all devices and screen sizes
- **🎯 Interactive Demo**: Animated phone mockup showcasing the app development process
- **📧 Smart Forms**: Integrated with Web3Forms for reliable contact form handling
- **📊 Analytics**: Google Analytics 4 with comprehensive event tracking
- **💬 Live Chat**: Crisp chat integration for real-time customer support
- **📰 Newsletter**: Mailchimp integration for lead capture and email marketing
- **🔍 SEO Optimized**: Structured data, meta tags, and semantic HTML for better search rankings
- **⚡ Performance**: Optimized for Core Web Vitals with Next.js 15 best practices
- **🌙 Dark Mode**: Complete dark mode support with system preference detection
- **♿ Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
- **📝 CMS Ready**: Sanity CMS integration with intelligent fallback system

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS with semantic design tokens
- **Animations**: Framer Motion for smooth, professional animations
- **Icons**: Lucide React for consistent iconography

### Integrations & Services
- **Forms**: Web3Forms for contact form submissions
- **Analytics**: Google Analytics 4 with custom event tracking
- **Chat**: Crisp Chat for live customer support
- **Newsletter**: Mailchimp API for email marketing
- **CMS**: Sanity CMS for dynamic content management
- **Deployment**: Vercel (recommended) with automatic deployments

## 📁 Project Structure

```
mobilify-website/
├── src/
│   ├── analytics/          # Analytics & tracking components
│   │   ├── GoogleAnalytics.tsx
│   │   ├── CrispChat.tsx
│   │   └── index.ts
│   ├── components/         # React components
│   │   ├── layout/         # Header, Footer, Navigation
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/       # Page sections (Hero, Contact, etc.)
│   │   │   ├── Hero.tsx
│   │   │   ├── InteractiveDemo.tsx
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── AboutSnippet.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── ContactForm.tsx
│   │   └── ui/             # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       └── index.ts
│   ├── app/                # Next.js App Router
│   │   ├── about/
│   │   ├── services/
│   │   ├── blog/
│   │   ├── faq/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── config/             # Site configuration and fallbacks
│   │   └── site.ts
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAnalytics.ts
│   │   ├── useContactForm.ts
│   │   ├── useSiteSettings.ts
│   │   └── index.ts
│   ├── lib/                # Utility libraries
│   │   ├── sanity.ts
│   │   ├── metadata.ts
│   │   └── utils.ts
│   └── types/              # TypeScript definitions
│       ├── analytics.ts
│       ├── forms.ts
│       ├── sanity.ts
│       └── index.ts
├── public/                 # Static assets
│   ├── images/
│   ├── logo.svg
│   └── og-image.svg
├── docs/                   # Documentation (not tracked in Git)
├── .env.local.example      # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

> 📖 **For detailed development guidelines and component architecture, see [CONTRIBUTING.md](./CONTRIBUTING.md)**

## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **Package Manager**: npm (recommended) or yarn
- **Git**: For cloning the repository

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/TarekRefaei/MobilifyWebsite.git
cd MobilifyWebsite/mobilify-website
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```

4. **Configure your environment variables** (see [Configuration](#️-configuration) section below)

5. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

6. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run lint:fix` | Fix auto-fixable ESLint issues |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run Jest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |

## ⚙️ Configuration

### Environment Variables

Copy `.env.local.example` to `.env.local` and configure the following variables:

```bash
# 📊 Analytics (Required for tracking)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# 📧 Contact Forms (Required for contact functionality)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here

# 💬 Live Chat (Optional - enhances customer support)
NEXT_PUBLIC_CRISP_WEBSITE_ID=your_crisp_website_id

# 📰 Newsletter (Optional - for email marketing)
NEXT_PUBLIC_MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id

# 📝 Content Management (Optional - for dynamic content)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

### 🔧 Service Setup Guide

#### 1. 📊 Google Analytics 4 (Required)
**Purpose**: Track website performance, user behavior, and conversion metrics

1. Visit [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property for your website
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to `.env.local` as `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`

#### 2. 📧 Web3Forms (Required)
**Purpose**: Handle contact form submissions without backend server

1. Sign up at [Web3Forms](https://web3forms.com) (free tier available)
2. Create a new form and get your access key
3. Add to `.env.local` as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
4. Configure email notifications in Web3Forms dashboard

#### 3. 💬 Crisp Chat (Optional)
**Purpose**: Provide real-time customer support and lead capture

1. Sign up at [Crisp Chat](https://crisp.chat) (generous free tier)
2. Create a new website and get your Website ID
3. Add to `.env.local` as `NEXT_PUBLIC_CRISP_WEBSITE_ID`
4. Customize chat widget appearance in Crisp dashboard

#### 4. 📰 Mailchimp (Optional)
**Purpose**: Newsletter signup and email marketing automation

1. Sign up at [Mailchimp](https://mailchimp.com)
2. Create an audience/list for newsletter subscribers
3. Generate API key in Account → Extras → API keys
4. Get your List ID from Audience → Settings → Audience name and defaults
5. Add both to `.env.local`

#### 5. 📝 Sanity CMS (Optional)
**Purpose**: Dynamic content management for blog, FAQ, and site settings

1. Sign up at [Sanity](https://www.sanity.io)
2. Create a new project
3. Get your Project ID and Dataset name
4. Generate an API token with read permissions
5. Add all three to `.env.local`

> 💡 **Pro Tip**: The website works perfectly without optional services. You can start with just Google Analytics and Web3Forms, then add other services as needed.

### 📄 Content Management Strategy

The website uses a hybrid content management approach:

| Content Type | Source | Fallback | Use Case |
|--------------|--------|----------|----------|
| **Static Config** | `src/config/site.ts` | N/A | Site settings, navigation, contact info |
| **Dynamic Content** | Sanity CMS | Static config | Blog posts, FAQ, team info |
| **Form Messages** | Sanity CMS | Hardcoded strings | Success/error messages |
| **SEO Meta** | Dynamic generation | Default templates | Page titles, descriptions |

> 🔄 **Fallback System**: The website gracefully degrades to static content if CMS is unavailable, ensuring 100% uptime.

## 🎨 Customization Guide

### 🎯 Design System

The website uses a comprehensive design system with semantic color tokens:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // 🎨 Brand Colors
        'electric-blue': '#4f46e5',
        'dark-charcoal': '#111827',

        // 🌈 Semantic Colors
        'surface-light': '#ffffff',
        'surface-dark': '#1f2937',
        'text-primary': '#111827',
        'text-secondary': '#6b7280',
        'border-light': '#e5e7eb',
        'border-dark': '#374151',

        // 🎯 Status Colors
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
      }
    }
  }
}
```

### 📝 Content Updates

| What to Update | Where to Edit | Example |
|----------------|---------------|---------|
| **Company Info** | `src/config/site.ts` | Name, email, phone, address |
| **Navigation** | `src/config/site.ts` → `NAVIGATION` | Menu items, links, labels |
| **Services** | `src/config/site.ts` → `SERVICES` | Service descriptions, features |
| **Social Links** | `src/config/site.ts` → `SOCIAL_LINKS` | Twitter, LinkedIn, GitHub |
| **SEO Settings** | `src/config/site.ts` → `SEO` | Default meta tags, keywords |
| **Blog Content** | Sanity CMS | Posts, categories, authors |
| **FAQ Content** | Sanity CMS | Questions, answers, topics |

### 🎨 Styling Guidelines

- **Colors**: Always use semantic tokens (`text-primary` instead of `text-gray-900`)
- **Spacing**: Follow consistent spacing scale (`gap-4`, `py-8`, `px-6`)
- **Typography**: Use defined text scales (`text-lg`, `text-xl`, `text-2xl`)
- **Components**: Extend existing UI components in `src/components/ui/`
- **Responsive**: Mobile-first approach with `sm:`, `md:`, `lg:`, `xl:` breakpoints
## 🚀 Deployment

### 🌟 Vercel (Recommended)

Vercel provides the best experience for Next.js applications with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TarekRefaei/MobilifyWebsite)

#### Quick Deploy Steps:
1. **Push to GitHub**: Commit your code to a GitHub repository
2. **Import to Vercel**: Connect your GitHub repo in [Vercel Dashboard](https://vercel.com/dashboard)
3. **Configure Environment Variables**: Add your environment variables in Project Settings
4. **Deploy**: Automatic deployment on every push to main branch

#### Vercel Environment Variables:
```bash
# Required
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here

# Optional
NEXT_PUBLIC_CRISP_WEBSITE_ID=your_crisp_id
NEXT_PUBLIC_MAILCHIMP_API_KEY=your_mailchimp_key
MAILCHIMP_LIST_ID=your_list_id
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

### 🛠️ Manual Deployment

For other platforms or custom deployments:

```bash
# 1. Install dependencies
npm install

# 2. Build the application
npm run build

# 3. Test production build locally (optional)
npm run start

# 4. Deploy the .next folder and package.json to your platform
```

### 🌐 Alternative Deployment Platforms

| Platform | Setup Difficulty | Features | Best For |
|----------|------------------|----------|----------|
| **Vercel** | ⭐ Easy | Auto-deploy, Edge Functions, Analytics | Recommended for Next.js |
| **Netlify** | ⭐⭐ Medium | Forms, Functions, Split Testing | Static sites with forms |
| **AWS Amplify** | ⭐⭐⭐ Hard | Full AWS integration, Scalability | Enterprise applications |
| **Railway** | ⭐ Easy | Database integration, Simple pricing | Full-stack applications |
| **DigitalOcean** | ⭐⭐ Medium | App Platform, Droplets | Cost-effective hosting |

#### Platform-Specific Notes:
- **Netlify**: Install `@netlify/plugin-nextjs` for full Next.js support
- **AWS Amplify**: Use the Amplify CLI for seamless deployment
- **Railway**: One-click deployment with automatic HTTPS
- **DigitalOcean**: App Platform supports Next.js out of the box

## 📊 Performance & Analytics

### 🎯 Built-in Analytics Events

The website automatically tracks comprehensive user interactions:

| Event Category | Events Tracked | Purpose |
|----------------|----------------|---------|
| **Navigation** | Header/footer link clicks, page views | User journey analysis |
| **Demo Interactions** | Tab switches, input changes, preview generations | Feature engagement |
| **Form Submissions** | Contact form starts/completions, validation errors | Conversion tracking |
| **Chat Engagement** | Chat widget opens, message sends | Support effectiveness |
| **Newsletter** | Signup attempts, success/error rates | Lead generation |
| **Content** | Blog post views, FAQ searches | Content performance |

### ⚡ Performance Features

- **🚀 Next.js 15**: Latest performance optimizations and App Router
- **🖼️ Image Optimization**: Automatic WebP/AVIF conversion and lazy loading
- **📦 Code Splitting**: Automatic route-based and component-level splitting
- **🔄 Static Generation**: Pre-rendered pages for optimal SEO and speed
- **📈 Bundle Analysis**: Built-in bundle analyzer for size optimization
- **🎨 CSS Optimization**: Tailwind CSS purging and critical CSS inlining
- **⚡ Edge Functions**: Vercel Edge Runtime for global performance

### 🎯 Core Web Vitals Targets

| Metric | Target | Current Status |
|--------|--------|----------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ✅ Optimized |
| **FID** (First Input Delay) | < 100ms | ✅ Optimized |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ✅ Optimized |

## 🧪 Testing & Quality

### Test Coverage
- **Unit Tests**: Component functionality and hooks
- **Integration Tests**: Form submissions and API integrations
- **Accessibility Tests**: WCAG 2.1 AA compliance
- **Performance Tests**: Core Web Vitals monitoring

### Quality Assurance
- **TypeScript**: Full type safety across the codebase
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality gates

## 🤝 Contributing

We welcome contributions! Please see our comprehensive guides:

- **[CONTRIBUTING.md](./CONTRIBUTING.md)**: Development workflow and guidelines
- **[docs/API.md](./docs/API.md)**: Component API documentation
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)**: Testing standards and practices

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Run tests and ensure they pass (`npm run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is proprietary software for Mobilify. All rights reserved.

## 🆘 Support & Resources

### 📚 Documentation
- **[CONTRIBUTING.md](./CONTRIBUTING.md)**: Detailed development guidelines
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)**: Testing standards and practices
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)**: Pre-deployment checklist
- **[PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md)**: Performance optimization guide

### 🐛 Issues & Support
- **Bug Reports**: Use GitHub Issues with the bug template
- **Feature Requests**: Use GitHub Issues with the feature template
- **Questions**: Reach out to the development team
- **Security Issues**: Contact the team directly

### 🔗 Useful Links
- **[Live Demo](https://mobilify-website.vercel.app)**: See the website in action
- **[Vercel Dashboard](https://vercel.com/dashboard)**: Deployment management
- **[Google Analytics](https://analytics.google.com)**: Performance tracking
- **[Sanity Studio](https://your-project.sanity.studio)**: Content management

---

<div align="center">

**🚀 Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**

*Transforming ideas into powerful mobile applications*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>
