export const mfConfig = {
  name: "home",
  filename: "remoteEntry.js",
  exposes: {
    "./cartStore": "./src/cartStore.ts",
  },
  shared: {
    react: {singleton: true},
    'react-dom': {singleton: true},
    'zustand': {singleton: true, eager: true},
  },
  remotes: {
    checkout: "checkout@http://localhost:8080/remoteEntry.js",
    products: "products@http://localhost:8081/remoteEntry.js",
  }
};
