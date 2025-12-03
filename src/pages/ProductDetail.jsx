/**
 * Product Detail Page with image gallery and add to cart
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Heart, ShoppingBag, Share2, Star, ChevronLeft, ChevronRight, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import Button from '../components/ui/Button';
import ProductCard from '../components/features/ProductCard';
import Loader from '../components/ui/Loader';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const { user } = useAuthStore();
  const addToCart = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleItem: toggleWishlist } = useWishlistStore();

  const imageRef = useRef(null);
  const detailsRef = useRef(null);

  const inWishlist = product ? isInWishlist(product.id) : false;

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error || !data) {
          navigate('/shop');
          return;
        }

        setProduct(data);

        // Fetch related products
        const { data: related } = await supabase
          .from('products')
          .select('*')
          .eq('category', data.category)
          .neq('id', id)
          .eq('is_active', true)
          .limit(4);

        setRelatedProducts(related || []);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [id, navigate]);

  // Entry animations
  useEffect(() => {
    if (!isLoading && product) {
      gsap.fromTo(imageRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo(detailsRef.current?.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
    }
  }, [isLoading, product]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, user?.id);
    toast.success(`${product.name} added to cart!`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleImageZoom = (e) => {
    if (!isZoomed) return;
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.target.style.transformOrigin = `${x}% ${y}%`;
  };

  if (isLoading) return <Loader />;
  if (!product) return null;

  const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;
  const images = product.images?.length ? product.images : ['/placeholder-jewelry.jpg'];

  return (
    <>
      <Helmet>
        <title>{product.name} | Jewel Elegance</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="bg-cream-100 min-h-screen">
        <div className="container-custom py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-brown-500 mb-8">
            <Link to="/" className="hover:text-gold-600">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-gold-600">Shop</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.category}`} className="hover:text-gold-600 capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-brown-800">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div ref={imageRef} className="space-y-4">
              <div
                className={`relative aspect-square bg-white rounded-2xl overflow-hidden shadow-elegant ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleImageZoom}
              >
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : ''}`}
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-rose-500 text-white text-sm font-semibold rounded-full">
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                        selectedImage === idx ? 'border-gold-500' : 'border-transparent hover:border-gold-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div ref={detailsRef} className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-gold-600 font-sans text-sm uppercase tracking-wide">{product.category}</span>
                  {product.region && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-purple-600 font-sans text-sm">{product.region}</span>
                    </>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-brown-800 mb-4">{product.name}</h1>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-gold-500 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-brown-500">({product.reviews_count || 0} reviews)</span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-display font-bold text-brown-800">{formatPrice(product.price)}</span>
                  {product.original_price && (
                    <span className="text-xl text-brown-400 line-through">{formatPrice(product.original_price)}</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-brown-600 leading-relaxed">{product.description}</p>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gold-100">
                {product.metal_purity && (
                  <div><span className="text-brown-400 text-sm">Purity</span><p className="font-semibold text-brown-800">{product.metal_purity}</p></div>
                )}
                {product.weight && (
                  <div><span className="text-brown-400 text-sm">Weight</span><p className="font-semibold text-brown-800">{product.weight}g</p></div>
                )}
                {product.dimensions && (
                  <div><span className="text-brown-400 text-sm">Dimensions</span><p className="font-semibold text-brown-800">{product.dimensions}</p></div>
                )}
                <div><span className="text-brown-400 text-sm">Stock</span><p className="font-semibold text-emerald-600">{product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}</p></div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-gold-200 rounded-full overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-gold-50 transition text-xl">-</button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock_quantity || 10, quantity + 1))} className="w-12 h-12 flex items-center justify-center hover:bg-gold-50 transition text-xl">+</button>
                </div>
                <Button onClick={handleAddToCart} icon={ShoppingBag} disabled={product.stock_quantity === 0} className="flex-1">
                  {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <button onClick={() => toggleWishlist(product, user?.id)} className={`w-12 h-12 rounded-full border transition flex items-center justify-center ${inWishlist ? 'bg-rose-500 border-rose-500 text-white' : 'border-gold-200 text-brown-600 hover:border-gold-500'}`}>
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
                <button onClick={handleShare} className="w-12 h-12 rounded-full border border-gold-200 text-brown-600 hover:border-gold-500 transition flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-gold-100">
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-6 h-6 text-gold-500 mb-2" />
                  <span className="text-xs text-brown-600">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-6 h-6 text-gold-500 mb-2" />
                  <span className="text-xs text-brown-600">Certified Authentic</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RefreshCw className="w-6 h-6 text-gold-500 mb-2" />
                  <span className="text-xs text-brown-600">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-display font-bold text-brown-800 mb-8">You May Also Like</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
