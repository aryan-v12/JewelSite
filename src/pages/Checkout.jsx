/**
 * Checkout Page with Razorpay integration
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Phone, Mail, Check, Loader2 } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Address, 2: Payment

  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = totalAmount >= 50000 ? 0 : 500;
  const grandTotal = totalAmount + shippingCost;

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    for (const field of required) {
      if (!formData[field]?.trim()) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase.from('orders').insert({
        user_id: user?.id || null,
        total_amount: grandTotal,
        shipping_address: formData,
        status: 'pending',
      }).select().single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      await supabase.from('order_items').insert(orderItems);

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_demo',
        amount: grandTotal * 100, // in paise
        currency: 'INR',
        name: 'Jewel Elegance',
        description: `Order #${order.order_number}`,
        order_id: order.id,
        handler: async function (response) {
          // Update order status
          await supabase.from('orders').update({ status: 'confirmed', payment_id: response.razorpay_payment_id }).eq('id', order.id);
          clearCart(user?.id);
          toast.success('Order placed successfully!');
          navigate(`/orders?success=${order.order_number}`);
        },
        prefill: { name: formData.fullName, email: formData.email, contact: formData.phone },
        theme: { color: '#D4AF37' },
      };

      if (typeof window.Razorpay !== 'undefined') {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Demo mode - simulate success
        await supabase.from('orders').update({ status: 'confirmed' }).eq('id', order.id);
        clearCart(user?.id);
        toast.success('Order placed successfully! (Demo Mode)');
        navigate(`/orders?success=${order.order_number}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process order. Please try again.');
    }

    setIsProcessing(false);
  };

  return (
    <>
      <Helmet><title>Checkout | Jewel Elegance</title></Helmet>
      <div className="bg-cream-100 min-h-screen">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-display font-bold text-brown-800 mb-8">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[{ num: 1, label: 'Shipping' }, { num: 2, label: 'Payment' }].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s.num ? 'bg-gold-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span className={`ml-2 font-sans ${step >= s.num ? 'text-brown-800' : 'text-gray-400'}`}>{s.label}</span>
                {i === 0 && <div className={`w-20 h-1 mx-4 ${step > 1 ? 'bg-gold-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-display font-bold text-brown-800 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold-500" /> Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm text-brown-600 mb-1">Full Name *</label><input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="input-elegant" /></div>
                  <div><label className="block text-sm text-brown-600 mb-1">Email *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-elegant" /></div>
                  <div className="sm:col-span-2"><label className="block text-sm text-brown-600 mb-1">Phone *</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input-elegant" maxLength={10} /></div>
                  <div className="sm:col-span-2"><label className="block text-sm text-brown-600 mb-1">Address *</label><textarea name="address" value={formData.address} onChange={handleInputChange} className="input-elegant" rows={2} /></div>
                  <div><label className="block text-sm text-brown-600 mb-1">City *</label><input type="text" name="city" value={formData.city} onChange={handleInputChange} className="input-elegant" /></div>
                  <div><label className="block text-sm text-brown-600 mb-1">State *</label><input type="text" name="state" value={formData.state} onChange={handleInputChange} className="input-elegant" /></div>
                  <div><label className="block text-sm text-brown-600 mb-1">Pincode *</label><input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="input-elegant" maxLength={6} /></div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-40">
                <h2 className="text-xl font-display font-bold text-brown-800 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3"><img src={item.image} alt="" className="w-14 h-14 rounded-lg object-cover" /><div className="flex-1"><p className="text-sm font-semibold line-clamp-1">{item.name}</p><p className="text-xs text-brown-400">Qty: {item.quantity}</p><p className="text-sm font-semibold text-gold-600">{formatPrice(item.price * item.quantity)}</p></div></div>
                  ))}
                </div>
                <div className="space-y-2 pt-4 border-t text-brown-600">
                  <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(totalAmount)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span></div>
                  <div className="flex justify-between text-lg font-bold text-brown-800 pt-2 border-t"><span>Total</span><span>{formatPrice(grandTotal)}</span></div>
                </div>
                <Button fullWidth className="mt-6" onClick={handlePayment} disabled={isProcessing}>
                  {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin mr-2" />Processing...</> : <><CreditCard className="w-5 h-5 mr-2" />Pay {formatPrice(grandTotal)}</>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
