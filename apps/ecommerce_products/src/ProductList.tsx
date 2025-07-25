import { useCartEvent, Product, useCartStore } from "ecommerce_home/cartStore";

import './index.css'


const products: Product[] = [
  { id: "1", name: "Product 1", price: 10 },
  { id: "2", name: "Product 2", price: 20 },
  { id: "3", name: "Product 3", price: 30 },
];


export default function ProductList() {
  const { dispatchAddItem } = useCartEvent();

  const { getItemQuantity } = useCartStore();

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {products.map((product) => (
          <li key={product.id} className="flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow-md">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-xl">${product.price}</p>
            </div>

            <div className="relative ">
              <div className="absolute top-0 right-0 pointer-events-none">
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {getItemQuantity(product.id)}
                </span>
              </div>
              <button
                onClick={() => dispatchAddItem(product)}
                className="py-3 px-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-plus w-4 h-4"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}