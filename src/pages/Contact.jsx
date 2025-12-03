/**
 * Contact Page - ShreeRatna Heritage Jewelry
 * Features: GSAP animations, interactive form, Indian heritage theme
 */

import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Loader2, Sparkles, Crown, CheckCircle, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.querySelector('.hero-content'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Floating elements
      gsap.to(heroRef.current?.querySelectorAll('.float-element'), {
        y: -15,
        duration: 2.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });

      // Form animation
      ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            formRef.current,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }
          );
        },
        once: true
      });

      // Info cards stagger
      ScrollTrigger.create({
        trigger: infoRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            infoRef.current?.querySelectorAll('.info-card'),
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }
          );
        },
        once: true
      });

      // FAQ animation
      ScrollTrigger.create({
        trigger: faqRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            faqRef.current?.querySelectorAll('.faq-item'),
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Visit Our Showroom', lines: ['123 Jewelry Lane, Zaveri Bazaar', 'Mumbai, Maharashtra 400003'], color: 'from-maroon-500 to-maroon-600' },
    { icon: Phone, title: 'Call Us', lines: ['+91 98765 43210', '+91 22 2345 6789'], color: 'from-peacock-500 to-peacock-600' },
    { icon: Mail, title: 'Email Us', lines: ['hello@shreeratna.com', 'support@shreeratna.com'], color: 'from-gold-500 to-gold-600' },
    { icon: Clock, title: 'Working Hours', lines: ['Mon - Sat: 10:00 AM - 8:00 PM', 'Sunday: 11:00 AM - 6:00 PM'], color: 'from-saffron-500 to-saffron-600' },
  ];

  const faqs = [
    { q: 'Do you offer custom jewelry design?', a: 'Yes! Our master artisans can create bespoke pieces based on your vision.' },
    { q: 'What is your return policy?', a: 'We offer 30-day returns and lifetime exchange on all products.' },
    { q: 'Are your products BIS hallmarked?', a: 'Absolutely! All gold jewelry is BIS hallmarked with purity certification.' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | ShreeRatna - Heritage Jewelry</title>
        <meta name="description" content="Get in touch with ShreeRatna. Visit our showroom, call us, or send a message. We're here to help you find the perfect heritage jewelry." />
      </Helmet>

      <div className="bg-gradient-to-b from-cream-100 via-ivory to-cream-100 min-h-screen">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-20 md:py-28 bg-gradient-to-br from-peacock-600 via-peacock-500 to-maroon-600 text-white overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="float-element absolute top-16 left-[10%] w-24 h-24 border-2 border-gold-400/30 rounded-full" />
            <div className="float-element absolute bottom-20 right-[15%] w-40 h-40 border border-white/20 rounded-full" />
            <div className="float-element absolute top-1/3 right-[20%] w-16 h-16 bg-gold-400/10 rotate-45" />
          </div>

          <div className="container-custom relative z-10">
            <div className="hero-content text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-gold-400" />
                <span className="text-gold-300 font-medium uppercase tracking-wider">We're Here to Help</span>
                <Sparkles className="w-6 h-6 text-gold-400" />
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Get in <span className="text-gold-400">Touch</span>
              </h1>
              <p className="text-xl text-peacock-100 leading-relaxed">
                Have questions about our heritage jewelry collection? Need help with a custom order? We'd love to hear from you and help you find the perfect piece.
              </p>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 100L48 91.7C96 83 192 67 288 58.3C384 50 480 50 576 54.2C672 58 768 67 864 70.8C960 75 1056 75 1152 70.8C1248 67 1344 58 1392 54.2L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z" fill="#FDF8F3"/>
            </svg>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding -mt-8">
          <div className="container-custom">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Contact Form */}
              <div ref={formRef} className="lg:col-span-3">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-elegant border border-gold-100">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-maroon-500 to-maroon-600 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold text-charcoal-500">Send us a Message</h2>
                      <p className="text-brown-400 text-sm">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'name' || formData.name ? 'top-1 text-xs text-maroon-500' : 'top-4 text-brown-400'}`}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 pt-6 pb-2 border-2 border-cream-300 rounded-xl focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100 outline-none transition-all bg-cream-50/50"
                        />
                      </div>
                      <div className="relative">
                        <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'email' || formData.email ? 'top-1 text-xs text-maroon-500' : 'top-4 text-brown-400'}`}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 pt-6 pb-2 border-2 border-cream-300 rounded-xl focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100 outline-none transition-all bg-cream-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'phone' || formData.phone ? 'top-1 text-xs text-maroon-500' : 'top-4 text-brown-400'}`}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 pt-6 pb-2 border-2 border-cream-300 rounded-xl focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100 outline-none transition-all bg-cream-50/50"
                        />
                      </div>
                      <div>
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-4 border-2 border-cream-300 rounded-xl focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100 outline-none transition-all bg-cream-50/50 cursor-pointer"
                        >
                          <option value="">Select Topic *</option>
                          <option value="inquiry">Product Inquiry</option>
                          <option value="custom">Custom Order Request</option>
                          <option value="support">Order Support</option>
                          <option value="feedback">Feedback</option>
                          <option value="wholesale">Wholesale Inquiry</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="relative">
                      <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'message' || formData.message ? 'top-2 text-xs text-maroon-500' : 'top-4 text-brown-400'}`}>
                        Your Message *
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={5}
                        className="w-full px-4 pt-7 pb-3 border-2 border-cream-300 rounded-xl focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100 outline-none transition-all bg-cream-50/50 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-maroon-500 to-maroon-600 text-white rounded-xl font-bold hover:from-maroon-600 hover:to-maroon-700 transition-all shadow-maroon disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info Sidebar */}
              <div ref={infoRef} className="lg:col-span-2 space-y-5">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="info-card bg-white rounded-2xl p-6 shadow-sm border border-cream-200 hover:shadow-gold transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-charcoal-500 mb-2 text-lg">{item.title}</h3>
                        {item.lines.map((line, i) => (
                          <p key={i} className="text-brown-500 text-sm leading-relaxed">{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quick FAQs */}
                <div ref={faqRef} className="bg-gradient-to-br from-charcoal-500 to-charcoal-400 rounded-2xl p-6 text-white">
                  <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-gold-400" />
                    Quick FAQs
                  </h3>
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <div key={i} className="faq-item border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <p className="text-gold-300 font-medium text-sm mb-1">{faq.q}</p>
                        <p className="text-charcoal-100 text-sm">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-200">
                  <div className="aspect-[4/3] bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center relative group cursor-pointer">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-maroon-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-maroon">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-charcoal-500 font-medium">View on Google Maps</p>
                      <p className="text-sm text-brown-400 flex items-center justify-center gap-1 mt-1">
                        Click to open <ArrowRight className="w-3 h-3" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Banner */}
        <section className="py-12 bg-gradient-to-r from-maroon-600 via-maroon-500 to-peacock-600">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-white">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-gold-400" />
                <span className="font-medium">24/7 Customer Support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-gold-400" />
                <span className="font-medium">Secure Transactions</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-gold-400" />
                <span className="font-medium">BIS Hallmarked Jewelry</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
