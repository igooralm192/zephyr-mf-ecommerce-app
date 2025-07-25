export const mfConfig = {
  name: "ecommerce_home",
  filename: "remoteEntry.js",
  exposes: {
    "./cartStore": "./src/cartStore",
  },
  shared: ['react', 'react-dom', 'zustand'],
  remotes: {
    "ecommerce_products": "ecommerce_products@http://localhost:8081/remoteEntry.js",
  }
};
