import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Mission from '../../components/Mission';
import TeamProfiles from '../../components/TeamProfiles';
import CompanyValues from '../../components/CompanyValues';

export const metadata = {
  title: 'About Us | Mobilify',
  description: 'Meet the team behind Mobilify. Learn about our mission to democratize mobile app development and our commitment to quality craftsmanship.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="bg-gradient-to-br from-white to-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About Mobilify
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about transforming great ideas into exceptional mobile experiences. 
              Meet the team and learn about our mission.
            </p>
          </div>
        </div>
        
        <Mission />
        <TeamProfiles />
        <CompanyValues />
      </main>
      <Footer />
    </div>
  );
}
