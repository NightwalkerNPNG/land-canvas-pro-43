
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You've been subscribed to our newsletter!");
      setEmail('');
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <section className="py-16 bg-estate-navy">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-2 text-white">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter to receive the latest updates on new property listings, market trends, and exclusive offers.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-gold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-estate-gold hover:bg-estate-gold/90 text-white py-3">
              Subscribe
            </Button>
          </form>
          
          <p className="text-gray-400 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
