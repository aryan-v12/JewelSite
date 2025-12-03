/**
 * Orders Page
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Package, CheckCircle, Clock, Truck, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import Loader from '../components/ui/Loader';
import { Helmet } from 'react-helmet-async';

const Orders = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const successOrder = searchParams.get('success');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('orders')
        .select(`*, order_items(*, products(*))`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setOrders(data || []);
      setIsLoading(false);
    };

    fetchOrders();
  }, [isAuthenticated, user, navigate]);

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'processing': return <Clock className="w-5 h-5 text-amber-500" />;
      case 'shipped': return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered': return <Package className="w-5 h-5 text-emerald-600" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-rose-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'processing': return 'bg-amber-100 text-amber-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Helmet><title>My Orders | Jewel Elegance</title></Helmet>
      <div className="bg-cream-100 min-h-screen">
        <div className="container-custom py-8">
          {/* Success Message */}
          {successOrder && (
            <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h2 className="text-xl font-display font-bold text-emerald-800 mb-1">Order Placed Successfully!</h2>
              <p className="text-emerald-600">Order #{successOrder} has been confirmed. You'll receive an email shortly.</p>
            </div>
          )}

          <h1 className="text-3xl font-display font-bold text-brown-800 mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-display font-semibold text-brown-800 mb-2">No orders yet</h2>
              <p className="text-brown-500 mb-6">Start shopping to see your orders here</p>
              <button onClick={() => navigate('/shop')} className="btn-gold">Browse Collection</button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-cream-50 transition"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-semibold text-brown-800">Order #{order.order_number}</p>
                        <p className="text-sm text-brown-500">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                      <p className="font-display font-bold text-brown-800">{formatPrice(order.total_amount)}</p>
                      {expandedOrder === order.id ? <ChevronUp className="w-5 h-5 text-brown-400" /> : <ChevronDown className="w-5 h-5 text-brown-400" />}
                    </div>
                  </div>

                  {/* Order Details - Expanded */}
                  {expandedOrder === order.id && (
                    <div className="p-4 border-t border-gold-100 bg-cream-50">
                      <div className="space-y-3">
                        {order.order_items?.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <Link to={`/product/${item.product_id}`} className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={item.products?.images?.[0] || '/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <Link to={`/product/${item.product_id}`} className="font-semibold text-brown-800 hover:text-gold-600 line-clamp-1">{item.products?.name}</Link>
                              <p className="text-sm text-brown-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-brown-800">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                      {order.shipping_address && (
                        <div className="mt-4 pt-4 border-t border-gold-100">
                          <p className="text-sm text-brown-500 mb-1">Shipping Address</p>
                          <p className="text-brown-800">
                            {order.shipping_address.fullName}, {order.shipping_address.address}, {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
