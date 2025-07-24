import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearProducts: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (product) => set((state) => ({ products: state.products.filter((p) => p.id !== product.id) })),
  clearProducts: () => set({ products: [] }),
}));
