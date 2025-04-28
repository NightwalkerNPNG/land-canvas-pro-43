
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Home, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollNavigation = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Check for scroll instructions when navigating to home page
    if (location.pathname === '/' && location.state && (location.state as any).scrollTo) {
      setTimeout(() => {
        const element = document.getElementById((location.state as any).scrollTo);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-playfair font-bold text-estate-navy">
            <span className="text-estate-gold">Estate</span>Pro
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-estate-gold transition-colors">
            <Home className="h-4 w-4 inline mr-1" />
            Home
          </Link>
          <Link to="/properties" className="text-sm font-medium hover:text-estate-gold transition-colors">
            Properties
          </Link>
          <Link to="/map" className="text-sm font-medium hover:text-estate-gold transition-colors">
            Map
          </Link>
          <button 
            onClick={() => handleScrollNavigation('about')} 
            className="text-sm font-medium hover:text-estate-gold transition-colors"
          >
            About
          </button>
          <button
            onClick={() => handleScrollNavigation('contact')}
            className="text-sm font-medium hover:text-estate-gold transition-colors"
          >
            Contact
          </button>
        </nav>
        
        <div className="hidden md:flex items-center">
          <Button size="sm" className="bg-estate-navy hover:bg-estate-navy/90" asChild>
            <Link to="/list-property">List Property</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-sm font-medium p-2 hover:bg-estate-lightGray rounded flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            <Link 
              to="/properties" 
              className="text-sm font-medium p-2 hover:bg-estate-lightGray rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <Link 
              to="/map" 
              className="text-sm font-medium p-2 hover:bg-estate-lightGray rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Map
            </Link>
            <button 
              onClick={() => handleScrollNavigation('about')}
              className="text-sm font-medium p-2 hover:bg-estate-lightGray rounded text-left"
            >
              About
            </button>
            <button 
              onClick={() => handleScrollNavigation('contact')}
              className="text-sm font-medium p-2 hover:bg-estate-lightGray rounded text-left"
            >
              Contact
            </button>
            
            <div className="pt-2">
              <Button size="sm" className="w-full bg-estate-navy hover:bg-estate-navy/90" asChild>
                <Link to="/list-property">List Property</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
