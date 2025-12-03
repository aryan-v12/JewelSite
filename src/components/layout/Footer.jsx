/**
 * Footer Component
 * Features: Newsletter signup, links, social media
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Instagram, Twitter, Youtube, 
  Mail, Phone, MapPin, Send,
  Diamond, ShieldCheck, Truck, CreditCard
} from 'lucide-react';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Thank you for subscribing!');
    setEmail('');
    setIsSubmitting(false);
  };

  const features = [
    { icon: Diamond, title: 'Certified Jewelry', desc: 'BIS Hallmarked' },
    { icon: Truck, title: 'Free Shipping', desc: 'Above ₹50,000' },
    { icon: ShieldCheck, title: 'Secure Payments', desc: '100% Protected' },
    { icon: CreditCard, title: 'Easy Returns', desc: '30 Days Policy' },
  ];

  const quickLinks = [
    { name: 'Diamond Collection', href: '/shop?category=diamond' },
    { name: 'Gold Jewelry', href: '/shop?category=gold' },
    { name: 'Silver Ornaments', href: '/shop?category=silver' },
    { name: 'Bridal Collection', href: '/shop?tag=bridal' },
    { name: 'New Arrivals', href: '/shop?sort=newest' },
  ];

  const customerLinks = [
    { name: 'My Account', href: '/profile' },
    { name: 'Order History', href: '/orders' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'FAQs', href: '/faq' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="bg-charcoal-500 text-white">
      {/* Features bar */}
      <div className="border-b border-charcoal-400">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <feature.icon className="w-8 h-8 text-gold-500" />
                <div>
                  <h4 className="font-sans font-semibold text-sm">{feature.title}</h4>
                  <p className="text-gray-400 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Newsletter - ShreeRatna */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-11 h-11">
                <svg viewBox="0 0 44 44" className="w-full h-full">
                  <defs>
                    <linearGradient id="footerGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E8D48A" />
                      <stop offset="50%" stopColor="#C9A227" />
                      <stop offset="100%" stopColor="#8B6914" />
                    </linearGradient>
                    <linearGradient id="footerMaroon" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A52A2A" />
                      <stop offset="100%" stopColor="#800020" />
                    </linearGradient>
                  </defs>
                  <circle cx="22" cy="22" r="20" fill="url(#footerMaroon)" stroke="url(#footerGold)" strokeWidth="2"/>
                  <polygon points="22,6 40,22 22,38 4,22" fill="url(#footerGold)" opacity="0.95" />
                  <circle cx="22" cy="22" r="6" fill="url(#footerMaroon)" />
                  <circle cx="22" cy="22" r="3" fill="#E8D48A" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-semibold">ShreeRatna</span>
                <span className="text-[10px] font-sans tracking-[0.2em] text-gold-500 uppercase">Heritage Jewelry</span>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              Celebrating India's magnificent jewelry heritage. Authentic handcrafted pieces
              from 10+ regional traditions, passed down through generations.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="font-sans font-semibold mb-3">Subscribe to Our Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-full bg-charcoal-400 border border-charcoal-300 
                           text-white placeholder-gray-400 focus:outline-none focus:border-gold-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gold-500 rounded-full hover:bg-gold-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-charcoal-400 flex items-center justify-center
                           hover:bg-gold-500 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold text-gold-500 mb-4">Shop</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-gold-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-sans font-semibold text-gold-500 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {customerLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-gold-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-sans font-semibold text-gold-500 mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-gold-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a href="tel:+911234567890" className="flex items-center gap-2 text-gray-400 hover:text-gold-500 text-sm">
                <Phone className="w-4 h-4" /> +91 123 456 7890
              </a>
              <a href="mailto:hello@shreeratna.com" className="flex items-center gap-2 text-gray-400 hover:text-gold-500 text-sm">
                <Mail className="w-4 h-4" /> hello@shreeratna.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-400">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ShreeRatna. All rights reserved. Celebrating India's Heritage.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-6 opacity-50" />
              <span className="text-gray-400 text-sm">Secured by Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
