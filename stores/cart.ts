import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ===== Tipos ===== */
export type CartItem = {
  id: string;
  name: string;
  price: number;     // en tu moneda base
  quantity: number;  // cantidad actual en el carrito
  imageUrl?: string;
};

type CartState = {
  items: CartItem[];

  // Mutaciones
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  increment: (id: string, step?: number) => void;
  decrement: (id: string, step?: number) => void;
  clear: () => void;

  // Selectores
  count: () => number; // total de piezas (sumatoria de quantities)
  total: () => number; // total en dinero
};

/* ===== Utilidad ===== */
const clampQty = (n: number) => Math.max(1, Math.min(999, Math.floor(n || 1)));

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item, qty = 1) => {
        const q = clampQty(qty);
        const items = get().items;
        const idx = items.findIndex((i) => i.id === item.id);

        if (idx >= 0) {
          const next = [...items];
          next[idx] = {
            ...next[idx],
            quantity: clampQty((next[idx].quantity ?? 1) + q),
          };
          set({ items: next });
        } else {
          set({ items: [...items, { ...item, quantity: q }] });
        }
      },

      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      updateQuantity: (id, quantity) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: clampQty(quantity) } : i
          ),
        }),

      increment: (id, step = 1) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;
        get().updateQuantity(id, clampQty((item.quantity ?? 1) + step));
      },

      decrement: (id, step = 1) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;
        get().updateQuantity(id, clampQty((item.quantity ?? 1) - step));
      },

      clear: () => set({ items: [] }),

      // Selectores
      count: () => get().items.reduce((acc, it) => acc + (it.quantity ?? 1), 0),
      total: () => get().items.reduce((acc, it) => acc + it.price * (it.quantity ?? 1), 0),
    }),
    {
      name: "cart:v1", // clave en localStorage
      // Si quieres guardar solo items:
      // partialize: (state) => ({ items: state.items }),
    }
  )
);
