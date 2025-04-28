import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PropertyCardProps } from './PropertyCard';
import { Button } from '@/components/ui/button';

// Fix for Leaflet marker icons with Webpack/Vite
import L from 'leaflet';
import { useIsMobile } from '@/hooks/use-mobile';

// Define icon for map markers
const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface PropertyLocation extends PropertyCardProps {
  coordinates: [number, number]; // [latitude, longitude]
}

// Sample property locations for the map
const propertyLocations: PropertyLocation[] = [
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
    coordinates: [34.0736, -118.4004],
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
    coordinates: [40.7128, -74.006],
  },
  {
    id: '3',
    title: 'Waterfront Land Plot',
    price: 850000,
    location: 'Lake Tahoe, NV',
    type: 'Land',
    area: 12500,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    coordinates: [39.0968, -120.0324],
  },
];

const InteractiveMap = () => {
  const [mapHeight, setMapHeight] = useState('500px');
  const [mapCenter, setMapCenter] = useState<[number, number]>([37.0902, -95.7129]); // US center
  const [mapZoom, setMapZoom] = useState(4);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Adjust map height for mobile
    const updateMapHeight = () => {
      setMapHeight(isMobile ? '400px' : '500px');
    };
    
    updateMapHeight();
    
    window.addEventListener('resize', updateMapHeight);
    return () => {
      window.removeEventListener('resize', updateMapHeight);
    };
  }, [isMobile]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-2 text-estate-navy">
            Explore Properties on the Map
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Use our interactive map to browse properties by location. Click on markers to view property details.
          </p>
        </div>
        
        <div 
          className="rounded-lg shadow-lg overflow-hidden"
          style={{ height: mapHeight }}
        >
          <MapContainer 
            defaultCenter={mapCenter} 
            defaultZoom={mapZoom} 
            style={{ height: '100%', width: '100%' }}
            attributionControl={!isMobile} // Hide attribution on mobile
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {propertyLocations.map((property) => (
              <Marker 
                key={property.id} 
                position={property.coordinates} 
                eventHandlers={{}} // Empty eventHandlers to avoid TS errors
                icon={markerIcon}
              >
                <Popup>
                  <div className="w-60">
                    <img 
                      src={property.imageUrl} 
                      alt={property.title} 
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="font-medium text-sm">{property.title}</h3>
                    <p className="text-estate-navy font-semibold text-sm">
                      {property.priceUnit === 'rent' 
                        ? `$${property.price}/month` 
                        : `$${property.price.toLocaleString()}`
                      }
                    </p>
                    <p className="text-xs text-gray-500 mb-2">{property.location}</p>
                    <Button 
                      size="sm" 
                      className="w-full text-xs bg-estate-navy hover:bg-estate-navy/90"
                    >
                      View Details
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View Full Map
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
