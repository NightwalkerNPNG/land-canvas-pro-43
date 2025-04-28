import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PropertyCardProps } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Define icon for map markers
const markerIcon = new L.Icon({
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
  {
    id: '4',
    title: 'Retail Space on Main Street',
    price: 6800,
    priceUnit: 'rent',
    location: 'Austin, TX',
    area: 2800,
    type: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    coordinates: [30.2672, -97.7431],
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
    coordinates: [39.1911, -106.8175],
  },
];

// Create a MapContent component to use the center and zoom props
const MapContent = ({ center, zoom, children }: { 
  center: L.LatLngExpression; 
  zoom: number; 
  children: React.ReactNode;
}) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return <>{children}</>;
};

// Control component to change map layers
const MapLayerControl = () => {
  const map = useMap();
  
  const setBaseLayer = (layer: string) => {
    map.eachLayer((currentLayer) => {
      if (currentLayer instanceof L.TileLayer) {
        map.removeLayer(currentLayer);
      }
    });
    
    if (layer === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
    } else {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }
    
    toast.success(`Map view changed to ${layer}`);
  };
  
  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded shadow-md p-2">
      <Button
        size="sm"
        variant="outline"
        className="mr-2"
        onClick={() => setBaseLayer('standard')}
      >
        Map
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setBaseLayer('satellite')}
      >
        Satellite
      </Button>
    </div>
  );
};

const MapPage = () => {
  const [propertyType, setPropertyType] = useState('All Types');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [location, setLocation] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(propertyLocations);
  
  // Default center for US
  const defaultCenter: [number, number] = [37.0902, -95.7129];
  const defaultZoom = 4;
  
  const handleFilterChange = () => {
    let filtered = [...propertyLocations];
    
    // Filter by property type
    if (propertyType !== 'All Types') {
      filtered = filtered.filter(property => property.type === propertyType);
    }
    
    // Filter by price range
    if (priceMin) {
      filtered = filtered.filter(property => property.price >= Number(priceMin));
    }
    
    if (priceMax) {
      filtered = filtered.filter(property => property.price <= Number(priceMax));
    }
    
    // Filter by location (case-insensitive partial match)
    if (location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    setFilteredProperties(filtered);
    toast.success(`Found ${filtered.length} properties matching your criteria`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-estate-navy text-white py-10 mb-6">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-2">
              Interactive Property Map
            </h1>
            <p className="text-gray-300">
              Explore properties visually across locations and draw land boundaries for listings.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-16">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4 bg-estate-lightGray p-4 rounded-lg">
                <h3 className="font-playfair font-medium text-lg mb-4">
                  Filter Properties
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Property Type
                    </label>
                    <select 
                      className="w-full p-2 border rounded"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="All Types">All Types</option>
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Land">Land</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Min" 
                        className="w-full p-2 border rounded"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                      />
                      <input 
                        type="text" 
                        placeholder="Max" 
                        className="w-full p-2 border rounded"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Location
                    </label>
                    <input 
                      type="text" 
                      placeholder="City, State" 
                      className="w-full p-2 border rounded"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      className="w-full bg-estate-navy hover:bg-estate-navy/90"
                      onClick={handleFilterChange}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md h-[700px] relative">
                <MapContainer 
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-lg"
                  center={defaultCenter}
                  zoom={defaultZoom}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  
                  {filteredProperties.map((property) => (
                    <Marker 
                      key={property.id} 
                      position={property.coordinates}
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
                            asChild
                          >
                            <Link to={`/property/${property.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  
                  <MapLayerControl />
                </MapContainer>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-playfair font-semibold text-xl mb-4">
              Land Border Drawing Tools
            </h3>
            <p className="text-gray-600 mb-4">
              Our interactive map allows sellers to draw precise land borders when listing properties. This feature helps buyers understand exact property boundaries.
            </p>
            <p className="text-gray-600">
              To use the drawing tools, create an account and list your property as a land plot. You'll be able to precisely mark property boundaries before publishing your listing.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapPage;
