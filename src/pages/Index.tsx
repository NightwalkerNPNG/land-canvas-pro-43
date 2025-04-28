
import HeroBanner from '@/components/HeroBanner';
import FeaturedProperties from '@/components/FeaturedProperties';
import FeatureSection from '@/components/FeatureSection';
import InteractiveMap from '@/components/InteractiveMap';
import NewsletterSection from '@/components/NewsletterSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroBanner />
        <FeaturedProperties />
        <FeatureSection />
        <InteractiveMap />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
