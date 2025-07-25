import ReactDOM from "react-dom/client";
import ProductList from "ecommerce_products/ProductList";
import { useCartEvent, useCartStore } from "./cartStore";

import "./index.css";

function App() {
  const {
    dispatchRemoveItem,
    dispatchIncItemQuantity,
    dispatchDecItemQuantity,
  } = useCartEvent();

  const { items, getTotalPrice, getItemTotalPrice } = useCartStore();

  return (
    <div className="flex flex-col h-screen p-24 gap-2">
      <nav className="bg-gray-800 p-4 text-white">
        <h1 className="text-3xl">Ecommerce App</h1>
      </nav>
      <main className="flex-1 flex gap-2">
        <section className="flex-1">
          <ProductList />
        </section>
        <aside className="flex-2 bg-gray-300 ">
          <div className="p-4">
            <h2 className="text-2xl">Checkout</h2>

            <ul className="mt-2 space-y-8">
              {items.map((item) => (
                <li key={item.product.id} className="flex flex-col space-y-4">
                  <div className="flex flex-1 justify-between space-x-8">
                    <p className="flex-1">{item.product.name}</p>
                    <p>${item.product.price}</p>
                    <div className="flex items-center">
                      <button className="flex items-center justify-center w-6 h-6 border rounded-full" onClick={() => dispatchDecItemQuantity(item.product.id)}>
                        <i className="fas fa-minus text-sm"></i>
                      </button>
                      <p className="mx-2">{item.quantity}</p>
                      <button className="flex items-center justify-center w-6 h-6 border rounded-full" onClick={() => dispatchIncItemQuantity(item.product.id)}>
                        <i className="fas fa-plus text-sm"></i>
                      </button>
                      <button
                        className="ml-2 cursor-pointer"
                        onClick={() => dispatchRemoveItem(item.product.id)}
                      >
                        <i className="fas fa-trash text-sm"></i>
                      </button>
                    </div>
                    <p className="font-bold">${getItemTotalPrice(item.product.id)}</p>
                  </div>

                </li>
              ))}
            </ul>
            <p className="mt-8 font-semibold text-right">Total: ${getTotalPrice()}</p>
          </div>
        </aside>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);