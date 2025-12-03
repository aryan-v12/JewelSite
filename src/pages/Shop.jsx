/**
 * Shop Page with filters and product grid
 * ShreeRatna - Heritage Jewelry Collection
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, X, ChevronDown, ChevronUp, Search, Grid, LayoutGrid, SlidersHorizontal, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/features/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Loader';
import { Helmet } from 'react-helmet-async';

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [totalCount, setTotalCount] = useState(0);

  // Filter states - initialize from URL params
  const [filters, setFilters] = useState(() => ({
    category: searchParams.get('category') || '',
    region: searchParams.get('region') || '',
    priceRange: searchParams.get('price') || '',
    sortBy: searchParams.get('sort') || 'newest',
    search: searchParams.get('search') || '',
    featured: searchParams.get('featured') === 'true',
    bestseller: searchParams.get('bestseller') === 'true',
  }));

  const gridRef = useRef(null);
  const heroRef = useRef(null);
  const filterRef = useRef(null);

  // Fetch products - memoized to prevent unnecessary re-renders
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('products').select('*', { count: 'exact' }).eq('is_active', true);

      if (filters.category) query = query.eq('category', filters.category);
      if (filters.region) query = query.eq('region', filters.region);
      if (filters.featured) query = query.eq('featured', true);
      if (filters.bestseller) query = query.eq('bestseller', true);
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Price range
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (min) query = query.gte('price', min);
        if (max) query = query.lte('price', max);
      }

      // Sorting
      switch (filters.sortBy) {
        case 'price-low': query = query.order('price', { ascending: true }); break;
        case 'price-high': query = query.order('price', { ascending: false }); break;
        case 'name': query = query.order('name', { ascending: true }); break;
        default: query = query.order('created_at', { ascending: false });
      }

      const { data, count, error } = await query;
      if (error) throw error;
      setProducts(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setTotalCount(0);
    }
    setIsLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Hero parallax animation
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelector('.hero-content'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, []);

  // Animate products on load
  useEffect(() => {
    if (!isLoading && products.length && gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );
    }
  }, [isLoading, products]);

  // Update filter with proper state management
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      return newFilters;
    });

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value.toString());
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const clearFilters = useCallback(() => {
    setFilters({
      category: '', region: '', priceRange: '', sortBy: 'newest', search: '', featured: false, bestseller: false
    });
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'diamond', label: 'Diamond' },
    { value: 'gold', label: 'Gold' },
    { value: 'silver', label: 'Silver' },
  ];

  // Updated to include all 10 regions
  const regions = [
    { value: '', label: 'All Regions' },
    { value: 'Pan-Indian', label: 'Pan-Indian' },
    { value: 'Rajasthani', label: 'Rajasthani (Kundan)' },
    { value: 'Bengali', label: 'Bengali (Filigree)' },
    { value: 'South Indian', label: 'South Indian (Temple)' },
    { value: 'Maharashtrian', label: 'Maharashtrian (Thushi)' },
    { value: 'Punjabi', label: 'Punjabi (Jadau)' },
    { value: 'Gujarati', label: 'Gujarati (Bandhani)' },
    { value: 'Kashmiri', label: 'Kashmiri (Filigree)' },
    { value: 'Assamese', label: 'Assamese (Jonbiri)' },
    { value: 'Odia', label: 'Odia (Tarakasi)' },
    { value: 'Kerala', label: 'Kerala (Palakka)' },
  ];

  const priceRanges = [
    { value: '', label: 'All Prices' },
    { value: '0-10000', label: 'Under ₹10,000' },
    { value: '10000-50000', label: '₹10,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000-500000', label: '₹1,00,000 - ₹5,00,000' },
    { value: '500000-', label: 'Above ₹5,00,000' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
  ];

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => v && k !== 'sortBy').length;

  return (
    <>
      <Helmet>
        <title>Shop Jewelry | ShreeRatna - Heritage Jewelry</title>
        <meta name="description" content="Browse our exquisite collection of diamond, gold, and silver jewelry. Authentic Indian regional designs from 10+ traditions." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-cream-100 via-ivory to-cream-100 relative">
        {/* Subtle Background Pattern */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div className="absolute top-20 left-[5%] w-64 h-64 border-2 border-maroon-600 rounded-full" />
          <div className="absolute top-1/4 right-[10%] w-96 h-96 border border-gold-500 rounded-full" />
          <div className="absolute bottom-1/3 left-[15%] w-48 h-48 border border-peacock-500 rounded-full" />
          <div className="absolute bottom-20 right-[20%] w-72 h-72 border-2 border-maroon-500 rounded-full" />
        </div>

        {/* Hero Header */}
        <div ref={heroRef} className="relative bg-gradient-to-br from-maroon-800 via-maroon-700 to-maroon-800 text-white overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gold-400 rounded-full" />
            <div className="absolute bottom-5 right-20 w-48 h-48 border border-gold-400 rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white/30 rotate-45" />
          </div>

          <div className="container-custom py-10 sm:py-12 md:py-14 relative z-10 px-4 sm:px-6">
            <div className="hero-content text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                <span className="text-gold-300 font-medium tracking-wider uppercase text-xs sm:text-sm">Heritage Collection</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2 sm:mb-3 text-white">
                Our Collection
              </h1>
              <p className="text-maroon-100 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                Discover {totalCount}+ exquisite pieces from India's finest jewelry traditions
              </p>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 32C672 35 768 40 864 42C960 45 1056 45 1152 42C1248 40 1344 35 1392 32L1440 30V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z" fill="#FDF8F3"/>
            </svg>
          </div>
        </div>

        {/* Filters Bar - Light theme */}
        <div ref={filterRef} className="bg-white/80 backdrop-blur-sm border-b border-gold-200 shadow-sm relative z-10">
          <div className="container-custom py-3 sm:py-4 px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              {/* Left - Filter button & search */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 transition-all duration-300 font-sans shadow-sm group text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  <span className="hidden sm:inline">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 bg-gold-400 text-maroon-800 text-xs font-bold rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                  {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    placeholder="Search jewelry..."
                    className="pl-10 pr-4 py-2.5 w-64 border-2 border-gold-200 rounded-lg focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/20 outline-none text-sm bg-white text-brown-800 placeholder-brown-400 transition-all"
                  />
                </div>

                {/* Active filter tags */}
                {activeFilterCount > 0 && (
                  <div className="hidden lg:flex items-center gap-2 flex-wrap">
                    {filters.category && (
                      <span className="px-3 py-1 bg-peacock-100 text-peacock-700 rounded-full text-xs font-medium flex items-center gap-1 border border-peacock-300">
                        {filters.category}
                        <button onClick={() => updateFilter('category', '')} className="hover:text-peacock-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.region && (
                      <span className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-xs font-medium flex items-center gap-1 border border-saffron-300">
                        {filters.region}
                        <button onClick={() => updateFilter('region', '')} className="hover:text-saffron-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Right - Sort & View */}
              <div className="flex items-center gap-2 sm:gap-3">
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gold-200 rounded-lg bg-white text-brown-700 focus:border-maroon-500 outline-none text-xs sm:text-sm font-sans cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>

                <div className="hidden sm:flex items-center gap-1 bg-cream-200 rounded-lg p-1 border border-gold-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-maroon-600 text-white shadow-sm' : 'text-brown-600 hover:bg-cream-300'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    title="List View"
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-maroon-600 text-white shadow-sm' : 'text-brown-600 hover:bg-cream-300'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Filters Panel */}
            <div className={`overflow-hidden transition-all duration-300 ${isFilterOpen ? 'max-h-96 opacity-100 mt-4 pt-4 border-t border-gold-200' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-xs font-medium text-maroon-700 mb-1.5 uppercase tracking-wide">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gold-200 rounded-lg bg-white text-brown-700 focus:border-maroon-500 outline-none text-xs sm:text-sm cursor-pointer"
                  >
                    {categories.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Region Filter */}
                <div>
                  <label className="block text-xs font-medium text-maroon-700 mb-1.5 uppercase tracking-wide">Region</label>
                  <select
                    value={filters.region}
                    onChange={(e) => updateFilter('region', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gold-200 rounded-lg bg-white text-brown-700 focus:border-maroon-500 outline-none text-xs sm:text-sm cursor-pointer"
                  >
                    {regions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-xs font-medium text-maroon-700 mb-1.5 uppercase tracking-wide">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => updateFilter('priceRange', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gold-200 rounded-lg bg-white text-brown-700 focus:border-maroon-500 outline-none text-xs sm:text-sm cursor-pointer"
                  >
                    {priceRanges.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Quick Filters */}
                <div>
                  <label className="block text-xs font-medium text-maroon-700 mb-1.5 uppercase tracking-wide">Quick Filters</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateFilter('featured', !filters.featured)}
                      className={`flex-1 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs font-medium transition-all ${filters.featured ? 'bg-maroon-600 text-white' : 'bg-cream-100 text-brown-600 border border-gold-200 hover:border-maroon-400'}`}
                    >
                      Featured
                    </button>
                    <button
                      onClick={() => updateFilter('bestseller', !filters.bestseller)}
                      className={`flex-1 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs font-medium transition-all ${filters.bestseller ? 'bg-maroon-600 text-white' : 'bg-cream-100 text-brown-600 border border-gold-200 hover:border-maroon-400'}`}
                    >
                      Bestseller
                    </button>
                  </div>
                </div>

                {/* Clear Button */}
                <div className="flex items-end col-span-2 sm:col-span-1">
                  <button
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-maroon-600 border-2 border-maroon-300 rounded-lg hover:bg-maroon-50 transition-all text-xs sm:text-sm font-medium"
                  >
                    <X className="w-4 h-4" /> Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="container-custom py-8 sm:py-10 px-4 sm:px-6 relative z-10">
          {/* Results count */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <p className="text-brown-700 text-sm sm:text-base font-medium">
              Showing <span className="font-bold text-maroon-700">{products.length}</span> of <span className="font-bold text-maroon-800">{totalCount}</span> products
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 sm:py-16 md:py-20 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gold-200">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-maroon-600 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-maroon-700 mb-2 sm:mb-3">
                No products found
              </h3>
              <p className="text-brown-500 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base px-4">
                We couldn't find any jewelry matching your criteria. Try adjusting your filters or exploring our other collections.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-maroon-600 to-maroon-700 text-white rounded-lg font-bold hover:from-maroon-500 hover:to-maroon-600 transition-all shadow-lg text-sm sm:text-base"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              ref={gridRef}
              className={`grid gap-3 sm:gap-4 md:gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 lg:grid-cols-2'
              }`}
            >
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>

        {/* Back to top button */}
        <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-maroon-600 text-white rounded-full shadow-lg hover:bg-maroon-700 transition-all flex items-center justify-center group"
            title="Back to top"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Shop;
