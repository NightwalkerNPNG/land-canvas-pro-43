
import { Search, MapPin, Home, Store } from 'lucide-react';

const features = [
  {
    icon: <Search className="w-10 h-10 text-estate-gold" />,
    title: "Easy Property Search",
    description: "Filter by property type, location, price range and more to find your perfect property match."
  },
  {
    icon: <MapPin className="w-10 h-10 text-estate-gold" />,
    title: "Interactive Map",
    description: "Explore properties visually on our interactive map with land boundary tools and location details."
  },
  {
    icon: <Home className="w-10 h-10 text-estate-gold" />,
    title: "Premium Listings",
    description: "Browse our curated selection of high-quality properties, lands, apartments, and commercial spaces."
  },
  {
    icon: <Store className="w-10 h-10 text-estate-gold" />,
    title: "Sell & Rent Properties",
    description: "List your property for sale or rent with detailed descriptions and land border drawings."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-estate-lightGray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-2 text-estate-navy">
            Why Choose EstatePro
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Our platform offers unique features designed to make your property journey seamless and rewarding.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="font-playfair text-lg font-semibold mb-2 text-estate-navy">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
