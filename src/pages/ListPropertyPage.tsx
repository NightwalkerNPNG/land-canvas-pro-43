
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const ListPropertyPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    title: '',
    description: '',
    price: '',
    priceType: 'sale', // 'sale' or 'rent'
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'house',
    bedrooms: '',
    bathrooms: '',
    area: '',
    amenities: {
      pool: false,
      garage: false,
      garden: false,
      balcony: false,
      parking: false,
      airConditioning: false,
    },
  });

  const [files, setFiles] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [name]: checked,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Your property has been submitted for review!');
    // Clear form or redirect
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-estate-navy mb-8">
            List Your Property
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-estate-navy">Personal Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input 
                    id="firstName"
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input 
                    id="lastName"
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email*</Label>
                  <Input 
                    id="email"
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone*</Label>
                  <Input 
                    id="phone"
                    name="phone" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4 text-estate-navy">Property Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title">Property Title*</Label>
                    <Input 
                      id="title"
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange} 
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description*</Label>
                    <Textarea 
                      id="description"
                      name="description" 
                      value={formData.description} 
                      onChange={handleChange} 
                      className="mt-1"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="price">Price*</Label>
                      <Input 
                        id="price"
                        name="price" 
                        type="number" 
                        value={formData.price} 
                        onChange={handleChange} 
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="priceType">Price Type*</Label>
                      <Select
                        value={formData.priceType}
                        onValueChange={(value) => handleSelectChange('priceType', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select price type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">For Sale</SelectItem>
                          <SelectItem value="rent">For Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="propertyType">Property Type*</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => handleSelectChange('propertyType', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="area">Area (sq ft)*</Label>
                      <Input 
                        id="area"
                        name="area" 
                        type="number" 
                        value={formData.area} 
                        onChange={handleChange} 
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input 
                        id="bedrooms"
                        name="bedrooms" 
                        type="number" 
                        value={formData.bedrooms} 
                        onChange={handleChange} 
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input 
                        id="bathrooms"
                        name="bathrooms" 
                        type="number" 
                        value={formData.bathrooms} 
                        onChange={handleChange} 
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4 text-estate-navy">Property Location</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="address">Address*</Label>
                    <Input 
                      id="address"
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="city">City*</Label>
                      <Input 
                        id="city"
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange} 
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State*</Label>
                      <Input 
                        id="state"
                        name="state" 
                        value={formData.state} 
                        onChange={handleChange} 
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">Zip Code*</Label>
                      <Input 
                        id="zipCode"
                        name="zipCode" 
                        value={formData.zipCode} 
                        onChange={handleChange} 
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4 text-estate-navy">Property Features</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="pool" 
                      checked={formData.amenities.pool}
                      onCheckedChange={(checked) => handleCheckboxChange('pool', checked as boolean)}
                    />
                    <Label htmlFor="pool" className="cursor-pointer">Pool</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="garage" 
                      checked={formData.amenities.garage}
                      onCheckedChange={(checked) => handleCheckboxChange('garage', checked as boolean)}
                    />
                    <Label htmlFor="garage" className="cursor-pointer">Garage</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="garden" 
                      checked={formData.amenities.garden}
                      onCheckedChange={(checked) => handleCheckboxChange('garden', checked as boolean)}
                    />
                    <Label htmlFor="garden" className="cursor-pointer">Garden</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="balcony" 
                      checked={formData.amenities.balcony}
                      onCheckedChange={(checked) => handleCheckboxChange('balcony', checked as boolean)}
                    />
                    <Label htmlFor="balcony" className="cursor-pointer">Balcony</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="parking" 
                      checked={formData.amenities.parking}
                      onCheckedChange={(checked) => handleCheckboxChange('parking', checked as boolean)}
                    />
                    <Label htmlFor="parking" className="cursor-pointer">Parking</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="airConditioning" 
                      checked={formData.amenities.airConditioning}
                      onCheckedChange={(checked) => handleCheckboxChange('airConditioning', checked as boolean)}
                    />
                    <Label htmlFor="airConditioning" className="cursor-pointer">Air Conditioning</Label>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4 text-estate-navy">Property Photos</h2>
                
                <div>
                  <Label htmlFor="photos">Upload Photos (Maximum 5 files)</Label>
                  <Input 
                    id="photos"
                    type="file" 
                    onChange={handleFileChange} 
                    className="mt-1"
                    multiple
                    accept="image/*"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Select up to 5 high-quality images of your property.
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-estate-navy hover:bg-estate-navy/90"
                >
                  Submit Property
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListPropertyPage;
