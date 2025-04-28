
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Search, Menu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
          <Link to="/properties" className="text-sm font-medium hover:text-estate-gold transition-colors">
            Properties
          </Link>
          <Link to="/map" className="text-sm font-medium hover:text-estate-gold transition-colors">
            Map
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-estate-gold transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-estate-gold transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button size="sm" variant="ghost" className="gap-1">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
          
          <Button size="sm" variant="outline" className="gap-1">
            <User className="h-4 w-4" />
            <span>Login</span>
          </Button>
          
          <Button size="sm" className="bg-estate-navy hover:bg-estate-navy/90">
            List Property
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
            <Link 
              to="/about" 
              className="text-sm font-medium p-2 hover:bg-estate-lightGray rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-sm font-medium p-2 hover:bg-estate-lightGray rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-2 flex flex-col gap-2">
              <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Button>
              
              <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
              
              <Button size="sm" className="w-full bg-estate-navy hover:bg-estate-navy/90">
                List Property
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
