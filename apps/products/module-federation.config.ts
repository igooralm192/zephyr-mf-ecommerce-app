export const mfConfig = {
  name: "products",
  filename: "remoteEntry.js",
  exposes: {
    "./ProductList": "./src/ProductList",
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: false as const,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: false as const,
    },
    "zustand": {
      singleton: true,
      requiredVersion: false as const,
    },
    './cartStore': {
      eager: true,
      singleton: true,
      requiredVersion: false as const,
    },
  },
  remotes: {
    home: "home@http://localhost:8082/remoteEntry.js",
  }
};
