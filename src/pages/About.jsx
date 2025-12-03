/**
 * About Us Page - ShreeRatna Heritage Jewelry
 * Features: GSAP scroll animations, parallax effects, Indian heritage theme
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Sparkles, Heart, MapPin, Clock, Gem, Crown, Shield, Star, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const missionRef = useRef(null);
  const journeyRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax and fade
      gsap.fromTo(
        heroRef.current?.querySelector('.hero-content'),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      // Floating decorative elements
      gsap.to(heroRef.current?.querySelectorAll('.float-element'), {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Mission section with parallax
      ScrollTrigger.create({
        trigger: missionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            missionRef.current?.querySelector('.mission-text'),
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
          );
          gsap.fromTo(
            missionRef.current?.querySelector('.mission-image'),
            { opacity: 0, x: 50, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' }
          );
        },
        once: true
      });

      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            statsRef.current?.querySelectorAll('.stat-card'),
            { opacity: 0, y: 40, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' }
          );
        },
        once: true
      });

      // Values section stagger
      ScrollTrigger.create({
        trigger: valuesRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            valuesRef.current?.querySelectorAll('.value-card'),
            { opacity: 0, y: 50, rotateY: 10 },
            { opacity: 1, y: 0, rotateY: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out' }
          );
        },
        once: true
      });

      // Journey timeline animation
      ScrollTrigger.create({
        trigger: journeyRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            journeyRef.current?.querySelectorAll('.journey-item'),
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' }
          );
        },
        once: true
      });

      // CTA parallax
      gsap.to(ctaRef.current?.querySelector('.cta-bg'), {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Clock, value: '25+', label: 'Years of Excellence', color: 'text-maroon-500' },
    { icon: Users, value: '50,000+', label: 'Happy Customers', color: 'text-peacock-500' },
    { icon: Sparkles, value: '10,000+', label: 'Unique Designs', color: 'text-gold-500' },
    { icon: MapPin, value: '10+', label: 'Regional Traditions', color: 'text-saffron-500' },
  ];

  const values = [
    { icon: Award, title: 'Authenticity', description: 'Every piece is BIS hallmarked and certified, ensuring you receive genuine precious metals and stones.', color: 'from-maroon-500 to-maroon-600' },
    { icon: Heart, title: 'Craftsmanship', description: 'Our master artisans bring generations of skill, passion, and dedication to every single creation.', color: 'from-peacock-500 to-peacock-600' },
    { icon: Gem, title: 'Heritage', description: 'We preserve and celebrate India\'s diverse jewelry traditions from all 10+ regional styles.', color: 'from-gold-500 to-gold-600' },
    { icon: Shield, title: 'Trust', description: 'Transparent pricing, lifetime exchange policy, and secure transactions for complete peace of mind.', color: 'from-emerald-500 to-emerald-600' },
  ];

  const journey = [
    { year: '1998', title: 'The Beginning', description: 'Started as a small family jewelry shop in Mumbai\'s Zaveri Bazaar' },
    { year: '2005', title: 'Regional Expansion', description: 'Began sourcing authentic jewelry from artisans across India' },
    { year: '2015', title: 'Digital Transformation', description: 'Launched online presence to reach customers nationwide' },
    { year: '2023', title: 'ShreeRatna Rebrand', description: 'Evolved into India\'s premier heritage jewelry destination' },
  ];

  return (
    <>
      <Helmet>
        <title>Our Story | ShreeRatna - Heritage Jewelry Since 1998</title>
        <meta name="description" content="Discover the story behind ShreeRatna - India's premier destination for authentic regional jewelry from 10+ traditions." />
      </Helmet>

      <div className="bg-gradient-to-b from-cream-100 via-ivory to-cream-100 overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-24 md:py-32 bg-gradient-to-br from-maroon-700 via-maroon-600 to-maroon-800 text-white overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0">
            <div className="float-element absolute top-20 left-[10%] w-32 h-32 border-2 border-gold-400/30 rounded-full" />
            <div className="float-element absolute top-40 right-[15%] w-48 h-48 border border-gold-400/20 rounded-full" />
            <div className="float-element absolute bottom-20 left-[20%] w-24 h-24 border border-white/10 rotate-45" />
            <div className="float-element absolute bottom-32 right-[25%] w-16 h-16 bg-gold-400/10 rounded-full" />
            {/* Paisley pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 5c-5 0-10 5-10 15s5 20 10 25c5-5 10-15 10-25S35 5 30 5z\' fill=\'%23C9A227\' fill-opacity=\'0.4\'/%3E%3C/svg%3E")' }} />
          </div>

          <div className="container-custom relative z-10">
            <div className="hero-content text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-gold-400" />
                <Crown className="w-8 h-8 text-gold-400" />
                <div className="w-12 h-[2px] bg-gold-400" />
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Our <span className="text-gold-400">Story</span>
              </h1>
              <p className="text-xl md:text-2xl text-maroon-100 leading-relaxed mb-8">
                For over 25 years, ShreeRatna has been India's trusted destination for authentic, handcrafted jewelry that celebrates the rich heritage of regional craftsmanship.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <Gem className="w-4 h-4 text-gold-400" />
                  <span>10+ Regional Traditions</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-gold-400" />
                  <span>BIS Hallmarked</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-gold-400" />
                  <span>Master Artisans</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FDF8F3"/>
            </svg>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="mission-text">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-[3px] bg-maroon-500" />
                  <span className="text-maroon-500 font-medium uppercase tracking-wider text-sm">Our Mission</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-500 mb-6 leading-tight">
                  Celebrating India's <span className="text-maroon-600">Jewelry Heritage</span>
                </h2>
                <p className="text-brown-600 mb-6 leading-relaxed text-lg">
                  From the intricate Kundan and Meenakari work of Rajasthan to the delicate filigree of Bengal and Odisha, from the majestic temple jewelry of the South to the bold Thushi of Maharashtra – we bring together the finest jewelry traditions under one roof.
                </p>
                <p className="text-brown-600 leading-relaxed text-lg mb-8">
                  Each piece in our collection tells a story – of skilled artisans who have honed their craft over generations, of precious metals and gems that have traveled from mines to become treasured heirlooms passed down through families.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-maroon-500 to-maroon-600 text-white rounded-xl font-medium hover:from-maroon-600 hover:to-maroon-700 transition-all shadow-maroon group"
                >
                  Explore Collection
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="mission-image relative">
                <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-gold-400 to-gold-500 rounded-2xl -z-10" />
                <img
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800"
                  alt="Master jewelry craftsman at work"
                  className="rounded-2xl shadow-elegant-lg w-full object-cover aspect-[4/5]"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <p className="text-3xl font-display font-bold text-maroon-600">25+</p>
                  <p className="text-sm text-brown-500">Years of Trust</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-20 bg-gradient-to-r from-charcoal-500 via-charcoal-400 to-charcoal-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-20 w-40 h-40 border border-gold-400 rounded-full" />
            <div className="absolute bottom-10 right-20 w-60 h-60 border border-gold-400 rounded-full" />
          </div>
          <div className="container-custom relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Journey in Numbers</h2>
              <p className="text-charcoal-100">A legacy built on trust, quality, and craftsmanship</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all group">
                  <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <p className="text-5xl font-display font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-charcoal-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-[3px] bg-gold-500" />
                <Sparkles className="w-6 h-6 text-gold-500" />
                <div className="w-10 h-[3px] bg-gold-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-500 mb-4">Our Core Values</h2>
              <p className="text-brown-500 text-lg max-w-2xl mx-auto">
                The principles that guide every piece we create and every customer we serve
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="value-card bg-white p-8 rounded-2xl shadow-elegant hover:shadow-gold-lg transition-all group hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-charcoal-500 mb-3">{value.title}</h3>
                  <p className="text-brown-500 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section ref={journeyRef} className="section-padding bg-gradient-to-br from-cream-200 to-cream-100">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-500 mb-4">Our Journey</h2>
              <p className="text-brown-500 text-lg">Milestones that shaped ShreeRatna</p>
            </div>
            <div className="max-w-3xl mx-auto">
              {journey.map((item, index) => (
                <div key={item.year} className="journey-item flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-maroon-500 to-maroon-600 rounded-full flex items-center justify-center text-white font-display font-bold shadow-maroon">
                      {item.year}
                    </div>
                    {index < journey.length - 1 && (
                      <div className="w-[2px] h-full bg-gradient-to-b from-maroon-400 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-sm hover:shadow-gold transition-shadow">
                    <h3 className="text-xl font-display font-bold text-charcoal-500 mb-2">{item.title}</h3>
                    <p className="text-brown-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="relative py-24 overflow-hidden">
          <div className="cta-bg absolute inset-0 bg-gradient-to-br from-maroon-600 via-maroon-500 to-peacock-600" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-[10%] w-32 h-32 border border-white rounded-full" />
            <div className="absolute bottom-10 right-[10%] w-48 h-48 border border-white rounded-full" />
          </div>
          <div className="container-custom relative z-10 text-center">
            <Crown className="w-16 h-16 text-gold-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Begin Your Heritage Journey
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Explore our curated collection of authentic Indian jewelry, each piece a testament to centuries of craftsmanship.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/shop"
                className="px-8 py-4 bg-gold-500 text-charcoal-800 rounded-xl font-bold hover:bg-gold-400 transition-all shadow-gold-lg"
              >
                Shop Collection
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
