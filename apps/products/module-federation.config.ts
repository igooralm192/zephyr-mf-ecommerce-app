export const mfConfig = {
  name: "products",
  filename: "remoteEntry.js",
  exposes: {
    "./ProductList": "./src/ProductList",
  },
  shared: {
    react: {singleton: true},
    'react-dom': {singleton: true},
    'zustand': {singleton: true, eager: true},
  },
  remotes: {
    home: "home@http://localhost:8082/remoteEntry.js",
  }
};
