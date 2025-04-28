
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Calendar, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-estate-navy">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-playfair font-semibold mb-4 text-white">
              Contact Us
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-estate-gold mt-1" />
                <span>123 Estate Street, New York, NY 10001, United States</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-estate-gold" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-estate-gold" />
                <span>info@estatepro.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-playfair font-semibold mb-4 text-white">
              Office Hours
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-estate-gold mt-1" />
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Calendar className="h-5 w-5 mr-3 text-estate-gold mt-1" />
                <div>
                  <p className="font-medium">Saturday</p>
                  <p>10:00 AM - 4:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <MessageCircle className="h-5 w-5 mr-3 text-estate-gold mt-1" />
                <div>
                  <p>Schedule a consultation with one of our agents</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-playfair font-semibold mb-4 text-white">
              Find Your Dream Property
            </h2>
            <p className="text-gray-300 mb-4">
              EstatePro is your trusted partner for finding the perfect property. 
              Whether buying, selling, or renting, our experienced team is here to help.
            </p>
            <Button 
              className="bg-estate-gold hover:bg-estate-gold/90 text-white px-6"
              asChild
            >
              <Link to="/properties">
                Browse Properties
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
