import Header from '../components/Header';
import Hero from '../components/Hero';
import InteractiveDemo from '../components/InteractiveDemo';
import ServicesOverview from '../components/ServicesOverview';
import Process from '../components/Process';
import AboutSnippet from '../components/AboutSnippet';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
