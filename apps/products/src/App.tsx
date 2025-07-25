import ReactDOM from "react-dom/client";

import "./index.css";
import { ProductList } from "./ProductList";

function App() {
  return (
    <div className="mt-10 mx-auto max-w-6xl">
      <ProductList />
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
