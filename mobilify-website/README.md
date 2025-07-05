# Mobilify Website

A modern, responsive website for Mobilify - a mobile app development startup. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Key Features

- **🎨 Modern Design**: Clean, professional design with smooth animations
- **📱 Responsive**: Mobile-first approach with perfect responsiveness
- **🎯 Interactive Demo**: Animated phone mockup showcasing app development
- **📧 Contact Forms**: Integrated with Web3Forms for reliable form handling
- **📊 Analytics**: Google Analytics 4 with custom event tracking
- **🔍 SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **⚡ Performance**: Optimized for speed with Next.js 15 and modern best practices
- **🌙 Dark Mode**: Full dark mode support with system preference detection
- **♿ Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with semantic color tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: Web3Forms integration
- **Analytics**: Google Analytics 4 + Crisp Chat
- **CMS Ready**: Sanity CMS integration with fallbacks
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── analytics/          # Analytics & tracking components
├── components/         # React components
│   ├── layout/         # Header, Footer, Navigation
│   ├── sections/       # Page sections (Hero, Contact, etc.)
│   └── ui/             # Reusable UI components
├── config/             # Site configuration and fallbacks
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
└── utils/              # Helper functions
```

For detailed information about the project structure and development guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd mobilify-website
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```

4. **Configure your environment variables** (see Configuration section below)

5. **Run the development server:**
```bash
npm run dev
```

6. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run test         # Run tests (when configured)
```

## ⚙️ Configuration

### Environment Variables

Copy `.env.local.example` to `.env.local` and configure the following:

```bash
# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Forms
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here

# Chat (Optional)
NEXT_PUBLIC_CRISP_WEBSITE_ID=your_crisp_id

# CMS (Optional - for dynamic content)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Service Setup

#### 1. Google Analytics 4
1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Add to `.env.local`

#### 2. Web3Forms (Contact Forms)
1. Sign up at [web3forms.com](https://web3forms.com)
2. Create a new form and get your access key
3. Add to `.env.local`

#### 3. Crisp Chat (Optional)
1. Sign up at [crisp.chat](https://crisp.chat)
2. Get your website ID
3. Add to `.env.local`

### Content Management

The website supports both static and dynamic content:

- **Static Content**: Configured in `src/config/site.ts`
- **Dynamic Content**: Fetched from Sanity CMS with fallbacks
- **Fallback System**: Site works perfectly without CMS configuration

## 🎨 Customization

### Design System

Colors are defined using semantic tokens in `tailwind.config.js`:

```javascript
colors: {
  // Brand Colors
  'electric-blue': '#4f46e5',
  'dark-charcoal': '#111827',

  // Semantic Colors
  'surface-light': '#ffffff',
  'text-primary': '#111827',
  'border-light': '#e5e7eb',
  // ... more semantic tokens
}
```

### Content Updates

- **Site Information**: Update `src/config/site.ts`
- **Navigation**: Modify `NAVIGATION` object in site config
- **Styling**: Use semantic color tokens from Tailwind config
- **Components**: Follow the component architecture in [CONTRIBUTING.md](./CONTRIBUTING.md)
## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/mobilify-website)

1. **Push to GitHub**: Commit your code to a GitHub repository
2. **Connect to Vercel**: Import your repository in Vercel dashboard
3. **Configure Environment Variables**: Add your environment variables in Vercel settings
4. **Deploy**: Automatic deployment on every push to main branch

### Manual Deployment Steps

```bash
# Build the application
npm run build

# Test the production build locally
npm run start

# Deploy to your preferred platform
```

### Environment Variables for Production

Ensure these are set in your deployment platform:

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
NEXT_PUBLIC_CRISP_WEBSITE_ID=your_crisp_id
```

### Other Deployment Platforms

The website is compatible with any platform supporting Next.js:
- **Netlify**: Use `@netlify/plugin-nextjs`
- **AWS Amplify**: Full Next.js support
- **Railway**: One-click deployment
- **DigitalOcean App Platform**: Automatic builds

## 📊 Performance & Analytics

### Built-in Analytics Events

The website automatically tracks:
- **Navigation**: Header/footer link clicks
- **Demo Interactions**: Tab switches, preview generations
- **Form Submissions**: Contact form completions
- **Chat Engagement**: Crisp chat interactions

### Performance Features

- **Next.js 15**: Latest performance optimizations
- **Image Optimization**: Automatic WebP conversion and lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Pre-rendered pages for better SEO
- **Bundle Analysis**: Use `npm run analyze` to inspect bundle size

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Project structure details
- Component architecture guidelines
- Development workflow
- Coding standards and best practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guides
- **Issues**: Report bugs or request features via GitHub Issues
- **Questions**: Reach out to the development team

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
- Implementing proper SSR/CSR patterns
- Wrapping client-only components appropriately

See `HYDRATION_FIX.md` for detailed technical information.

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── about/          # About page
│   ├── services/       # Services page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── InteractiveDemo.tsx
│   ├── Contact.tsx     # Contact form
│   └── ...            # Other components
```

## 📄 License

This project is proprietary software for Mobilify. All rights reserved.

## 🤝 Support

For support or questions about this website, please contact the development team.
