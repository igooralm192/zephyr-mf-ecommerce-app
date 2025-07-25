import { dependencies as deps } from "./package.json";

export const mfConfig = {
  name: "home",
  filename: "remoteEntry.js",
  exposes: {
    "./cartStore": "./src/cartStore",
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
    checkout: "checkout@http://localhost:8080/remoteEntry.js",
    products: "products@http://localhost:8081/remoteEntry.js",
    test: "test@http://localhost:8083/remoteEntry.js",
  }
};
