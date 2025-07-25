import "./index.css";

import { useCartStore, useCartEvent } from "home/cartStore";

export function ProductList() {
  const { dispatchAddProduct, dispatchClearProducts } = useCartEvent();

  const productsSize = useCartStore(state => state.products.length);

  return (
    <div>
      <h2>ProductList {productsSize}</h2>
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => dispatchAddProduct({ id: "1", name: "Product 1", price: 10 })}
      >
        Add product
      </button>
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => dispatchClearProducts()}
      >
        Clear cart
      </button>
    </div>
  )
}
