/**
 * AuthModal Component - Premium Login/Signup with elegant design
 */

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, Sparkles, Shield, Crown } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '', fullName: '', confirmPassword: ''
  });

  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const { signIn, signUp } = useAuthStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Kill any existing animations on these elements
    gsap.killTweensOf(overlayRef.current);
    gsap.killTweensOf(modalRef.current);

    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(modalRef.current, {
      opacity: 0, scale: 0.9, duration: 0.2,
      onComplete: () => {
        setFormData({ email: '', password: '', fullName: '', confirmPassword: '' });
        setMode('login');
        document.body.style.overflow = '';
        onClose();
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const result = await signIn(formData.email, formData.password);
        if (result.success) {
          toast.success('Welcome back!');
          handleClose();
        } else {
          toast.error(result.error || 'Login failed');
        }
      } else if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          setIsLoading(false);
          return;
        }
        const result = await signUp(formData.email, formData.password, formData.fullName);
        if (result.success) {
          toast.success('Account created! Please check your email to verify.');
          setMode('login');
        } else {
          toast.error(result.error || 'Signup failed');
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-maroon-900/70 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="bg-gradient-to-b from-cream-100 via-ivory to-cream-100 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-maroon-600 rounded-full" />
          <div className="absolute bottom-20 left-5 w-24 h-24 border border-gold-500 rounded-full" />
        </div>

        {/* Header with rich maroon gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-maroon-800 via-maroon-700 to-maroon-800" />

          {/* Decorative gold accents */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-4 left-4 w-16 h-16 border border-gold-400 rounded-full" />
            <div className="absolute bottom-2 right-8 w-24 h-24 border border-gold-400 rounded-full" />
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold-400/40" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold-400/40" />

          <div className="relative z-10 py-6 sm:py-8 px-6">
            <div className="text-center text-white">
              {/* Icon badge */}
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mb-3 sm:mb-4 shadow-lg">
                {mode === 'login' ? (
                  <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-maroon-800" />
                ) : mode === 'signup' ? (
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-maroon-800" />
                ) : (
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-maroon-800" />
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join ShreeRatna' : 'Reset Password'}
              </h2>
              <p className="text-cream-200/80 text-xs sm:text-sm font-sans mt-1">
                {mode === 'login' ? 'Sign in to your account' : mode === 'signup' ? 'Create your exclusive account' : 'We\'ll send you a reset link'}
              </p>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute -bottom-1 left-0 right-0">
            <svg viewBox="0 0 400 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 30L16.7 27.5C33.3 25 66.7 20 100 17.5C133.3 15 166.7 15 200 16.25C233.3 17.5 266.7 20 300 21.25C333.3 22.5 366.7 22.5 383.3 22.5L400 22.5V30H383.3C366.7 30 333.3 30 300 30C266.7 30 233.3 30 200 30C166.7 30 133.3 30 100 30C66.7 30 33.3 30 16.7 30H0Z" fill="#FDF8F3"/>
            </svg>
          </div>

          {/* Close button - with higher z-index and touch-friendly sizing */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 active:bg-white/40 transition-all duration-300 hover:rotate-90 z-50 touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>

        {/* Form with improved styling */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 relative z-10">
          {mode === 'signup' && (
            <div className="relative group">
              <label className="block text-xs font-semibold text-maroon-700 mb-1.5 uppercase tracking-wide">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-maroon-400 group-focus-within:text-maroon-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-white border-2 border-gold-200 rounded-xl text-brown-800 placeholder-brown-400
                           focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/20 outline-none transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          )}

          <div className="relative group">
            <label className="block text-xs font-semibold text-maroon-700 mb-1.5 uppercase tracking-wide">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-maroon-400 group-focus-within:text-maroon-600 transition-colors" />
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-white border-2 border-gold-200 rounded-xl text-brown-800 placeholder-brown-400
                         focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/20 outline-none transition-all duration-300 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="relative group">
              <label className="block text-xs font-semibold text-maroon-700 mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-maroon-400 group-focus-within:text-maroon-600 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 sm:pl-12 pr-12 py-3 sm:py-3.5 bg-white border-2 border-gold-200 rounded-xl text-brown-800 placeholder-brown-400
                           focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/20 outline-none transition-all duration-300 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-brown-400 hover:text-maroon-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="relative group">
              <label className="block text-xs font-semibold text-maroon-700 mb-1.5 uppercase tracking-wide">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-maroon-400 group-focus-within:text-maroon-600 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-white border-2 border-gold-200 rounded-xl text-brown-800 placeholder-brown-400
                           focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/20 outline-none transition-all duration-300 text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-xs sm:text-sm text-maroon-600 hover:text-maroon-800 font-semibold transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Premium submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-maroon-700 via-maroon-600 to-maroon-700 text-white font-bold py-3 sm:py-3.5 rounded-xl
                     hover:from-maroon-600 hover:via-maroon-500 hover:to-maroon-600 transition-all duration-300
                     shadow-lg hover:shadow-maroon-500/30 flex items-center justify-center gap-2 text-sm sm:text-base
                     disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />}
            {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </button>

          {/* Mode switch with premium styling */}
          <div className="text-center pt-2">
            <p className="text-brown-600 font-sans text-sm sm:text-base">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setMode('signup')} className="text-maroon-600 font-bold hover:text-maroon-800 transition-colors underline underline-offset-2">
                    Sign Up
                  </button>
                </>
              ) : mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setMode('login')} className="text-maroon-600 font-bold hover:text-maroon-800 transition-colors underline underline-offset-2">
                    Sign In
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => setMode('login')} className="text-maroon-600 font-bold hover:text-maroon-800 transition-colors underline underline-offset-2">
                  Back to Sign In
                </button>
              )}
            </p>
          </div>

          {/* Trust indicator */}
          <div className="flex items-center justify-center gap-2 pt-2 text-brown-500">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-xs">Secure & Encrypted</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
