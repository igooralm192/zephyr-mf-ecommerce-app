import React from "react";
import ReactDOM from "react-dom/client";
import ProductList from "./ProductList";

import "./index.css";

const App = () => (
  <div className="mt-10 mx-auto max-w-6xl">
    <ProductList />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);