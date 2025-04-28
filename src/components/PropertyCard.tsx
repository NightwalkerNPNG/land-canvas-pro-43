
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  priceUnit?: 'sale' | 'rent';
  location: string;
  beds?: number;
  baths?: number;
  area?: number;
  type: string;
  imageUrl: string;
}

const PropertyCard = ({
  id,
  title,
  price,
  priceUnit = 'sale',
  location,
  beds,
  baths,
  area,
  type,
  imageUrl,
}: PropertyCardProps) => {
  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md property-card-animation animate-fade-in">
      <div className="relative">
        <Link to={`/property/${id}`}>
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1.5 hover:bg-white"
        >
          <Heart className="h-5 w-5 text-estate-navy" />
        </Button>
        
        <div className="absolute bottom-2 left-2">
          <span className="bg-estate-navy text-white text-xs font-medium px-2.5 py-0.5 rounded">
            {priceUnit === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="font-playfair font-medium text-lg mb-1 truncate">
            <Link to={`/property/${id}`} className="hover:text-estate-gold transition-colors">
              {title}
            </Link>
          </h3>
          <div className="font-playfair font-semibold text-estate-navy">
            {formatPrice(price)}
            {priceUnit === 'rent' && <span className="text-sm font-normal text-gray-500">/mo</span>}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm flex items-center mb-3">
          <MapPin className="h-4 w-4 mr-1 text-estate-gold" />
          {location}
        </p>
        
        <div className="border-t pt-3 mt-1">
          <div className="flex justify-between text-sm text-gray-500">
            <span className="bg-estate-lightGray rounded-full px-2.5 py-1">
              {type}
            </span>
            
            <div className="flex space-x-3">
              {beds !== undefined && (
                <div className="flex items-center">
                  <span className="font-medium text-estate-navy">{beds}</span>
                  <span className="ml-1">Bed{beds !== 1 ? 's' : ''}</span>
                </div>
              )}
              
              {baths !== undefined && (
                <div className="flex items-center">
                  <span className="font-medium text-estate-navy">{baths}</span>
                  <span className="ml-1">Bath{baths !== 1 ? 's' : ''}</span>
                </div>
              )}
              
              {area !== undefined && (
                <div className="flex items-center">
                  <span className="font-medium text-estate-navy">{area}</span>
                  <span className="ml-1">sqft</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
