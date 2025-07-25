import ReactDOM from "react-dom/client";

import "./index.css";

import { ProductList } from "products/ProductList";
// import { Checkout } from "checkout/Checkout";

function App() {
  return (
    <div className="flex flex-col p-24 h-dvh gap-4">
      <nav>
        <h3 className="text-2xl font-bold">My tiny ecommerce</h3>
      </nav>

      <main className="flex flex-1 gap-4">
        <section className="flex-1">
          <ProductList />
        </section>

        <section className="w-96">
          {/* <Checkout/> */}
        </section>
      </main>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);