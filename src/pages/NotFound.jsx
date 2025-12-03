/**
 * 404 Not Found Page
 */

import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Jewel Elegance</title>
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center bg-cream-100">
        <div className="text-center px-4">
          {/* Decorative 404 */}
          <div className="relative inline-block mb-8">
            <span className="text-[12rem] md:text-[16rem] font-display font-bold text-gold-100 select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-elegant flex items-center justify-center">
                <Search className="w-12 h-12 text-gold-500" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-brown-800 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-brown-500 max-w-md mx-auto mb-8">
            The page you're looking for seems to have wandered off like a lost gem. 
            Let us help you find your way back.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button icon={Home}>
              <Link to="/">Go Home</Link>
            </Button>
            <Button variant="outline" icon={ArrowLeft}>
              <Link to="/shop">Browse Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
