
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, Share, Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner';

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

// Sample property data
const propertyDetails = {
  id: '1',
  title: 'Luxury Villa with Pool',
  price: 1250000,
  location: 'Beverly Hills, CA',
  address: '123 Luxury Lane, Beverly Hills, CA 90210',
  beds: 5,
  baths: 4,
  area: 4200,
  lotArea: 10500,
  yearBuilt: 2018,
  type: 'House',
  status: 'For Sale',
  description: `
    This exceptional luxury villa offers a perfect blend of elegance, comfort, and privacy. 
    Nestled in the prestigious Beverly Hills neighborhood, this property features an open-concept floor plan, 
    gourmet kitchen with high-end appliances, and a master suite with a spa-like bathroom.
    
    The outdoor area boasts a stunning pool, jacuzzi, and beautifully landscaped garden. 
    Perfect for entertaining guests or enjoying peaceful moments with family.
    
    Additional features include a home theater, wine cellar, three-car garage, and state-of-the-art security system.
  `,
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  ],
  features: [
    'Swimming Pool',
    'Home Theater',
    'Wine Cellar',
    'Gourmet Kitchen',
    'Smart Home Technology',
    'Central Air Conditioning',
    'Fireplace',
    'Hardwood Floors',
    'Walk-in Closets',
    'Outdoor Kitchen',
    'Security System',
    'Three-Car Garage',
  ],
  agent: {
    name: 'Sarah Johnson',
    phone: '(310) 555-1234',
    email: 'sarah.johnson@estatepro.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  },
  coordinates: [34.0736, -118.4004]
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I am interested in this property. Please contact me with more information.'
  });
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent! The agent will contact you soon.");
  };
  
  const handleSave = () => {
    toast.success("Property saved to favorites!");
  };
  
  const handleShare = () => {
    toast.success("Property link copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-playfair font-bold text-estate-navy mb-2">
                {propertyDetails.title}
              </h1>
              <p className="text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-estate-gold" />
                {propertyDetails.address}
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex flex-col md:flex-row items-start md:items-end">
              <div className="text-2xl md:text-3xl font-playfair font-bold text-estate-navy mb-2 md:mb-0 md:mr-6">
                ${propertyDetails.price.toLocaleString()}
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex gap-1" 
                  onClick={handleSave}
                >
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Save</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex gap-1" 
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Image gallery */}
              <div className="lg:col-span-8">
                <div className="mb-2 rounded-lg overflow-hidden h-[400px] md:h-[500px] shadow-md">
                  <img 
                    src={propertyDetails.images[activeImage]} 
                    alt={propertyDetails.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {propertyDetails.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`rounded overflow-hidden cursor-pointer h-20 md:h-24 ${
                        activeImage === index ? 'ring-2 ring-estate-gold' : ''
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Property view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Property details sidebar */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="font-playfair font-semibold text-lg mb-4 text-estate-navy">
                    Property Details
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-gray-600">Property Type</div>
                    <div className="font-medium">{propertyDetails.type}</div>
                    
                    <div className="text-gray-600">Status</div>
                    <div className="font-medium">{propertyDetails.status}</div>
                    
                    <div className="text-gray-600">Bedrooms</div>
                    <div className="font-medium">{propertyDetails.beds}</div>
                    
                    <div className="text-gray-600">Bathrooms</div>
                    <div className="font-medium">{propertyDetails.baths}</div>
                    
                    <div className="text-gray-600">Living Area</div>
                    <div className="font-medium">{propertyDetails.area} sqft</div>
                    
                    <div className="text-gray-600">Lot Size</div>
                    <div className="font-medium">{propertyDetails.lotArea} sqft</div>
                    
                    <div className="text-gray-600">Year Built</div>
                    <div className="font-medium">{propertyDetails.yearBuilt}</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-playfair font-semibold text-lg mb-4 text-estate-navy">
                    Contact Agent
                  </h3>
                  
                  <div className="flex items-center mb-4">
                    <img 
                      src={propertyDetails.agent.image} 
                      alt={propertyDetails.agent.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{propertyDetails.agent.name}</h4>
                      <div className="text-sm text-gray-600">Real Estate Agent</div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleContact} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full p-2 border rounded"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full p-2 border rounded"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone"
                        className="w-full p-2 border rounded"
                        value={formData.phone}
                        onChange={handleFormChange}
                      />
                    </div>
                    
                    <div>
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows={4}
                        className="w-full p-2 border rounded"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-estate-navy hover:bg-estate-navy/90">
                      Contact Agent
                    </Button>
                  </form>
                  
                  <div className="mt-4 flex flex-col space-y-2 text-sm">
                    <a href={`tel:${propertyDetails.agent.phone}`} className="flex items-center text-estate-navy hover:text-estate-gold">
                      <Phone className="h-4 w-4 mr-2" />
                      {propertyDetails.agent.phone}
                    </a>
                    <a href={`mailto:${propertyDetails.agent.email}`} className="flex items-center text-estate-navy hover:text-estate-gold">
                      <Mail className="h-4 w-4 mr-2" />
                      {propertyDetails.agent.email}
                    </a>
                    <Button variant="outline" size="sm" className="w-full flex gap-2 justify-center">
                      <Calendar className="h-4 w-4" />
                      Schedule Viewing
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-playfair font-semibold text-xl mb-4 text-estate-navy">
              About This Property
            </h3>
            <div className="text-gray-600 space-y-4">
              {propertyDetails.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          {/* Features */}
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-playfair font-semibold text-xl mb-4 text-estate-navy">
              Features and Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {propertyDetails.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-estate-gold rounded-full mr-2"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Map */}
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-playfair font-semibold text-xl mb-4 text-estate-navy">
              Location
            </h3>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <MapContainer 
                defaultCenter={propertyDetails.coordinates} 
                defaultZoom={14} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker 
                  position={propertyDetails.coordinates} 
                  icon={markerIcon}
                  eventHandlers={{}} // Empty eventHandlers to avoid TS errors
                >
                  <Popup>
                    {propertyDetails.title}<br />
                    {propertyDetails.address}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
