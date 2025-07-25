import ReactDOM from "react-dom/client";

import "./index.css";
import { ProductList } from "./ProductList";
import React from "react";

function App() {
  return (
    <div className="mt-10 mx-auto max-w-6xl">
      <React.Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </React.Suspense>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
