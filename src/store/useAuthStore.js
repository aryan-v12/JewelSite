/**
 * Authentication Store using Zustand
 * Manages user authentication state and profile
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, authHelpers } from '../lib/supabase';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      profile: null,
      session: null,
      isLoading: true,
      isAuthenticated: false,

      // Initialize auth state
      initialize: async () => {
        try {
          set({ isLoading: true });
          
          // Get current session
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // Fetch user profile
            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            set({
              user: session.user,
              profile,
              session,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              profile: null,
              session: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }

          // Set up auth state listener
          supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              const { data: profile } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single();

              set({
                user: session.user,
                profile,
                session,
                isAuthenticated: true,
              });
            } else if (event === 'SIGNED_OUT') {
              set({
                user: null,
                profile: null,
                session: null,
                isAuthenticated: false,
              });
            }
          });
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ isLoading: false });
        }
      },

      // Sign up
      signUp: async (email, password, fullName) => {
        try {
          set({ isLoading: true });
          const { data, error } = await authHelpers.signUp(email, password, {
            full_name: fullName,
          });
          
          if (error) throw error;
          
          set({ isLoading: false });
          return { success: true, data };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Sign in
      signIn: async (email, password) => {
        try {
          set({ isLoading: true });
          const { data, error } = await authHelpers.signIn(email, password);
          
          if (error) throw error;

          // Fetch profile
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();

          set({
            user: data.user,
            profile,
            session: data.session,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: error.message };
        }
      },

      // Sign out
      signOut: async () => {
        try {
          await authHelpers.signOut();
          set({
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
          });
          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },

      // Update profile
      updateProfile: async (updates) => {
        try {
          const { user } = get();
          if (!user) throw new Error('Not authenticated');

          const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();

          if (error) throw error;

          set({ profile: data });
          return { success: true, data };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;

