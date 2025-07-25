import { useEffect } from "react";
import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
  getItemTotalPrice: (productId: string) => number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  incItemQuantity: (productId: string) => void;
  decItemQuantity: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  getTotalPrice: () => get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
  getItemQuantity: (productId: string) => get().items.find((p) => p.product.id === productId)?.quantity || 0,
  getItemTotalPrice: (productId: string) => {
    const item = get().items.find((p) => p.product.id === productId);
    if (item) {
      return item.product.price * item.quantity;
    }
    return 0;
  },
  addItem: (product: Product) => set((state) => {
    const existingItem = state.items.find((p) => p.product.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map((p) => p.product.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
      };
    }
    return {
      items: [...state.items, { product, quantity: 1 }]
    };
  }),
  removeItem: (productId: string) => set((state) => ({ items: state.items.filter((p) => p.product.id !== productId) })),
  incItemQuantity: (productId: string) => set((state) => ({ items: state.items.map((p) => p.product.id === productId ? { ...p, quantity: p.quantity + 1 } : p) })),
  decItemQuantity: (productId: string) => set((state) => {
    const existingItem = state.items.find((p) => p.product.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      return {
        items: state.items.map((p) => p.product.id === productId ? { ...p, quantity: p.quantity - 1 } : p)
      };
    }
    if (existingItem && existingItem.quantity === 1) {
      return {
        items: state.items.filter((p) => p.product.id !== productId)
      };
    }
    return state;
  }),
  clearCart: () => set({ items: [] }),
}));

const LAST_EVENT_IDS = new Set<string>();

export function useCartEvent() {
  const { addItem, removeItem, clearCart, incItemQuantity, decItemQuantity,  } = useCartStore();

  function dispatchAddItem(product: Product) {
    window.dispatchEvent(
      new CustomEvent("cart:add-item", {
        detail: { eventId: crypto.randomUUID(), product }
      })
    )
  }

  function dispatchRemoveItem(productId: string) {
    window.dispatchEvent(
      new CustomEvent("cart:remove-item", {
        detail: { eventId: crypto.randomUUID(), productId }
      })
    )
  }

  function dispatchClearCart() {
    window.dispatchEvent(
      new CustomEvent("cart:clear-cart", {
        detail: { eventId: crypto.randomUUID() }
      })
    )
  }

  function dispatchIncItemQuantity(productId: string) {
    window.dispatchEvent(
      new CustomEvent("cart:inc-item-quantity", {
        detail: { eventId: crypto.randomUUID(), productId }
      })
    )
  }

  function dispatchDecItemQuantity(productId: string) {
    window.dispatchEvent(
      new CustomEvent("cart:dec-item-quantity", {
        detail: { eventId: crypto.randomUUID(), productId }
      })
    )
  }

  function itemAdded(event: CustomEvent) {
    const { eventId, product } = event.detail;
    if (LAST_EVENT_IDS.has(eventId)) return;
    LAST_EVENT_IDS.add(eventId);
    addItem(product);
  }

  function itemRemoved(event: CustomEvent) {
    const { eventId, productId } = event.detail;
    if (LAST_EVENT_IDS.has(eventId)) return;
    LAST_EVENT_IDS.add(eventId);
    removeItem(productId);
  }

  function cartCleared(event: CustomEvent) {
    const { eventId } = event.detail;
    if (LAST_EVENT_IDS.has(eventId)) return;
    LAST_EVENT_IDS.add(eventId);
    clearCart();
  }

  function itemIncQuantity(event: CustomEvent) {
    const { eventId, productId } = event.detail;
    if (LAST_EVENT_IDS.has(eventId)) return;
    LAST_EVENT_IDS.add(eventId);
    incItemQuantity(productId);
  }

  function itemDecQuantity(event: CustomEvent) {
    const { eventId, productId } = event.detail;
    if (LAST_EVENT_IDS.has(eventId)) return;
    LAST_EVENT_IDS.add(eventId);
    decItemQuantity(productId);
  }

  useEffect(() => {
    window.addEventListener("cart:add-item", itemAdded as EventListener)
    window.addEventListener("cart:remove-item", itemRemoved as EventListener)
    window.addEventListener("cart:clear-cart", cartCleared as EventListener)
    window.addEventListener("cart:inc-item-quantity", itemIncQuantity as EventListener)
    window.addEventListener("cart:dec-item-quantity", itemDecQuantity as EventListener)
    return () => {
      window.removeEventListener("cart:add-item", itemAdded as EventListener)
      window.removeEventListener("cart:remove-item", itemRemoved as EventListener)
      window.removeEventListener("cart:clear-cart", cartCleared as EventListener)
      window.removeEventListener("cart:inc-item-quantity", itemIncQuantity as EventListener)
      window.removeEventListener("cart:dec-item-quantity", itemDecQuantity as EventListener)
    }
  }, [])

  return {
    dispatchAddItem,
    dispatchRemoveItem,
    dispatchClearCart,
    dispatchIncItemQuantity,
    dispatchDecItemQuantity,
  }
}
