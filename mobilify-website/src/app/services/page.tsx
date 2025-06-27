import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingTable from '../../components/PricingTable';
import ServicesFAQ from '../../components/ServicesFAQ';

export const metadata = {
  title: 'Services & Pricing | Mobilify',
  description: 'Compare our mobile app development packages. From website conversion to custom apps and enterprise solutions. Transparent pricing and features.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="bg-gradient-to-br from-white to-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Services & Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect package for your mobile app project. All packages include iOS and Android development with transparent pricing.
            </p>
          </div>
        </div>
        
        <PricingTable />
        <ServicesFAQ />
      </main>
      <Footer />
    </div>
  );
}
