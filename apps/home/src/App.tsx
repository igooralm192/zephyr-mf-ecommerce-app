import ReactDOM from "react-dom/client";

import "./index.css";
import React from "react";

// import { TestComponent } from "test/Test";
// import { ProductList } from "products/ProductList";
// import { useCartStore, useCartEvent } from "./cartStore";

const TestComponent = React.lazy(() => import("test/Test"));

function App() {
  // useCartEvent();

  // const productsSize = useCartStore(state => state.products.length);

  return (
    <div className="flex flex-col p-24 h-dvh gap-4">
      <nav>
        {/* <h3 className="text-2xl font-bold">My tiny ecommerce {productsSize}</h3> */}
      </nav>

      <main className="flex flex-1 gap-4">
        <section className="flex-1">
          {/* <ProductList /> */}
        </section>

        <section className="w-96">
          <TestComponent/>
        </section>
      </main>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);