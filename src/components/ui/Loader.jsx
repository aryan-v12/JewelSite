/**
 * Elegant Jewelry-themed Loader Component
 * Features a spinning diamond with golden accents
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ fullScreen = true, size = 'md' }) => {
  const containerRef = useRef(null);
  const diamondRef = useRef(null);
  const ringsRef = useRef([]);

  const sizes = {
    sm: { diamond: 24, ring: 40 },
    md: { diamond: 40, ring: 64 },
    lg: { diamond: 56, ring: 88 },
  };

  const currentSize = sizes[size] || sizes.md;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Diamond rotation and scale pulse
      gsap.to(diamondRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(diamondRef.current, {
        scale: 1.1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Animated rings
      ringsRef.current.forEach((ring, index) => {
        gsap.to(ring, {
          rotation: index % 2 === 0 ? 360 : -360,
          duration: 3 + index * 0.5,
          repeat: -1,
          ease: 'none',
        });

        gsap.to(ring, {
          opacity: 0.3,
          duration: 1,
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
          ease: 'power1.inOut',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const content = (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center ${
        fullScreen ? 'fixed inset-0 bg-cream-100/95 backdrop-blur-sm z-50' : ''
      }`}
      role="status"
      aria-label="Loading"
    >
      <div className="relative" style={{ width: currentSize.ring * 2, height: currentSize.ring * 2 }}>
        {/* Outer decorative rings */}
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            ref={(el) => (ringsRef.current[index] = el)}
            className="absolute inset-0 rounded-full border-2 border-dashed"
            style={{
              borderColor: index === 0 ? '#D4AF37' : index === 1 ? '#B76E79' : '#4A148C',
              transform: `scale(${1 - index * 0.15})`,
              opacity: 0.6,
            }}
          />
        ))}

        {/* Center diamond */}
        <div
          ref={diamondRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: currentSize.diamond, height: currentSize.diamond }}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <defs>
              <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5E6A3" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#A68A29" />
              </linearGradient>
            </defs>
            <polygon
              points="20,0 40,20 20,40 0,20"
              fill="url(#diamondGradient)"
              className="drop-shadow-lg"
            />
            <polygon
              points="20,5 35,20 20,35 5,20"
              fill="none"
              stroke="#FFF8F0"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-6 font-display text-lg text-gold-600 tracking-widest animate-pulse">
        Loading...
      </p>
    </div>
  );

  return content;
};

// Skeleton loader for product cards
export const ProductCardSkeleton = () => (
  <div className="card-elegant p-4 animate-pulse">
    <div className="aspect-square bg-gray-200 rounded-lg shimmer" />
    <div className="mt-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded shimmer w-3/4" />
      <div className="h-3 bg-gray-200 rounded shimmer w-1/2" />
      <div className="h-5 bg-gray-200 rounded shimmer w-1/3" />
    </div>
  </div>
);

// Text skeleton
export const TextSkeleton = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-200 rounded shimmer"
        style={{ width: `${100 - i * 15}%` }}
      />
    ))}
  </div>
);

export default Loader;

