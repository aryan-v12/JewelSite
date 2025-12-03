/**
 * Main App Component with Routing
 */

import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/ui/Loader';
import useAuthStore from './store/useAuthStore';
import useCartStore from './store/useCartStore';
import useWishlistStore from './store/useWishlistStore';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Profile = lazy(() => import('./pages/Profile'));
const Orders = lazy(() => import('./pages/Orders'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

function App() {
  const { initialize, user, isAuthenticated } = useAuthStore();
  const initializeCart = useCartStore((state) => state.initializeCart);
  const initializeWishlist = useWishlistStore((state) => state.initializeWishlist);

  // Initialize auth and sync cart/wishlist on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Sync cart and wishlist when user changes
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      initializeCart(user.id);
      initializeWishlist(user.id);
    }
  }, [isAuthenticated, user, initializeCart, initializeWishlist]);

  return (
    <div className="min-h-screen flex flex-col bg-cream-100">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 pt-32">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
