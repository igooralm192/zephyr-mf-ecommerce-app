export const mfConfig = {
  dts: false,
  name: "ecommerce_products",
  filename: "remoteEntry.js",
  exposes: {
    "./ProductList": "./src/ProductList",
  },
  shared: ["react", "react-dom", "zustand"],
  remotes: {
    "ecommerce_home": "ecommerce_home@http://localhost:8080/remoteEntry.js",
  }
};
