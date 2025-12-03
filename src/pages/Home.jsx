/**
 * ShreeRatna Home Page
 * Features: Enhanced GSAP animations, parallax scrolling, Indian heritage design
 * Cultural motifs: Lotus, paisley patterns, temple architecture references
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Sparkles, Crown, Award, Gem } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/features/ProductCard';
import Button from '../components/ui/Button';
import { ProductCardSkeleton } from '../components/ui/Loader';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const categoriesRef = useRef(null);
  const featuredRef = useRef(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const [featuredRes, bestsellersRes] = await Promise.all([
          supabase.from('products').select('*').eq('featured', true).eq('is_active', true).limit(4),
          supabase.from('products').select('*').eq('bestseller', true).eq('is_active', true).limit(8),
        ]);
        setFeaturedProducts(featuredRes.data || []);
        setBestsellers(bestsellersRes.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  // Hero animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo(
        heroTextRef.current?.children,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );

      // Hero image parallax
      gsap.to(heroImageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Categories animation
      ScrollTrigger.create({
        trigger: categoriesRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            categoriesRef.current?.querySelectorAll('.category-card'),
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' }
          );
        },
        once: true,
      });

      // Featured section animation
      ScrollTrigger.create({
        trigger: featuredRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            featuredRef.current?.querySelector('.section-header'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  // Metal categories with Indian aesthetic
  const categories = [
    {
      name: 'Diamond',
      description: 'Eternal brilliance, timeless beauty',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',
      href: '/shop?category=diamond',
      color: 'from-peacock-500/20 to-peacock-400/20',
      accent: 'text-peacock-600',
    },
    {
      name: 'Gold',
      description: 'Sacred tradition, pure elegance',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600',
      href: '/shop?category=gold',
      color: 'from-gold-500/20 to-saffron-400/20',
      accent: 'text-gold-600',
    },
    {
      name: 'Silver',
      description: 'Refined artistry, modern grace',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
      href: '/shop?category=silver',
      color: 'from-gray-400/20 to-slate-400/20',
      accent: 'text-gray-600',
    },
  ];

  // Expanded to 10 Indian regional jewelry traditions
  const regions = [
    { name: 'Rajasthani', description: 'Kundan & Meenakari artistry', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400', specialty: 'Kundan' },
    { name: 'Bengali', description: 'Delicate filigree designs', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400', specialty: 'Filigree' },
    { name: 'South Indian', description: 'Temple & Kemp jewelry', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=400', specialty: 'Temple' },
    { name: 'Maharashtrian', description: 'Kolhapuri & Thushi styles', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400', specialty: 'Thushi' },
    { name: 'Punjabi', description: 'Bold Jadau & Polki work', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', specialty: 'Jadau' },
    { name: 'Gujarati', description: 'Colorful Bandhani patterns', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400', specialty: 'Bandhani' },
    { name: 'Kashmiri', description: 'Intricate silver filigree', image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400', specialty: 'Jhumka' },
    { name: 'Assamese', description: 'Traditional Jonbiri & Gamkharu', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', specialty: 'Jonbiri' },
    { name: 'Odia', description: 'Silver filigree Tarakasi', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400', specialty: 'Tarakasi' },
    { name: 'Kerala', description: 'Nagapadam & Palakka designs', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400', specialty: 'Palakka' },
  ];

  return (
    <div className="overflow-hidden bg-gradient-to-b from-cream-100 via-ivory to-cream-100">
      {/* Hero Section - Enhanced with Indian heritage aesthetics */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] md:min-h-[95vh] flex items-center overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div
          ref={heroImageRef}
          className="absolute inset-0 z-0"
        >
          {/* Gradient overlay with maroon/gold tones */}
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-800/95 via-maroon-700/85 to-maroon-600/80 z-10" />
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 pattern-paisley z-10 opacity-20" />
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920"
            alt="ShreeRatna luxury Indian jewelry collection"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        {/* Decorative floating elements - Indian motifs */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden md:block">
          <Gem className="absolute top-1/4 right-1/4 w-10 h-10 text-gold-400 animate-float opacity-50" />
          <Sparkles className="absolute top-1/3 right-1/5 w-8 h-8 text-gold-300 animate-float-slow opacity-40" style={{ animationDelay: '1s' }} />
          <Crown className="absolute bottom-1/4 right-1/3 w-12 h-12 text-saffron-400 animate-float opacity-30" style={{ animationDelay: '2s' }} />
          <Star className="absolute top-1/2 right-1/6 w-6 h-6 text-gold-200 animate-float-delayed opacity-40" />
          {/* Decorative circles - like temple motifs */}
          <div className="absolute top-20 left-20 w-32 h-32 border border-gold-400/20 rounded-full animate-spin-slow" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-gold-300/10 rounded-full animate-spin-reverse" />
        </div>

        {/* Hero Content */}
        <div className="container-custom relative z-20 px-4 sm:px-6">
          <div ref={heroTextRef} className="max-w-2xl text-white">
            {/* Ornate tagline */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold-400" />
              <p className="text-gold-400 font-sans tracking-[0.2em] sm:tracking-[0.35em] uppercase text-xs sm:text-sm">
                Celebrating Indian Heritage
              </p>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-tight mb-4 sm:mb-6">
              Discover the Art of
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-saffron-400">
                Timeless Elegance
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-cream-200 mb-6 sm:mb-10 leading-relaxed max-w-xl">
              Experience the finest handcrafted jewelry celebrating India's rich cultural heritage.
              From Rajasthani Kundan to South Indian Temple designs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/shop" className="w-full sm:w-auto">
                <Button icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700">
                  Explore Collection
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-gold-400/60 text-gold-100 hover:bg-gold-400/20 hover:border-gold-400">
                  Our Heritage
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gold-400/20">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gold-400">10+</p>
                <p className="text-[10px] sm:text-xs text-cream-300 uppercase tracking-wider">Regional Styles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gold-400">500+</p>
                <p className="text-[10px] sm:text-xs text-cream-300 uppercase tracking-wider">Unique Designs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-display font-bold text-gold-400">BIS</p>
                <p className="text-[10px] sm:text-xs text-cream-300 uppercase tracking-wider">Hallmarked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-gold-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Categories Section - Light bg with elegant glowing design */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-ivory via-cream-50 to-ivory relative overflow-hidden" ref={categoriesRef}>
        {/* Enhanced Diamond Pattern Background with Glowing Gem Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ filter: 'blur(0.3px)' }}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Enhanced glow filter for gem effect */}
              <filter id="diamondGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.1  0 1 0 0 0.05  0 0 1 0 0  0 0 0 1.5 0" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="diamondPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                {/* Main diamond with glow */}
                <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#D4AF37" strokeWidth="1.8" filter="url(#diamondGlow)" />
                {/* Inner diamond */}
                <path d="M30 10 L50 30 L30 50 L10 30 Z" fill="none" stroke="#E8C547" strokeWidth="1" filter="url(#diamondGlow)" />
                {/* Center glowing gem - multi-layer */}
                <circle cx="30" cy="30" r="5" fill="#D4AF37" opacity="0.3" filter="url(#diamondGlow)" />
                <circle cx="30" cy="30" r="3" fill="#F5D76E" filter="url(#diamondGlow)" />
                <circle cx="30" cy="30" r="1.5" fill="#FFFACD" />
                {/* Corner gem accents with enhanced glow */}
                <circle cx="0" cy="0" r="3" fill="#D4AF37" opacity="0.4" filter="url(#diamondGlow)" />
                <circle cx="0" cy="0" r="1.5" fill="#FFE066" />
                <circle cx="60" cy="0" r="3" fill="#D4AF37" opacity="0.4" filter="url(#diamondGlow)" />
                <circle cx="60" cy="0" r="1.5" fill="#FFE066" />
                <circle cx="0" cy="60" r="3" fill="#D4AF37" opacity="0.4" filter="url(#diamondGlow)" />
                <circle cx="0" cy="60" r="1.5" fill="#FFE066" />
                <circle cx="60" cy="60" r="3" fill="#D4AF37" opacity="0.4" filter="url(#diamondGlow)" />
                <circle cx="60" cy="60" r="1.5" fill="#FFE066" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diamondPattern)" />
          </svg>
        </div>

        {/* Floating glowing orbs - responsive */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[5%] sm:left-[8%] w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-gold-400/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-[60%] right-[3%] sm:right-[5%] w-32 sm:w-40 md:w-56 h-32 sm:h-40 md:h-56 bg-gold-300/8 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <div className="absolute bottom-[15%] left-[15%] sm:left-[20%] w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-saffron-400/10 rounded-full blur-xl sm:blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        </div>

        {/* Decorative circle elements with glow */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute top-20 left-[5%] w-32 h-32 border-2 border-gold-400/30 rounded-full" style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.15)' }} />
          <div className="absolute bottom-20 right-[10%] w-48 h-48 border border-gold-300/25 rounded-full" style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.1)' }} />
          <div className="absolute top-1/2 right-[3%] w-24 h-24 border border-maroon-300/20 rounded-full" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6">
          {/* Section header with ornate divider */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-transparent to-gold-400" />
              <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-gold-500 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))' }} />
              <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-l from-transparent to-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-maroon-800 mb-3 sm:mb-4">
              Precious Collections
            </h2>
            <p className="text-brown-600 max-w-2xl mx-auto text-base sm:text-lg px-4">
              Explore our curated collections of sacred metals and eternal gemstones
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.href}
                className="category-card group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-500 hover:-translate-y-3 active:-translate-y-1 border border-gold-200/50 hover:border-gold-400/60 active:border-gold-400/60 touch-manipulation"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 40px rgba(212, 175, 55, 0.05)'
                }}
              >
                <img
                  src={category.image}
                  alt={`${category.name} jewelry collection`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-105"
                  loading="lazy"
                />

                {/* Glowing border effect on hover/active */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                     style={{ boxShadow: 'inset 0 0 30px rgba(212, 175, 55, 0.3), 0 0 50px rgba(212, 175, 55, 0.2)' }} />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/95 via-maroon-800/50 to-transparent group-hover:from-maroon-900/90 group-active:from-maroon-900/90 transition-all duration-500" />

                {/* Glowing accent at top */}
                <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-gold-400/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
                  <span className="text-[10px] sm:text-xs md:text-sm font-sans uppercase tracking-widest mb-1 sm:mb-2 text-gold-400 drop-shadow-lg"
                        style={{ textShadow: '0 0 10px rgba(212, 175, 55, 0.5)' }}>
                    Collection
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold mb-1 sm:mb-2 group-hover:text-gold-300 group-active:text-gold-300 transition-colors drop-shadow-lg">
                    {category.name}
                  </h3>
                  <p className="text-cream-200 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-5 line-clamp-2">{category.description}</p>
                  <span className="inline-flex items-center gap-2 text-gold-400 font-sans font-medium group-hover:gap-3 group-active:gap-3 transition-all text-xs sm:text-sm md:text-base"
                        style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.4)' }}>
                    Explore <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </span>
                </div>

                {/* Decorative corners with glow */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-gold-400/40 group-hover:border-gold-400/80 group-active:border-gold-400/80 transition-all duration-300"
                     style={{ filter: 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.3))' }} />
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-gold-400/40 group-hover:border-gold-400/80 group-active:border-gold-400/80 transition-all duration-300"
                     style={{ filter: 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.3))' }} />

                {/* Gem icon with glow - hidden on mobile for cleaner look */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gold-500/20 backdrop-blur-sm rounded-full hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"
                     style={{ boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' }}>
                  <Gem className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gold-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Light cream bg with enhanced glowing effects */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-100 relative overflow-hidden" ref={featuredRef}>
        {/* Enhanced Hexagonal/Honeycomb Pattern Background with Glowing Gem Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ filter: 'blur(0.3px)' }}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Enhanced glow filter for gem effect */}
              <filter id="hexGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.1  0 1 0 0 0.05  0 0 1 0 0  0 0 0 1.5 0" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="hexagonPattern" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
                {/* Hexagon shapes with enhanced gold glow */}
                <path d="M28 2 L50 15 L50 41 L28 54 L6 41 L6 15 Z" fill="none" stroke="#D4AF37" strokeWidth="1.5" filter="url(#hexGlow)" />
                <path d="M28 48 L50 61 L50 87 L28 100 L6 87 L6 61 Z" fill="none" stroke="#D4AF37" strokeWidth="1.5" filter="url(#hexGlow)" />
                {/* Offset hexagon */}
                <path d="M0 28 L-22 41 L-22 67 L0 80 L22 67 L22 41 Z" fill="none" stroke="#E8C547" strokeWidth="1" transform="translate(56, 0)" filter="url(#hexGlow)" />
                {/* Center glowing jewel dots - multi-layer */}
                <circle cx="28" cy="28" r="6" fill="#D4AF37" opacity="0.3" filter="url(#hexGlow)" />
                <circle cx="28" cy="28" r="4" fill="#F5D76E" filter="url(#hexGlow)" />
                <circle cx="28" cy="28" r="2" fill="#FFFACD" />
                <circle cx="28" cy="74" r="6" fill="#D4AF37" opacity="0.3" filter="url(#hexGlow)" />
                <circle cx="28" cy="74" r="4" fill="#F5D76E" filter="url(#hexGlow)" />
                <circle cx="28" cy="74" r="2" fill="#FFFACD" />
                {/* Inner ring details with glow */}
                <circle cx="28" cy="28" r="9" fill="none" stroke="#E8C547" strokeWidth="0.8" filter="url(#hexGlow)" />
                <circle cx="28" cy="74" r="9" fill="none" stroke="#E8C547" strokeWidth="0.8" filter="url(#hexGlow)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagonPattern)" />
          </svg>
        </div>

        {/* Floating glowing orbs - like Precious Collections */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] right-[10%] w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-gold-400/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute bottom-[20%] left-[5%] w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 bg-gold-300/8 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute top-[50%] left-[30%] w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-saffron-400/8 rounded-full blur-xl sm:blur-2xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }} />
        </div>

        {/* Decorative circle elements with glow */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute top-16 left-[8%] w-28 h-28 border-2 border-gold-400/25 rounded-full" style={{ boxShadow: '0 0 25px rgba(212, 175, 55, 0.12)' }} />
          <div className="absolute bottom-16 right-[12%] w-36 h-36 border border-gold-300/20 rounded-full" style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.1)' }} />
        </div>

        <div className="container-custom px-4 sm:px-6 relative z-10">
          <div className="section-header flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-maroon-700 mb-2">
                Featured Collection
              </h2>
              <p className="text-brown-600 text-sm sm:text-base">Handpicked pieces for the discerning connoisseur</p>
            </div>
            <Link to="/shop?featured=true" className="text-maroon-600 font-sans font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-3 md:mt-0 hover:text-maroon-700 text-sm sm:text-base">
              View All <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {isLoading
              ? Array(4).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
              : featuredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))
            }
          </div>
        </div>
      </section>

      {/* Regional Jewelry Section - 10 Indian Traditions (Story Page Style) */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-maroon-700 via-maroon-600 to-maroon-800 text-white relative overflow-hidden">
        {/* Decorative Background - Story Page Style */}
        <div className="absolute inset-0">
          {/* Floating circles */}
          <div className="absolute top-10 sm:top-20 left-[5%] sm:left-[10%] w-24 sm:w-32 h-24 sm:h-32 border-2 border-gold-400/30 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-20 sm:top-40 right-[10%] sm:right-[15%] w-32 sm:w-48 h-32 sm:h-48 border border-gold-400/20 rounded-full" />
          <div className="absolute bottom-10 sm:bottom-20 left-[15%] sm:left-[20%] w-16 sm:w-24 h-16 sm:h-24 border border-white/10 rotate-45" />
          <div className="absolute bottom-20 sm:bottom-32 right-[20%] sm:right-[25%] w-12 sm:w-16 h-12 sm:h-16 bg-gold-400/10 rounded-full" />
          {/* Additional floating elements */}
          <div className="absolute top-1/2 left-[5%] w-20 h-20 border border-gold-400/15 rounded-full hidden lg:block" />
          <div className="absolute top-1/3 right-[5%] w-28 h-28 border-2 border-gold-400/10 rounded-full hidden lg:block" />

          {/* Paisley pattern overlay - like Story page */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 5c-5 0-10 5-10 15s5 20 10 25c5-5 10-15 10-25S35 5 30 5z\' fill=\'%23C9A227\' fill-opacity=\'0.4\'/%3E%3C/svg%3E")' }} />

          {/* Glowing gold pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ filter: 'blur(1px)' }}>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="regionGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <pattern id="regionPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  {/* Ornate frame corners */}
                  <path d="M0 20 L20 0 M0 0 L0 20 M0 0 L20 0" fill="none" stroke="#D4AF37" strokeWidth="1.5" filter="url(#regionGlow)" />
                  <path d="M60 0 L80 20 M80 0 L60 0 M80 0 L80 20" fill="none" stroke="#D4AF37" strokeWidth="1.5" filter="url(#regionGlow)" />
                  <path d="M0 60 L20 80 M0 80 L0 60 M0 80 L20 80" fill="none" stroke="#D4AF37" strokeWidth="1.5" filter="url(#regionGlow)" />
                  <path d="M60 80 L80 60 M80 80 L60 80 M80 80 L80 60" fill="none" stroke="#D4AF37" strokeWidth="1.5" filter="url(#regionGlow)" />
                  {/* Center jewel */}
                  <circle cx="40" cy="40" r="4" fill="#F5D76E" filter="url(#regionGlow)" />
                  <circle cx="40" cy="40" r="8" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#regionPattern)" />
            </svg>
          </div>
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-14">
            {/* Ornate divider like Story page */}
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 sm:w-12 h-[2px] bg-gold-400" />
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-gold-400" />
              <div className="w-8 sm:w-12 h-[2px] bg-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4">
              <span className="text-gold-400">10</span> Regional Heritage Traditions
            </h2>
            <p className="text-maroon-100/90 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4 leading-relaxed">
              Celebrate India's magnificent diversity through authentic jewelry traditions passed down through generations
            </p>
          </div>

          {/* Grid layout for 10 regions - responsive with touch support */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {regions.map((region, index) => (
              <Link
                key={region.name}
                to={`/shop?region=${region.name}`}
                className="group relative bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden hover:bg-white/20 active:bg-white/25 transition-all duration-500 hover:-translate-y-2 active:-translate-y-1 hover:shadow-xl hover:shadow-gold-400/20 active:shadow-lg active:shadow-gold-400/15 border border-gold-400/20 hover:border-gold-400/50 active:border-gold-400/50 touch-manipulation"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={region.image}
                    alt={`${region.name} jewelry tradition`}
                    className="w-full h-full object-cover group-hover:scale-110 group-active:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Overlay gradient - maroon theme with glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/95 via-maroon-800/50 to-transparent group-hover:from-maroon-900/90 group-active:from-maroon-900/90 transition-all duration-300" />

                  {/* Subtle glow effect on hover/active */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none"
                       style={{ boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.15)' }} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                  {/* Specialty tag */}
                  <span className="inline-block px-1.5 sm:px-2 py-0.5 bg-gold-500/40 text-gold-200 text-[9px] sm:text-[10px] md:text-xs rounded-full mb-1 sm:mb-1.5 md:mb-2 font-sans font-medium"
                        style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.3)' }}>
                    {region.specialty}
                  </span>
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-display font-semibold mb-0.5 group-hover:text-gold-300 group-active:text-gold-300 transition-colors drop-shadow-sm">
                    {region.name}
                  </h3>
                  <p className="text-cream-200/80 text-[9px] sm:text-[10px] md:text-xs line-clamp-1 hidden sm:block">{region.description}</p>
                </div>

                {/* Decorative corner accent with glow */}
                <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 border-t-2 border-l-2 border-gold-400/30 group-hover:border-gold-400/70 group-active:border-gold-400/70 transition-colors"
                     style={{ filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.2))' }} />

                {/* Hover/Active arrow */}
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gold-500/0 group-hover:bg-gold-500 group-active:bg-gold-500 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-active:opacity-100"
                     style={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" />
                </div>
              </Link>
            ))}
          </div>

          {/* View all link - touch friendly */}
          <div className="text-center mt-6 sm:mt-8 md:mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-gold-400 font-sans font-medium hover:gap-3 active:gap-3 transition-all border-b border-gold-400/30 hover:border-gold-400 active:border-gold-400 pb-1 text-sm sm:text-base touch-manipulation px-4 py-2"
            >
              Explore All Regional Collections <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers - Light ivory background with enhanced glowing effects */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-ivory via-cream-50 to-ivory relative overflow-hidden">
        {/* Enhanced Mandala/Floral Pattern Background with Glowing Gem Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ filter: 'blur(0.3px)' }}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Enhanced glow filter for gem effect */}
              <filter id="mandalaGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.1  0 1 0 0 0.05  0 0 1 0 0  0 0 0 1.5 0" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="mandalaPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                {/* Outer decorative rings with enhanced glow */}
                <circle cx="40" cy="40" r="35" fill="none" stroke="#D4AF37" strokeWidth="1" filter="url(#mandalaGlow)" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#E8C547" strokeWidth="1.4" filter="url(#mandalaGlow)" />
                {/* Inner glowing rings */}
                <circle cx="40" cy="40" r="20" fill="none" stroke="#D4AF37" strokeWidth="1" filter="url(#mandalaGlow)" />
                <circle cx="40" cy="40" r="10" fill="none" stroke="#E8C547" strokeWidth="0.8" filter="url(#mandalaGlow)" />
                {/* Center glowing jewel - multi-layer */}
                <circle cx="40" cy="40" r="7" fill="#D4AF37" opacity="0.3" filter="url(#mandalaGlow)" />
                <circle cx="40" cy="40" r="5" fill="#F5D76E" filter="url(#mandalaGlow)" />
                <circle cx="40" cy="40" r="2.5" fill="#FFFACD" />
                {/* Petal/lotus shapes with enhanced gold */}
                <ellipse cx="40" cy="15" rx="4" ry="8" fill="none" stroke="#D4AF37" strokeWidth="1" filter="url(#mandalaGlow)" />
                <ellipse cx="40" cy="65" rx="4" ry="8" fill="none" stroke="#D4AF37" strokeWidth="1" filter="url(#mandalaGlow)" />
                <ellipse cx="15" cy="40" rx="8" ry="4" fill="none" stroke="#D4AF37" strokeWidth="1" filter="url(#mandalaGlow)" />
                <ellipse cx="65" cy="40" rx="8" ry="4" fill="none" stroke="#D4AF37" strokeWidth="1" filter="url(#mandalaGlow)" />
                {/* Diagonal petals with enhanced glow */}
                <ellipse cx="22" cy="22" rx="5" ry="3" fill="none" stroke="#E8C547" strokeWidth="0.8" transform="rotate(45, 22, 22)" filter="url(#mandalaGlow)" />
                <ellipse cx="58" cy="22" rx="5" ry="3" fill="none" stroke="#E8C547" strokeWidth="0.8" transform="rotate(-45, 58, 22)" filter="url(#mandalaGlow)" />
                <ellipse cx="22" cy="58" rx="5" ry="3" fill="none" stroke="#E8C547" strokeWidth="0.8" transform="rotate(-45, 22, 58)" filter="url(#mandalaGlow)" />
                <ellipse cx="58" cy="58" rx="5" ry="3" fill="none" stroke="#E8C547" strokeWidth="0.8" transform="rotate(45, 58, 58)" filter="url(#mandalaGlow)" />
                {/* Corner gem dots - multi-layer */}
                <circle cx="0" cy="0" r="4" fill="#D4AF37" opacity="0.4" filter="url(#mandalaGlow)" />
                <circle cx="0" cy="0" r="2" fill="#FFE066" />
                <circle cx="80" cy="0" r="4" fill="#D4AF37" opacity="0.4" filter="url(#mandalaGlow)" />
                <circle cx="80" cy="0" r="2" fill="#FFE066" />
                <circle cx="0" cy="80" r="4" fill="#D4AF37" opacity="0.4" filter="url(#mandalaGlow)" />
                <circle cx="0" cy="80" r="2" fill="#FFE066" />
                <circle cx="80" cy="80" r="4" fill="#D4AF37" opacity="0.4" filter="url(#mandalaGlow)" />
                <circle cx="80" cy="80" r="2" fill="#FFE066" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mandalaPattern)" />
          </svg>
        </div>

        {/* Floating glowing orbs - like Precious Collections */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[8%] w-24 sm:w-32 md:w-44 h-24 sm:h-32 md:h-44 bg-gold-400/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[15%] right-[10%] w-32 sm:w-40 md:w-52 h-32 sm:h-40 md:h-52 bg-gold-300/8 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.5s' }} />
          <div className="absolute top-[45%] right-[25%] w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 bg-saffron-400/8 rounded-full blur-xl sm:blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }} />
        </div>

        {/* Decorative circle elements with glow */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute top-10 right-[10%] w-40 h-40 border-2 border-gold-400/25 rounded-full" style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.12)' }} />
          <div className="absolute bottom-10 left-[5%] w-32 h-32 border border-gold-300/25 rounded-full" style={{ boxShadow: '0 0 25px rgba(212, 175, 55, 0.1)' }} />
          <div className="absolute top-1/3 left-[3%] w-24 h-24 border border-maroon-300/15 rounded-full" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-maroon-600" />
                <span className="text-maroon-600 font-sans font-semibold text-sm sm:text-base">Customer Favorites</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-maroon-700">
                Bestsellers
              </h2>
            </div>
            <Link to="/shop?bestseller=true" className="text-maroon-600 font-sans font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-3 md:mt-0 hover:text-maroon-700 text-sm sm:text-base">
              Shop All Bestsellers <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {isLoading
              ? Array(4).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
              : bestsellers.slice(0, 4).map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))
            }
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section - Rich Premium Design */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        {/* Luxurious gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900" />

        {/* Golden accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gold-600/10 via-transparent to-gold-500/5" />

        {/* Decorative patterns with low opacity */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-10 left-[10%] w-72 h-72 border-2 border-gold-400 rounded-full" />
          <div className="absolute bottom-10 right-[15%] w-96 h-96 border border-gold-400 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold-400 rounded-full" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Main card with glass morphism */}
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-center relative overflow-hidden border border-gold-400/30 shadow-2xl">
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 via-transparent to-maroon-600/10 pointer-events-none" />

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold-400/40 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold-400/40 rounded-br-2xl" />

              <div className="relative z-10">
                {/* Premium badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500/30 to-gold-400/20 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-6 border border-gold-400/30">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                  <span className="text-gold-300 text-xs sm:text-sm font-semibold tracking-wide">Join the ShreeRatna Family</span>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-5 text-white leading-tight">
                  Stay Connected to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-saffron-400">Tradition</span>
                </h2>
                <p className="text-cream-200/90 max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base md:text-lg leading-relaxed">
                  Subscribe for exclusive offers, new collection previews, and insights into India's rich jewelry heritage.
                </p>

                {/* Email form with premium styling */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto mb-8 sm:mb-10">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-gold-400/30
                               placeholder-cream-300/50 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400
                               text-sm sm:text-base transition-all duration-300"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-gold-500 via-gold-400 to-saffron-500 text-maroon-900 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:from-gold-400 hover:via-gold-300 hover:to-saffron-400 transition-all duration-300 shadow-lg hover:shadow-gold-500/30 text-sm sm:text-base whitespace-nowrap">
                    Subscribe Now
                  </Button>
                </div>

                {/* Trust badges with premium styling */}
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-gold-400/20">
                  <div className="flex items-center gap-2 sm:gap-3 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/30 transition-colors">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />
                    </div>
                    <div className="text-left">
                      <span className="block text-white font-semibold text-sm sm:text-base">BIS Hallmarked</span>
                      <span className="block text-cream-300/60 text-xs">Certified Purity</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/30 transition-colors">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />
                    </div>
                    <div className="text-left">
                      <span className="block text-white font-semibold text-sm sm:text-base">100% Authentic</span>
                      <span className="block text-cream-300/60 text-xs">Genuine Jewelry</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/30 transition-colors">
                      <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-gold-400" />
                    </div>
                    <div className="text-left">
                      <span className="block text-white font-semibold text-sm sm:text-base">Handcrafted</span>
                      <span className="block text-cream-300/60 text-xs">Made with Love</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
