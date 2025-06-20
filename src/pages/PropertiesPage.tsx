import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard, { PropertyCardProps } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Filter, MapPin, Search, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  {
    id: '7',
    title: 'Commercial Office Building',
    price: 2750000,
    location: 'Seattle, WA',
    area: 15000,
    type: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '8',
    title: 'Urban Loft Apartment',
    price: 4200,
    priceUnit: 'rent',
    location: 'Chicago, IL',
    beds: 1,
    baths: 1,
    area: 950,
    type: 'Apartment',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '9',
    title: 'Suburban Family Home',
    price: 685000,
    location: 'Portland, OR',
    beds: 4,
    baths: 3,
    area: 2800,
    type: 'House',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
];

type SortOption = 'price_asc' | 'price_desc' | 'newest' | 'popular';

const PropertiesPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  
  const handlePriceRangeChange = (values: number[]) => {
    if (values.length === 2) {
      setPriceRange([values[0], values[1]]);
    }
  };

  const [areaRange, setAreaRange] = useState<[number, number]>([0, 20000]);
  const [listingType, setListingType] = useState<'all' | 'sale' | 'rent'>('all');
  const [propertyType, setPropertyType] = useState('all');
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('price_asc');
  
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'buy') {
      setListingType('sale');
    } else if (type === 'rent') {
      setListingType('rent');
    }
    
    const propType = searchParams.get('propertyType');
    if (propType) {
      setPropertyType(propType);
    }
    
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setSearchTerm(locationParam);
    }
    
    const priceRangeParam = searchParams.get('priceRange');
    if (priceRangeParam) {
      const [min, max] = priceRangeParam.split('-');
      
      if (max === '+') {
        setPriceRange([parseInt(min), 5000000]);
      } else {
        setPriceRange([parseInt(min), parseInt(max)]);
      }
    }
  }, [searchParams]);
  
  const filteredAndSortedProperties = mockProperties.filter(property => {
    const matchesListingType = 
      listingType === 'all' || 
      (listingType === 'sale' && property.priceUnit !== 'rent') ||
      (listingType === 'rent' && property.priceUnit === 'rent');
    
    const matchesPropertyType = 
      propertyType === 'all' || 
      property.type.toLowerCase() === propertyType.toLowerCase();
    
    const matchesPriceRange = 
      property.price >= priceRange[0] && 
      property.price <= priceRange[1];
    
    const matchesAreaRange = 
      !property.area || 
      (property.area >= areaRange[0] && property.area <= areaRange[1]);
    
    const matchesSearchTerm = 
      !searchTerm || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesListingType && matchesPropertyType && matchesPriceRange && matchesAreaRange && matchesSearchTerm;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id); 
      case 'popular':
        return (b.area || 0) - (a.area || 0);
      default:
        return 0;
    }
  });

  const toggleFilters = () => {
    setFilterVisible(!filterVisible);
  };

  const totalPages = Math.ceil(filteredAndSortedProperties.length / 9);
  const showPagination = totalPages > 1;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-estate-navy text-white py-10 mb-6">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-2">
              Browse Properties
            </h1>
            <p className="text-gray-300">
              Find your dream property from our extensive collection of premium listings
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Listing Type</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setListingType('all')}
                      className={listingType === 'all' ? 'bg-estate-navy text-white' : ''}
                    >
                      All
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setListingType('sale')}
                      className={listingType === 'sale' ? 'bg-estate-navy text-white' : ''}
                    >
                      For Sale
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setListingType('rent')}
                      className={listingType === 'rent' ? 'bg-estate-navy text-white' : ''}
                    >
                      For Rent
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Property Type</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPropertyType('all')}
                      className={propertyType === 'all' ? 'bg-estate-navy text-white' : ''}
                    >
                      All
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPropertyType('house')}
                      className={propertyType === 'house' ? 'bg-estate-navy text-white' : ''}
                    >
                      Houses
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPropertyType('apartment')}
                      className={propertyType === 'apartment' ? 'bg-estate-navy text-white' : ''}
                    >
                      Apartments
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPropertyType('land')}
                      className={propertyType === 'land' ? 'bg-estate-navy text-white' : ''}
                    >
                      Land
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPropertyType('commercial')}
                      className={propertyType === 'commercial' ? 'bg-estate-navy text-white' : ''}
                    >
                      Commercial
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="px-2">
                    <Slider 
                      defaultValue={[0, 1000000]} 
                      max={1000000} 
                      step={10000}
                      value={priceRange}
                      onValueChange={handlePriceRangeChange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <div className="bg-slate-100 p-2 rounded text-sm">
                        ${priceRange[0].toLocaleString()}
                      </div>
                      <div className="bg-slate-100 p-2 rounded text-sm">
                        ${priceRange[1].toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Area (sqft)</h4>
                    <span className="text-sm text-gray-600">
                      {areaRange[0]} - {areaRange[1]} sqft
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 20000]}
                    max={20000}
                    step={500}
                    value={areaRange}
                    onValueChange={setAreaRange}
                    className="mb-6"
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Enter city or zip code"
                      className="w-full p-2 border rounded"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    className="w-full bg-estate-navy hover:bg-estate-navy/90"
                    onClick={() => {
                      setSearchParams({});
                      setFilterVisible(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            <div className={`w-full ${isMobile && filterVisible ? 'hidden' : 'block'} md:w-3/4`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-playfair font-semibold mb-2 md:mb-0">
                  {filteredAndSortedProperties.length} Properties Found
                </h2>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-600">Sort by:</span>
                  <select 
                    className="border rounded-md p-1.5 text-sm bg-white"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                  >
                    <option value="price_asc">Price (Low to High)</option>
                    <option value="price_desc">Price (High to Low)</option>
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
              
              {filteredAndSortedProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProperties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-medium mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria to find more properties.
                  </p>
                  <Button onClick={() => {
                    setPriceRange([0, 5000000]);
                    setAreaRange([0, 20000]);
                    setListingType('all');
                    setPropertyType('all');
                    setSearchTerm('');
                  }}>
                    Reset Filters
                  </Button>
                </div>
              )}
              
              {showPagination && filteredAndSortedProperties.length > 0 && (
                <div className="flex justify-center mt-10">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;
