
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  const [searchType, setSearchType] = useState<'buy' | 'rent'>('buy');

  return (
    <div className="relative h-[600px] md:h-[650px]">
      <div className="absolute inset-0 bg-gradient-to-r from-estate-navy to-estate-navy/50">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Estate"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center max-w-3xl animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4 drop-shadow-lg">
            Find Your Dream Property
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-xl mx-auto">
            Discover the perfect home from our curated selection of premium properties, lands, and exclusive real estate offerings.
          </p>
          
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <div className="flex justify-center space-x-4 mb-6">
              <button
                className={`px-6 py-2 font-medium rounded-full transition duration-200 ${
                  searchType === 'buy'
                    ? 'bg-estate-navy text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSearchType('buy')}
              >
                Buy
              </button>
              <button
                className={`px-6 py-2 font-medium rounded-full transition duration-200 ${
                  searchType === 'rent'
                    ? 'bg-estate-navy text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSearchType('rent')}
              >
                Rent
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-grow">
                <select className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-gold">
                  <option value="">Property Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-gold"
                />
              </div>
              
              <div className="flex-grow">
                <select className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-gold">
                  <option value="">Price Range</option>
                  <option value="0-100000">Up to $100,000</option>
                  <option value="100000-250000">$100,000 - $250,000</option>
                  <option value="250000-500000">$250,000 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000+">$1,000,000+</option>
                </select>
              </div>
              
              <Button className="h-12 bg-estate-gold hover:bg-estate-gold/90 text-white">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
