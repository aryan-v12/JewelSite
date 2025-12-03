/**
 * SearchBar Component with live suggestions
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Search, X, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const trendingSearches = [
    'Diamond necklace', 'Gold bangles', 'Silver jhumkas',
    'Bridal jewelry', 'Temple jewelry', 'Kundan set'
  ];

  // Animation on open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
      setTimeout(() => inputRef.current?.focus(), 100);

      // Load recent searches from localStorage
      const stored = localStorage.getItem('recentSearches');
      if (stored) setRecentSearches(JSON.parse(stored));
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Fetch suggestions
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const { data } = await supabase
          .from('products')
          .select('id, name, category, images')
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
          .eq('is_active', true)
          .limit(6);

        setSuggestions(data || []);
      } catch (error) {
        console.error('Search error:', error);
      }
      setIsLoading(false);
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearch = (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    // Save to recent searches
    const updated = [q, ...recentSearches.filter(s => s !== q)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    navigate(`/shop?search=${encodeURIComponent(q)}`);
    handleClose();
  };

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(modalRef.current, {
      opacity: 0, y: -30, duration: 0.2,
      onComplete: () => {
        setQuery('');
        setSuggestions([]);
        onClose();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl mx-auto mt-20 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-4 p-4 border-b border-gold-100">
            <Search className="w-6 h-6 text-gold-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for diamond, gold, silver jewelry..."
              className="flex-1 text-lg font-sans text-brown-800 placeholder-brown-300 
                       outline-none bg-transparent"
            />
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-brown-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4">
                <h4 className="text-xs font-sans font-semibold text-brown-400 uppercase mb-3">
                  Products
                </h4>
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => { navigate(`/product/${product.id}`); handleClose(); }}
                    className="flex items-center gap-3 w-full p-2 hover:bg-gold-50 rounded-lg transition"
                  >
                    <img
                      src={product.images?.[0] || '/placeholder.jpg'}
                      alt=""
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="text-left">
                      <p className="font-sans text-brown-800">{product.name}</p>
                      <p className="text-xs text-gold-600 capitalize">{product.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Trending searches */}
            {query.length < 2 && (
              <div className="p-4">
                <h4 className="flex items-center gap-2 text-xs font-sans font-semibold text-brown-400 uppercase mb-3">
                  <TrendingUp className="w-4 h-4" /> Trending Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-3 py-1.5 bg-gold-50 text-gold-700 rounded-full text-sm 
                               hover:bg-gold-100 transition font-sans"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
