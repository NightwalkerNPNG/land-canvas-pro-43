
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Home, MapPin, DollarSign, CheckSquare, Image } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState("personal");

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-estate-navy mb-3">
                List Your Property
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete the form below to list your property on our platform. Our team will review your submission and make it available to potential buyers or renters.
              </p>
            </div>
            
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-estate-navy text-white rounded-t-lg">
                <CardTitle className="text-xl font-playfair">Property Submission Form</CardTitle>
                <CardDescription className="text-gray-300">
                  Fill in all required fields marked with an asterisk (*)
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                    <TabsTrigger value="personal" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" /> Personal Info
                    </TabsTrigger>
                    <TabsTrigger value="property" className="flex items-center gap-2">
                      <Home className="h-4 w-4" /> Property Details
                    </TabsTrigger>
                    <TabsTrigger value="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Location
                    </TabsTrigger>
                    <TabsTrigger value="features" className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4" /> Features & Photos
                    </TabsTrigger>
                  </TabsList>
                
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <TabsContent value="personal" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium">First Name*</Label>
                          <Input 
                            id="firstName"
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            required
                            placeholder="Enter your first name"
                            className="bg-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium">Last Name*</Label>
                          <Input 
                            id="lastName"
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                            required
                            placeholder="Enter your last name"
                            className="bg-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">Email*</Label>
                          <Input 
                            id="email"
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required
                            placeholder="email@example.com"
                            className="bg-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">Phone*</Label>
                          <Input 
                            id="phone"
                            name="phone" 
                            type="tel" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required
                            placeholder="(123) 456-7890"
                            className="bg-white"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          onClick={() => setActiveTab("property")}
                          className="bg-estate-navy hover:bg-estate-navy/90"
                        >
                          Next: Property Details
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="property" className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-sm font-medium">Property Title*</Label>
                          <Input 
                            id="title"
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            required
                            placeholder="e.g., Luxury Waterfront Villa"
                            className="bg-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-sm font-medium">Description*</Label>
                          <Textarea 
                            id="description"
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            rows={5}
                            required
                            placeholder="Provide a detailed description of your property..."
                            className="bg-white"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="price" className="text-sm font-medium">Price*</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                              <Input 
                                id="price"
                                name="price" 
                                type="number" 
                                value={formData.price} 
                                onChange={handleChange} 
                                required
                                className="pl-10 bg-white"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="priceType" className="text-sm font-medium">Price Type*</Label>
                            <Select
                              value={formData.priceType}
                              onValueChange={(value) => handleSelectChange('priceType', value)}
                            >
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select price type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sale">For Sale</SelectItem>
                                <SelectItem value="rent">For Rent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="propertyType" className="text-sm font-medium">Property Type*</Label>
                            <Select
                              value={formData.propertyType}
                              onValueChange={(value) => handleSelectChange('propertyType', value)}
                            >
                              <SelectTrigger className="bg-white">
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
                          
                          <div className="space-y-2">
                            <Label htmlFor="area" className="text-sm font-medium">Area (sq ft)*</Label>
                            <Input 
                              id="area"
                              name="area" 
                              type="number" 
                              value={formData.area} 
                              onChange={handleChange} 
                              required
                              placeholder="0"
                              className="bg-white"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="bedrooms" className="text-sm font-medium">Bedrooms</Label>
                            <Input 
                              id="bedrooms"
                              name="bedrooms" 
                              type="number" 
                              value={formData.bedrooms} 
                              onChange={handleChange} 
                              placeholder="0"
                              className="bg-white"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bathrooms" className="text-sm font-medium">Bathrooms</Label>
                            <Input 
                              id="bathrooms"
                              name="bathrooms" 
                              type="number" 
                              value={formData.bathrooms} 
                              onChange={handleChange}
                              placeholder="0" 
                              className="bg-white"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setActiveTab("personal")}
                        >
                          Previous
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => setActiveTab("location")}
                          className="bg-estate-navy hover:bg-estate-navy/90"
                        >
                          Next: Location
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="location" className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-sm font-medium">Address*</Label>
                          <Input 
                            id="address"
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            required
                            placeholder="Street address"
                            className="bg-white"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium">City*</Label>
                            <Input 
                              id="city"
                              name="city" 
                              value={formData.city} 
                              onChange={handleChange} 
                              required
                              placeholder="City"
                              className="bg-white"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="state" className="text-sm font-medium">State*</Label>
                            <Input 
                              id="state"
                              name="state" 
                              value={formData.state} 
                              onChange={handleChange} 
                              required
                              placeholder="State"
                              className="bg-white"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="zipCode" className="text-sm font-medium">Zip Code*</Label>
                            <Input 
                              id="zipCode"
                              name="zipCode" 
                              value={formData.zipCode} 
                              onChange={handleChange} 
                              required
                              placeholder="Zip code"
                              className="bg-white"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setActiveTab("property")}
                        >
                          Previous
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => setActiveTab("features")}
                          className="bg-estate-navy hover:bg-estate-navy/90"
                        >
                          Next: Features & Photos
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="features" className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Property Features</Label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                id="pool" 
                                checked={formData.amenities.pool}
                                onCheckedChange={(checked) => handleCheckboxChange('pool', checked as boolean)}
                              />
                              <Label htmlFor="pool" className="cursor-pointer text-sm">Pool</Label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                id="garage" 
                                checked={formData.amenities.garage}
                                onCheckedChange={(checked) => handleCheckboxChange('garage', checked as boolean)}
                              />
                              <Label htmlFor="garage" className="cursor-pointer text-sm">Garage</Label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                id="garden" 
                                checked={formData.amenities.garden}
                                onCheckedChange={(checked) => handleCheckboxChange('garden', checked as boolean)}
                              />
                              <Label htmlFor="garden" className="cursor-pointer text-sm">Garden</Label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                id="balcony" 
                                checked={formData.amenities.balcony}
                                onCheckedChange={(checked) => handleCheckboxChange('balcony', checked as boolean)}
                              />
                              <Label htmlFor="balcony" className="cursor-pointer text-sm">Balcony</Label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                id="parking" 
                                checked={formData.amenities.parking}
                                onCheckedChange={(checked) => handleCheckboxChange('parking', checked as boolean)}
                              />
                              <Label htmlFor="parking" className="cursor-pointer text-sm">Parking</Label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Checkbox 
                                id="airConditioning" 
                                checked={formData.amenities.airConditioning}
                                onCheckedChange={(checked) => handleCheckboxChange('airConditioning', checked as boolean)}
                              />
                              <Label htmlFor="airConditioning" className="cursor-pointer text-sm">Air Conditioning</Label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="photos" className="text-sm font-medium">Property Photos</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-white">
                            <Image className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-2">
                              <Label 
                                htmlFor="photos" 
                                className="cursor-pointer text-estate-navy hover:text-estate-navy/90 font-medium"
                              >
                                Click to upload
                              </Label>
                              <Input 
                                id="photos"
                                type="file" 
                                onChange={handleFileChange} 
                                multiple
                                accept="image/*"
                                className="hidden"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG, WEBP up to 5MB each (Maximum 5 files)
                              </p>
                            </div>
                            {files && (
                              <div className="mt-4 text-sm text-left">
                                <p className="font-medium">{files.length} file(s) selected</p>
                                <ul className="list-disc pl-5 mt-2 text-gray-600">
                                  {Array.from(files).map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setActiveTab("location")}
                        >
                          Previous
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-estate-navy hover:bg-estate-navy/90"
                        >
                          Submit Property
                        </Button>
                      </div>
                    </TabsContent>
                  </form>
                </Tabs>
              </CardContent>
              
              <CardFooter className="bg-gray-50 border-t p-4 text-sm text-gray-500 text-center">
                By submitting this form, you agree to our terms and conditions regarding property listings.
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListPropertyPage;
