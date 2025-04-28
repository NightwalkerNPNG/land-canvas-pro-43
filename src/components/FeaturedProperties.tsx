
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PropertyCard, { PropertyCardProps } from './PropertyCard';

const mockProperties: PropertyCardProps[] = [
  {
    id: '1',
    title: 'Luxury Villa with Pool',
    price: 1250000,
    location: 'Beverly Hills, CA',
    beds: 5,
    baths: 4,
    area: 4200,
    type: 'House',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Modern Downtown Apartment',
    price: 5500,
    priceUnit: 'rent',
    location: 'Manhattan, NY',
    beds: 2,
    baths: 2,
    area: 1100,
    type: 'Apartment',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Waterfront Land Plot',
    price: 850000,
    location: 'Lake Tahoe, NV',
    type: 'Land',
    area: 12500,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Retail Space on Main Street',
    price: 6800,
    priceUnit: 'rent',
    location: 'Austin, TX',
    area: 2800,
    type: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: 'Mountain View Cabin',
    price: 425000,
    location: 'Aspen, CO',
    beds: 3,
    baths: 2,
    area: 1850,
    type: 'House',
    imageUrl: 'https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    title: 'Beachfront Condo',
    price: 3200,
    priceUnit: 'rent',
    location: 'Miami, FL',
    beds: 2,
    baths: 2,
    area: 1100,
    type: 'Apartment',
    imageUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
];

const FeaturedProperties = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent'>('all');
  
  const filteredProperties = mockProperties.filter(property => {
    if (activeTab === 'all') return true;
    if (activeTab === 'sale') return property.priceUnit !== 'rent';
    return property.priceUnit === 'rent';
  });

  return (
    <section className="py-16 bg-estate-offWhite">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-2 text-estate-navy">
              Featured Properties
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our handpicked selection of premium properties, ranging from luxury homes to prime land investments.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant={activeTab === 'all' ? 'default' : 'outline'} 
              size="sm"
              className={activeTab === 'all' ? 'bg-estate-navy hover:bg-estate-navy/90' : ''}
              onClick={() => setActiveTab('all')}
            >
              All
            </Button>
            <Button 
              variant={activeTab === 'sale' ? 'default' : 'outline'} 
              size="sm"
              className={activeTab === 'sale' ? 'bg-estate-navy hover:bg-estate-navy/90' : ''}
              onClick={() => setActiveTab('sale')}
            >
              For Sale
            </Button>
            <Button 
              variant={activeTab === 'rent' ? 'default' : 'outline'} 
              size="sm"
              className={activeTab === 'rent' ? 'bg-estate-navy hover:bg-estate-navy/90' : ''}
              onClick={() => setActiveTab('rent')}
            >
              For Rent
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="font-medium">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
