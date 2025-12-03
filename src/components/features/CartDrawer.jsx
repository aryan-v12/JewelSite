/**
 * CartDrawer Component - Slide-in cart with animations
 */

import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useAuthStore from '../../store/useAuthStore';
import Button from '../ui/Button';

const CartDrawer = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const drawerRef = useRef(null);
  const navigate = useNavigate();

  const { items, updateQuantity, removeItem } = useCartStore();
  const { user } = useAuthStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = items.reduce((sum, item) => {
    const original = item.original_price || item.price;
    return sum + ((original - item.price) * item.quantity);
  }, 0);

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(drawerRef.current, {
      x: '100%', duration: 0.3, ease: 'power2.in',
      onComplete: onClose
    });
  };

  const handleCheckout = () => {
    handleClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gold-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-gold-500" />
            <h2 className="text-xl font-display font-bold text-brown-800">
              Your Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5 text-brown-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-gold-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-gold-400" />
              </div>
              <h3 className="text-lg font-display font-semibold text-brown-800 mb-2">
                Your cart is empty
              </h3>
              <p className="text-brown-400 mb-6">
                Discover our exquisite jewelry collection
              </p>
              <Button onClick={() => { handleClose(); navigate('/shop'); }}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-cream-50 rounded-xl"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item.id}`}
                    onClick={handleClose}
                    className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.id}`}
                      onClick={handleClose}
                      className="font-display font-semibold text-brown-800 line-clamp-1 hover:text-gold-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-brown-400 mt-0.5">
                      {item.metal_purity}
                    </p>
                    <p className="text-gold-600 font-semibold mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, user?.id)}
                          className="w-7 h-7 rounded-full bg-white border border-gold-200 flex items-center 
                                   justify-center hover:border-gold-500 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-sans">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, user?.id)}
                          className="w-7 h-7 rounded-full bg-white border border-gold-200 flex items-center 
                                   justify-center hover:border-gold-500 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, user?.id)}
                        className="text-rose-500 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gold-100 p-4 space-y-4 bg-white">
            {/* Savings */}
            {totalSavings > 0 && (
              <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-sans">
                You're saving {formatPrice(totalSavings)} on this order!
              </div>
            )}

            {/* Subtotal */}
            <div className="space-y-2">
              <div className="flex justify-between text-brown-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-brown-600">
                <span>Shipping</span>
                <span>{totalAmount >= 50000 ? 'Free' : formatPrice(500)}</span>
              </div>
              <div className="flex justify-between text-lg font-display font-bold text-brown-800 pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(totalAmount >= 50000 ? totalAmount : totalAmount + 500)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <Button
              onClick={handleCheckout}
              fullWidth
              icon={ArrowRight}
              iconPosition="right"
            >
              Proceed to Checkout
            </Button>

            {/* Continue shopping */}
            <button
              onClick={() => { handleClose(); navigate('/shop'); }}
              className="w-full text-center text-gold-600 font-sans hover:text-gold-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
