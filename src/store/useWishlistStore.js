/**
 * Wishlist Store using Zustand
 * Manages wishlist state with Supabase sync
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      isLoading: false,
      _hasHydrated: false,

      // Hydration setter
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      // Initialize wishlist (sync with Supabase for logged-in users)
      initializeWishlist: async (userId) => {
        if (!userId) return;

        try {
          set({ isLoading: true });
          
          const { data, error } = await supabase
            .from('wishlist')
            .select(`
              id,
              product:products (
                id, name, price, original_price, images, category, metal_purity
              )
            `)
            .eq('user_id', userId);

          if (error) throw error;

          const items = data.map(item => ({
            id: item.product.id,
            wishlistItemId: item.id,
            name: item.product.name,
            price: parseFloat(item.product.price),
            original_price: item.product.original_price ? parseFloat(item.product.original_price) : null,
            image: item.product.images?.[0],
            category: item.product.category,
            metal_purity: item.product.metal_purity,
          }));

          set({ items, isLoading: false });
        } catch (error) {
          console.error('Error syncing wishlist:', error);
          set({ isLoading: false });
        }
      },

      // Check if item is in wishlist
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      },

      // Add item to wishlist
      addItem: async (product, userId = null) => {
        const { items, isInWishlist } = get();
        
        if (isInWishlist(product.id)) return;

        const newItem = {
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          original_price: product.original_price ? parseFloat(product.original_price) : null,
          image: product.images?.[0],
          category: product.category,
          metal_purity: product.metal_purity,
        };

        set({ items: [...items, newItem] });

        // Sync with Supabase if logged in
        if (userId) {
          try {
            const { data, error } = await supabase
              .from('wishlist')
              .insert({
                user_id: userId,
                product_id: product.id,
              })
              .select()
              .single();

            if (!error && data) {
              set({
                items: get().items.map(item =>
                  item.id === product.id
                    ? { ...item, wishlistItemId: data.id }
                    : item
                ),
              });
            }
          } catch (error) {
            console.error('Error syncing wishlist item:', error);
          }
        }
      },

      // Remove item from wishlist
      removeItem: async (productId, userId = null) => {
        const { items } = get();
        const item = items.find(i => i.id === productId);

        set({ items: items.filter(item => item.id !== productId) });

        // Sync with Supabase
        if (userId && item?.wishlistItemId) {
          await supabase.from('wishlist').delete().eq('id', item.wishlistItemId);
        }
      },

      // Toggle wishlist item
      toggleItem: async (product, userId = null) => {
        const { isInWishlist, addItem, removeItem } = get();
        
        if (isInWishlist(product.id)) {
          await removeItem(product.id, userId);
          return false;
        } else {
          await addItem(product, userId);
          return true;
        }
      },

      // Clear wishlist
      clearWishlist: async (userId = null) => {
        set({ items: [] });

        if (userId) {
          await supabase.from('wishlist').delete().eq('user_id', userId);
        }
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useWishlistStore;

