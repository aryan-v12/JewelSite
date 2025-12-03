/**
 * ProductCard Component with GSAP animations
 * Features: 3D tilt, shine effect, quick view, add to cart/wishlist
 */

import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import useCartStore from '../../store/useCartStore';
import useWishlistStore from '../../store/useWishlistStore';
import Tooltip from '../ui/Tooltip';
import toast from 'react-hot-toast';

const ProductCard = ({ product, index = 0 }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const shineRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { user } = useAuthStore();
  const addToCart = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleItem: toggleWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);

  // Calculate discount percentage
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // 3D tilt effect
  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const shine = shineRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });

      // Shine effect follows cursor
      if (shine) {
        gsap.to(shine, {
          x: x - 100,
          y: y - 100,
          opacity: 0.3,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });

      if (shine) {
        gsap.to(shine, { opacity: 0, duration: 0.3 });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Entry animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out',
      }
    );
  }, [index]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1, user?.id);
    
    // Animate the cart icon
    const icon = e.currentTarget;
    gsap.fromTo(
      icon,
      { scale: 1 },
      { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }
    );
    
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const added = await toggleWishlist(product, user?.id);
    toast.success(added ? 'Added to wishlist!' : 'Removed from wishlist');
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-gold-lg 
                 transition-shadow duration-500"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shine overlay */}
      <div
        ref={shineRef}
        className="absolute w-48 h-48 rounded-full bg-gradient-radial from-white/50 to-transparent 
                   pointer-events-none opacity-0 z-10"
        style={{ filter: 'blur(20px)' }}
      />

      {/* Image container */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream-100">
          <img
            ref={imageRef}
            src={product.images?.[0] || '/placeholder-jewelry.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <span className="px-2 py-1 bg-rose-500 text-white text-xs font-sans font-semibold rounded-full">
                -{discount}%
              </span>
            )}
            {product.bestseller && (
              <span className="px-2 py-1 bg-gold-500 text-white text-xs font-sans font-semibold rounded-full">
                Bestseller
              </span>
            )}
            {product.featured && !product.bestseller && (
              <span className="px-2 py-1 bg-purple-600 text-white text-xs font-sans font-semibold rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Quick actions - visible on hover */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
          >
            <Tooltip content={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'} position="left">
              <button
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full shadow-md transition-colors ${
                  inWishlist
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-brown-800 hover:bg-rose-50'
                }`}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </Tooltip>

            <Tooltip content="Quick View" position="left">
              <Link
                to={`/product/${product.id}`}
                className="p-2 bg-white rounded-full shadow-md text-brown-800 hover:bg-gold-50 transition-colors"
                aria-label="Quick view"
              >
                <Eye className="w-5 h-5" />
              </Link>
            </Tooltip>
          </div>

          {/* Add to cart button - slides up on hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ${
              isHovered ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-gold-500 text-white font-sans font-semibold flex items-center
                       justify-center gap-2 hover:bg-gold-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>

      {/* Product details */}
      <div className="p-4">
        {/* Category & Region */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-sans text-gold-600 uppercase tracking-wide">
            {product.category}
          </span>
          {product.region && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-sans text-purple-600">{product.region}</span>
            </>
          )}
        </div>

        {/* Product name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-semibold text-brown-800 mb-1 line-clamp-2
                       hover:text-gold-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Metal purity & weight */}
        {(product.metal_purity || product.weight) && (
          <p className="text-sm text-brown-400 mb-2">
            {product.metal_purity}
            {product.weight && ` • ${product.weight}g`}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-bold text-brown-800">
            {formatPrice(product.price)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-sm text-brown-400 line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        {/* Rating (if available) */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-gold-500 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-brown-400 ml-1">
              ({product.reviews_count || 0})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
