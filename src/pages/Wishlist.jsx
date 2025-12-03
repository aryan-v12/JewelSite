/**
 * Wishlist Page - Simple and Robust
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import useWishlistStore from '../store/useWishlistStore';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  // Use proper Zustand selectors for reactivity
  const items = useWishlistStore((state) => state.items) ?? [];
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);
  const user = useAuthStore((state) => state.user);

  // Wait for component to mount (handles hydration)
  useEffect(() => {
    setIsReady(true);
    document.title = 'Wishlist | ShreeRatna';
  }, []);

  const formatPrice = (price) => {
    try {
      if (!price) return '₹0';
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
    } catch {
      return '₹0';
    }
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    addToCart(product, 1, user?.id);
    toast.success(`${product.name || 'Item'} added to cart!`);
  };

  const handleRemove = (productId) => {
    if (!productId || !removeItem) return;
    removeItem(productId, user?.id);
    toast.success('Removed from wishlist');
  };

  // Show loading state until hydrated
  if (!isReady) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-cream-100">
        <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
        <p className="text-brown-500 mt-4">Loading wishlist...</p>
      </div>
    );
  }

  // Show empty state message
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-cream-100">
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-rose-400" />
        </div>
        <h1 className="text-2xl font-display font-bold text-brown-800 mb-2 text-center">No items selected</h1>
        <p className="text-brown-500 mb-8 text-center">Your wishlist is empty. Browse our collection and add items you love!</p>
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
        >
          Explore Collection
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-cream-100 min-h-screen">
        <div className="container-custom py-8 px-4">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-brown-800 mb-6 sm:mb-8">
            My Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {items.map((item) => {
              if (!item || !item.id) return null;

              return (
                <div key={item.id} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <Link to={`/product/${item.id}`} className="block aspect-square overflow-hidden">
                    <img
                      src={item.image || item.images?.[0] || '/placeholder.jpg'}
                      alt={item.name || 'Product'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                    />
                  </Link>
                  <div className="p-3 sm:p-4">
                    <span className="text-[10px] sm:text-xs text-gold-600 uppercase tracking-wide">{item.category || 'Jewelry'}</span>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-display text-sm sm:text-base font-semibold text-brown-800 line-clamp-1 hover:text-gold-600 mt-1">
                        {item.name || 'Product'}
                      </h3>
                    </Link>
                    <div className="flex items-baseline gap-2 mt-1 sm:mt-2">
                      <span className="font-display text-sm sm:text-base font-bold text-brown-800">{formatPrice(item.price)}</span>
                      {item.original_price && (
                        <span className="text-xs sm:text-sm text-brown-400 line-through">{formatPrice(item.original_price)}</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-4">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white text-xs sm:text-sm font-semibold rounded-full transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 active:bg-rose-100 rounded-lg transition"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    </div>
  );
};

export default Wishlist;
