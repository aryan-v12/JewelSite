/**
 * Navbar Component with GSAP scroll animations
 * Features: Hide/show on scroll, cart count, user menu, mobile menu
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search, ShoppingBag, Heart, User, Menu, X, ChevronDown,
  Diamond, Gem, CircleDot
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import useCartStore from '../../store/useCartStore';
import useWishlistStore from '../../store/useWishlistStore';
import SearchBar from '../features/SearchBar';
import AuthModal from '../features/AuthModal';
import CartDrawer from '../features/CartDrawer';
import Tooltip from '../ui/Tooltip';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation for navbar visibility
  useEffect(() => {
    gsap.to(navRef.current, {
      y: isVisible ? 0 : -100,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isVisible]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const categories = [
    { name: 'Diamond', href: '/shop?category=diamond', icon: Diamond, color: 'text-blue-400' },
    { name: 'Gold', href: '/shop?category=gold', icon: Gem, color: 'text-gold-500' },
    { name: 'Silver', href: '/shop?category=silver', icon: CircleDot, color: 'text-gray-400' },
  ];

  const subcategories = ['Necklace', 'Ring', 'Earrings', 'Bracelet', 'Anklet'];

  // Expanded to 10+ Indian regional jewelry traditions
  const regions = [
    { name: 'Rajasthani', description: 'Kundan & Meenakari artistry' },
    { name: 'Bengali', description: 'Delicate filigree designs' },
    { name: 'South Indian', description: 'Temple & Kemp jewelry' },
    { name: 'Maharashtrian', description: 'Kolhapuri & Thushi styles' },
    { name: 'Punjabi', description: 'Bold Jadau & Polki work' },
    { name: 'Gujarati', description: 'Colorful Bandhani patterns' },
    { name: 'Kashmiri', description: 'Intricate silver filigree' },
    { name: 'Assamese', description: 'Traditional Jonbiri & Gamkharu' },
    { name: 'Odia', description: 'Silver filigree Tarakasi' },
    { name: 'Kerala', description: 'Nagapadam & Palakka' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-elegant'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Top bar - Announcement */}
        <div className="bg-gradient-to-r from-maroon-600 to-maroon-500 text-white py-2 text-center text-sm font-sans">
          <p>✨ Free Shipping on Orders Above ₹50,000 | Use Code: SHREE10 for 10% Off ✨</p>
        </div>

        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo - ShreeRatna */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              aria-label="ShreeRatna Home"
            >
              <div className="relative w-11 h-11">
                <svg viewBox="0 0 44 44" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E8D48A" />
                      <stop offset="50%" stopColor="#C9A227" />
                      <stop offset="100%" stopColor="#8B6914" />
                    </linearGradient>
                    <linearGradient id="logoMaroon" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A52A2A" />
                      <stop offset="100%" stopColor="#800020" />
                    </linearGradient>
                  </defs>
                  <circle cx="22" cy="22" r="20" fill="url(#logoMaroon)" stroke="url(#logoGold)" strokeWidth="2"/>
                  <polygon points="22,6 40,22 22,38 4,22" fill="url(#logoGold)" opacity="0.95" />
                  <circle cx="22" cy="22" r="6" fill="url(#logoMaroon)" />
                  <circle cx="22" cy="22" r="3" fill="#E8D48A" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-semibold text-brown-800 group-hover:text-gold-600 transition-colors tracking-wide">
                  ShreeRatna
                </span>
                <span className="text-[10px] font-sans tracking-[0.25em] text-maroon-600 uppercase">
                  Heritage Jewelry
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="nav-link font-sans text-brown-800 hover:text-gold-600 transition-colors">
                Home
              </Link>

              {/* Shop Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('shop')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to="/shop"
                  className="nav-link font-sans text-brown-800 hover:text-gold-600 transition-colors flex items-center gap-1"
                >
                  Shop <ChevronDown className="w-4 h-4" />
                </Link>

                {/* Mega Menu */}
                {activeDropdown === 'shop' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]">
                    <div className="bg-white rounded-2xl shadow-elegant p-6 grid grid-cols-3 gap-6">
                      {/* Categories */}
                      <div>
                        <h4 className="font-display font-semibold text-brown-800 mb-3">Categories</h4>
                        <ul className="space-y-2">
                          {categories.map((cat) => (
                            <li key={cat.name}>
                              <Link
                                to={cat.href}
                                className="flex items-center gap-2 text-brown-600 hover:text-gold-600 transition-colors"
                              >
                                <cat.icon className={`w-4 h-4 ${cat.color}`} />
                                {cat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Types */}
                      <div>
                        <h4 className="font-display font-semibold text-brown-800 mb-3">Jewelry Type</h4>
                        <ul className="space-y-2">
                          {subcategories.map((sub) => (
                            <li key={sub}>
                              <Link
                                to={`/shop?subcategory=${sub.toLowerCase()}`}
                                className="text-brown-600 hover:text-gold-600 transition-colors"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Regions */}
                      <div>
                        <h4 className="font-display font-semibold text-brown-800 mb-3">By Region</h4>
                        <ul className="space-y-2">
                          {regions.map((region) => (
                            <li key={region.name}>
                              <Link
                                to={`/shop?region=${region.name}`}
                                className="text-brown-600 hover:text-gold-600 transition-colors text-sm"
                              >
                                {region.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/about" className="nav-link font-sans text-brown-800 hover:text-gold-600 transition-colors">
                About
              </Link>
              <Link to="/contact" className="nav-link font-sans text-brown-800 hover:text-gold-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <Tooltip content="Search" position="bottom">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-gold-100 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-brown-800" />
                </button>
              </Tooltip>

              {/* Wishlist */}
              <Tooltip content="Wishlist" position="bottom">
                <Link
                  to="/wishlist"
                  className="p-2 rounded-full hover:bg-gold-100 transition-colors relative"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5 text-brown-800" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              </Tooltip>

              {/* Cart */}
              <Tooltip content="Cart" position="bottom">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 rounded-full hover:bg-gold-100 transition-colors relative"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="w-5 h-5 text-brown-800" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Tooltip>

              {/* User */}
              {isAuthenticated ? (
                <Tooltip content="My Account" position="bottom">
                  <Link
                    to="/profile"
                    className="p-2 rounded-full hover:bg-gold-100 transition-colors"
                    aria-label="Profile"
                  >
                    <User className="w-5 h-5 text-brown-800" />
                  </Link>
                </Tooltip>
              ) : (
                <Tooltip content="Sign In" position="bottom">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="p-2 rounded-full hover:bg-gold-100 transition-colors"
                    aria-label="Sign in"
                  >
                    <User className="w-5 h-5 text-brown-800" />
                  </button>
                </Tooltip>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-gold-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-brown-800" />
                ) : (
                  <Menu className="w-6 h-6 text-brown-800" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gold-100">
            <div className="container-custom py-4 space-y-4">
              <Link to="/" className="block py-2 font-sans text-brown-800">Home</Link>
              <Link to="/shop" className="block py-2 font-sans text-brown-800">Shop</Link>
              <Link to="/about" className="block py-2 font-sans text-brown-800">About</Link>
              <Link to="/contact" className="block py-2 font-sans text-brown-800">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
