import { dependencies as deps } from "./package.json";

console.log(deps)

export const mfConfig = {
  name: "products",
  filename: "remoteEntry.js",
  exposes: {
    "./ProductList": "./src/ProductList",
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: "19.1.0",
      strictVersion: true,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: "19.1.0",
      strictVersion: true,
    },
    "zustand": {
      singleton: true,
      requiredVersion: "5.0.6",
      strictVersion: true,
    },
  },
  remotes: {
    home: "home@http://localhost:8082/remoteEntry.js",
  }
};
