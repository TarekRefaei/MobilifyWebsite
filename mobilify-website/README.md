# Mobilify Website

A modern, responsive website for Mobilify - a mobile app development startup. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Mobile-first approach with perfect responsiveness across all devices
- **Interactive Demo**: Animated phone mockup showcasing app development process
- **Contact Forms**: Integrated with Web3Forms for reliable form handling
- **Analytics**: Google Analytics 4 integration with custom event tracking
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Performance**: Optimized for speed with Next.js 15 and modern best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: Web3Forms
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mobilify-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your environment variables (see Configuration section below)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## ⚙️ Configuration

### Google Analytics Setup

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Add it to your `.env.local` file:
```
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Web3Forms Setup

1. Visit [web3forms.com](https://web3forms.com)
2. Sign up for a free account
3. Create a new form and get your access key
4. Add it to your `.env.local` file:
```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

## 📊 Analytics Events

The website tracks the following custom events:

- `demo_interaction`: When users click the "Mobilify Preview" button
- `form_submission`: When contact forms are successfully submitted
- `view_services_details`: When users click "Compare All Features & Pricing"

## 🎨 Customization

### Colors
The color scheme is defined in `src/app/globals.css`:
- Primary: `#4f46e5` (Indigo)
- Text: `#111827` (Dark charcoal)
- Background: `#ffffff` (White)
- Logo background: `#1a1a1a` (Dark gray)

### Content
- Team information: Update `src/components/TeamProfiles.tsx`
- Pricing: Update `src/components/PricingTable.tsx`
- Company info: Update various components in `src/components/`

### Images
- Team photos: Replace URLs in `TeamProfiles.tsx` with your actual photos
- Logo: Update `src/components/Logo.tsx` with your actual logo

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📱 Mobile-First Design

The website follows a strict mobile-first methodology:
- All components are designed for mobile first
- Responsive breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Touch-friendly interactions and navigation
- Optimized performance for mobile devices

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Hydration Issues Fixed

The website has been optimized to prevent hydration errors by:
- Using client-side detection for browser-dependent components
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
