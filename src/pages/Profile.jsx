/**
 * User Profile Page
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Edit2, Save, LogOut, ShoppingBag, Heart, Package } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Fetch recent orders
    const fetchOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      setOrders(data || []);
    };

    fetchOrders();
  }, [isAuthenticated, user, navigate]);

  const handleSave = async () => {
    setIsLoading(true);
    const result = await updateProfile(formData);
    if (result.success) {
      toast.success('Profile updated!');
      setIsEditing(false);
    } else {
      toast.error(result.error || 'Failed to update');
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  if (!isAuthenticated) return null;

  return (
    <>
      <Helmet><title>My Profile | Jewel Elegance</title></Helmet>
      <div className="bg-cream-100 min-h-screen">
        <div className="container-custom py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-display font-bold mb-4">
                    {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <h2 className="text-xl font-display font-bold text-brown-800">{user?.full_name || 'User'}</h2>
                  <p className="text-brown-500">{user?.email}</p>
                </div>

                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="block text-sm text-brown-600 mb-1">Full Name</label>
                        <input type="text" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} className="input-elegant" />
                      </div>
                      <div>
                        <label className="block text-sm text-brown-600 mb-1">Phone</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-elegant" />
                      </div>
                      <div>
                        <label className="block text-sm text-brown-600 mb-1">Address</label>
                        <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="input-elegant" rows={2} />
                      </div>
                      <div className="flex gap-2">
                        <Button fullWidth icon={Save} onClick={handleSave} disabled={isLoading}>Save</Button>
                        <Button variant="outline" fullWidth onClick={() => setIsEditing(false)}>Cancel</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 text-brown-600">
                        <Mail className="w-5 h-5 text-gold-500" />
                        <span>{user?.email}</span>
                      </div>
                      {user?.phone && (
                        <div className="flex items-center gap-3 text-brown-600">
                          <Phone className="w-5 h-5 text-gold-500" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                      {user?.address && (
                        <div className="flex items-start gap-3 text-brown-600">
                          <MapPin className="w-5 h-5 text-gold-500 mt-0.5" />
                          <span>{user.address}</span>
                        </div>
                      )}
                      <Button fullWidth variant="outline" icon={Edit2} onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    </>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 text-rose-500 hover:text-rose-600 font-sans">
                    <LogOut className="w-5 h-5" /> Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Stats & Orders */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <Package className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-brown-800">{orders.length}</p>
                  <p className="text-sm text-brown-500">Orders</p>
                </div>
                <button onClick={() => navigate('/wishlist')} className="bg-white rounded-xl p-4 text-center hover:shadow-md transition">
                  <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-brown-800">—</p>
                  <p className="text-sm text-brown-500">Wishlist</p>
                </button>
                <button onClick={() => navigate('/cart')} className="bg-white rounded-xl p-4 text-center hover:shadow-md transition">
                  <ShoppingBag className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold text-brown-800">—</p>
                  <p className="text-sm text-brown-500">Cart</p>
                </button>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-display font-bold text-brown-800 mb-4">Recent Orders</h3>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-brown-500">No orders yet</p>
                    <Button className="mt-4" onClick={() => navigate('/shop')}>Start Shopping</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-brown-800">#{order.order_number}</p>
                          <p className="text-sm text-brown-500">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gold-600">{formatPrice(order.total_amount)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>{order.status}</span>
                        </div>
                      </div>
                    ))}
                    <Button fullWidth variant="outline" onClick={() => navigate('/orders')}>View All Orders</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
