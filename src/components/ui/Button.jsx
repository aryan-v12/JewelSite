/**
 * Button Component with various styles and animations
 */

import { forwardRef, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({
  children,
  variant = 'gold',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  magnetic = false,
  ripple = true,
  ...props
}, ref) => {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);

  // Magnetic effect
  useEffect(() => {
    if (!magnetic || !buttonRef.current) return;

    const button = buttonRef.current;
    const strength = 0.3;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magnetic]);

  // Ripple effect
  const createRipple = (e) => {
    if (!ripple || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rippleEl = document.createElement('span');
    rippleEl.className = 'absolute rounded-full bg-white/30 pointer-events-none';
    rippleEl.style.left = `${x}px`;
    rippleEl.style.top = `${y}px`;
    rippleEl.style.transform = 'translate(-50%, -50%) scale(0)';

    button.appendChild(rippleEl);

    gsap.to(rippleEl, {
      scale: 4,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => rippleEl.remove(),
    });
  };

  const variants = {
    gold: 'bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:shadow-gold-lg',
    purple: 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:shadow-purple',
    rose: 'bg-gradient-to-r from-rose-500 to-rose-400 text-white',
    outline: 'border-2 border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white',
    outlinePurple: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white',
    ghost: 'text-brown-800 hover:bg-brown-100/50',
    white: 'bg-white text-gold-600 hover:bg-cream-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <button
      ref={(el) => {
        buttonRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
      }}
      className={`
        relative overflow-hidden
        font-sans font-semibold rounded-full
        transition-all duration-300 ease-out
        transform hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      onClick={createRipple}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
            {children}
            {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
          </>
        )}
      </span>
      <span ref={rippleRef} />
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

