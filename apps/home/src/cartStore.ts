import { useEffect } from "react";
import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (productId: string) => set((state) => ({ products: state.products.filter((p) => p.id !== productId) })),
  clearProducts: () => set({ products: [] }),
}));

const LAST_EVENT_IDS = new Set<string>();

export function useCartEvent() {
  const { addProduct, removeProduct, clearProducts } = useCartStore();

  function dispatchAddProduct(product: Product) {
    window.dispatchEvent(
      new CustomEvent("cart:add-product", {
        detail: { eventId: crypto.randomUUID(), product }
      })
    )
  }

  function dispatchRemoveProduct(productId: string) {
    window.dispatchEvent(
      new CustomEvent("cart:remove-product", {
        detail: { eventId: crypto.randomUUID(), productId }
      })
    )
  }

  function dispatchClearProducts() {
    window.dispatchEvent(
      new CustomEvent("cart:clear-products", {
        detail: { eventId: crypto.randomUUID() }
      })
    )
  }

  function productAdded(event: CustomEvent) {
    const { eventId, product } = event.detail;
    if (LAST_EVENT_IDS.has(eventId)) return;
    LAST_EVENT_IDS.add(eventId);
    addProduct(product);
  }

  function productRemoved(event: CustomEvent) {
    const { eventId, productId } = event.detail;
    if (LAST_EVENT_IDS.has(eventId)) return;
    LAST_EVENT_IDS.add(eventId);
    removeProduct(productId);
  }

  function productsCleared(event: CustomEvent) {
    const { eventId } = event.detail;
    if (LAST_EVENT_IDS.has(eventId)) return;
    LAST_EVENT_IDS.add(eventId);
    clearProducts();
  }

  useEffect(() => {
    window.addEventListener("cart:add-product", productAdded as EventListener )
    window.addEventListener("cart:remove-product", productRemoved as EventListener)
    window.addEventListener("cart:clear-products", productsCleared as EventListener)
    return () => {
      window.removeEventListener("cart:add-product", productAdded as EventListener)
      window.removeEventListener("cart:remove-product", productRemoved as EventListener)
      window.removeEventListener("cart:clear-products", productsCleared as EventListener)
    }
  }, [])

  return {
    dispatchAddProduct,
    dispatchRemoveProduct,
    dispatchClearProducts,
  }
}
