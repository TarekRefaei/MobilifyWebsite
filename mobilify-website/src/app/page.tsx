import dynamic from 'next/dynamic';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import NoSSR from '../components/NoSSR';

// Lazy load non-critical components for better Core Web Vitals
const InteractiveDemo = dynamic(() => import('../components/sections/InteractiveDemo'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const ServicesOverview = dynamic(() => import('../components/sections/ServicesOverview'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const Process = dynamic(() => import('../components/sections/Process'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const AboutSnippet = dynamic(() => import('../components/sections/AboutSnippet'), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});

const NewsletterSignup = dynamic(() => import('../components/NewsletterSignup'), {
  loading: () => <div className="h-32 bg-electric-blue animate-pulse" />,
});

const Contact = dynamic(() => import('../components/sections/Contact'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

const Footer = dynamic(() => import('../components/layout/Footer'), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />,
});

const SimpleFloatingChat = dynamic(() => import('../components/SimpleFloatingChat'), {
  loading: () => null,
});

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="w-full">
        <Hero />
        <InteractiveDemo />
        <ServicesOverview />
        <Process />
        <AboutSnippet />
        <NewsletterSignup variant="section" />
        <Contact />
      </main>
      <Footer />

      {/* Floating Chat Button */}
      <NoSSR>
        <SimpleFloatingChat />
      </NoSSR>
    </div>
  );
}
