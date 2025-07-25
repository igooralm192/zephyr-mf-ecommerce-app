import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearProducts: () => void;
}

export function useCartStore() {
  return create<CartStore>((set) => ({
    products: [],
    addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
    removeProduct: (product) => set((state) => ({ products: state.products.filter((p) => p.id !== product.id) })),
    clearProducts: () => set({ products: [] }),
  }))()
};
