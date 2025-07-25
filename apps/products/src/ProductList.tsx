import "./index.css";

import { useCartStore } from "home/cartStore";


export function ProductList() {
  const products = useCartStore(state => state.products);

  return <div className="border-2 border-red-500">ProductList {products.length}</div>;
}
