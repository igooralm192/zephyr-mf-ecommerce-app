import ReactDOM from "react-dom/client";

import "./index.css";
import { CheckoutCart } from "./CheckoutCart";

function App() {
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <CheckoutCart />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);