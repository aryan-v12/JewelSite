/**
 * Cart Page
 */

import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const containerRef = useRef(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = items.reduce((sum, item) => {
    const original = item.original_price || item.price;
    return sum + ((original - item.price) * item.quantity);
  }, 0);
  const shippingCost = totalAmount >= 50000 ? 0 : 500;

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
    }
  }, []);

  if (items.length === 0) {
    return (
      <>
        <Helmet><title>Cart | Jewel Elegance</title></Helmet>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-gold-50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-gold-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-brown-800 mb-2">Your cart is empty</h1>
          <p className="text-brown-500 mb-8">Discover our exquisite jewelry collection</p>
          <Button icon={ArrowRight} iconPosition="right" onClick={() => navigate('/shop')}>Start Shopping</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Cart ({totalItems}) | Jewel Elegance</title></Helmet>
      <div className="bg-cream-100 min-h-screen">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-display font-bold text-brown-800 mb-8">Shopping Cart ({totalItems} items)</h1>

          <div ref={containerRef} className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4">
                  <Link to={`/product/${item.id}`} className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image || '/placeholder.jpg'} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} className="font-display font-semibold text-brown-800 hover:text-gold-600 line-clamp-1">{item.name}</Link>
                    <p className="text-sm text-brown-400 mt-1">{item.metal_purity}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1, user?.id)} className="w-8 h-8 rounded-full border border-gold-200 flex items-center justify-center hover:border-gold-500"><Minus className="w-4 h-4" /></button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1, user?.id)} className="w-8 h-8 rounded-full border border-gold-200 flex items-center justify-center hover:border-gold-500"><Plus className="w-4 h-4" /></button>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold text-brown-800">{formatPrice(item.price * item.quantity)}</p>
                        {item.original_price && <p className="text-sm text-brown-400 line-through">{formatPrice(item.original_price * item.quantity)}</p>}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id, user?.id)} className="text-rose-500 hover:text-rose-600 self-start p-2"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4">
                <Link to="/shop" className="flex items-center gap-2 text-gold-600 hover:text-gold-700"><ArrowLeft className="w-4 h-4" /> Continue Shopping</Link>
                <button onClick={() => clearCart(user?.id)} className="text-rose-500 hover:text-rose-600 font-sans">Clear Cart</button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-40">
                <h2 className="text-xl font-display font-bold text-brown-800 mb-6">Order Summary</h2>
                {totalSavings > 0 && <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm mb-4">You're saving {formatPrice(totalSavings)}!</div>}
                <div className="space-y-3 text-brown-600">
                  <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(totalAmount)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span></div>
                  {shippingCost > 0 && <p className="text-xs text-gold-600">Free shipping on orders above ₹50,000</p>}
                  <div className="flex justify-between text-lg font-display font-bold text-brown-800 pt-3 border-t">{<span>Total</span>}<span>{formatPrice(totalAmount + shippingCost)}</span></div>
                </div>
                <Button fullWidth className="mt-6" icon={ArrowRight} iconPosition="right" onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-brown-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                  Secure checkout with SSL encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
