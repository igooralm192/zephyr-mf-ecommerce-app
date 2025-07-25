import ReactDOM from "react-dom/client";

import "./index.css";

// import { CheckoutCart } from "checkout/CheckoutCart";
import { ProductList } from "products/ProductList";
import { useCartStore } from "./cartStore";

function App() {
  const { addProduct, products } = useCartStore();
  return (
    <div className="flex flex-col p-24 h-dvh gap-4">
      <nav>
        <h3 className="text-2xl font-bold">My tiny ecommerce {products.length}</h3>
      </nav>

      <div className="flex justify-end">
        <button 
          type="button" 
          className="bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => addProduct({ id: "1", name: "Product 1", price: 10 })}
        >
          Add product
        </button>
      </div>

      <main className="flex flex-1 gap-4">
        <section className="flex-1">
          <ProductList />
        </section>

        <section className="w-96">
          {/* <CheckoutCart/> */}
        </section>
      </main>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);