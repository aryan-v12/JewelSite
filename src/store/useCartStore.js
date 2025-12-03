/**
 * Cart Store using Zustand
 * Manages shopping cart state with Supabase sync
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      isLoading: false,
      isSyncing: false,

      // Computed values
      get totalItems() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      get totalAmount() {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },

      get totalSavings() {
        return get().items.reduce((sum, item) => {
          const originalPrice = item.original_price || item.price;
          return sum + ((originalPrice - item.price) * item.quantity);
        }, 0);
      },

      // Initialize cart (sync with Supabase for logged-in users)
      initializeCart: async (userId) => {
        if (!userId) return;

        try {
          set({ isSyncing: true });
          
          const { data, error } = await supabase
            .from('cart')
            .select(`
              id,
              quantity,
              product:products (
                id, name, price, original_price, images, metal_purity, weight, stock_quantity
              )
            `)
            .eq('user_id', userId);

          if (error) throw error;

          const items = data.map(item => ({
            id: item.product.id,
            cartItemId: item.id,
            name: item.product.name,
            price: parseFloat(item.product.price),
            original_price: item.product.original_price ? parseFloat(item.product.original_price) : null,
            image: item.product.images?.[0],
            metal_purity: item.product.metal_purity,
            weight: item.product.weight,
            stock_quantity: item.product.stock_quantity,
            quantity: item.quantity,
          }));

          set({ items, isSyncing: false });
        } catch (error) {
          console.error('Error syncing cart:', error);
          set({ isSyncing: false });
        }
      },

      // Add item to cart
      addItem: async (product, quantity = 1, userId = null) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
          // Update quantity
          await get().updateQuantity(product.id, existingItem.quantity + quantity, userId);
        } else {
          // Add new item
          const newItem = {
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            original_price: product.original_price ? parseFloat(product.original_price) : null,
            image: product.images?.[0],
            metal_purity: product.metal_purity,
            weight: product.weight,
            stock_quantity: product.stock_quantity,
            quantity,
          };

          set({ items: [...items, newItem] });

          // Sync with Supabase if logged in
          if (userId) {
            try {
              const { data, error } = await supabase
                .from('cart')
                .insert({
                  user_id: userId,
                  product_id: product.id,
                  quantity,
                })
                .select()
                .single();

              if (!error && data) {
                set({
                  items: get().items.map(item =>
                    item.id === product.id
                      ? { ...item, cartItemId: data.id }
                      : item
                  ),
                });
              }
            } catch (error) {
              console.error('Error syncing cart item:', error);
            }
          }
        }
      },

      // Update item quantity
      updateQuantity: async (productId, quantity, userId = null) => {
        const { items } = get();

        if (quantity <= 0) {
          await get().removeItem(productId, userId);
          return;
        }

        set({
          items: items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });

        // Sync with Supabase
        if (userId) {
          const item = items.find(i => i.id === productId);
          if (item?.cartItemId) {
            await supabase
              .from('cart')
              .update({ quantity })
              .eq('id', item.cartItemId);
          }
        }
      },

      // Remove item from cart
      removeItem: async (productId, userId = null) => {
        const { items } = get();
        const item = items.find(i => i.id === productId);

        set({ items: items.filter(item => item.id !== productId) });

        // Sync with Supabase
        if (userId && item?.cartItemId) {
          await supabase.from('cart').delete().eq('id', item.cartItemId);
        }
      },

      // Clear entire cart
      clearCart: async (userId = null) => {
        set({ items: [] });

        if (userId) {
          await supabase.from('cart').delete().eq('user_id', userId);
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;

