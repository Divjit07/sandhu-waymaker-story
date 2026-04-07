import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLineItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartLineItem[];
  addItem: (item: Omit<CartLineItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((cartItem) => cartItem.id === item.id);
          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: "waymaker-cart" },
  ),
);

export const getCartSubtotal = (items: CartLineItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);
