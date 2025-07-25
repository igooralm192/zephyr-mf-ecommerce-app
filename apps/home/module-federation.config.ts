export const mfConfig = {
  name: "home",
  filename: "remoteEntry.js",
  exposes: {
    "./cartStore": "./src/cartStore.ts",
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
    'home/cartStore': {
      eager: true,
      singleton: true,
      requiredVersion: false as const,
    },
  },
  remotes: {
    checkout: "checkout@http://localhost:8080/remoteEntry.js",
    products: "products@http://localhost:8081/remoteEntry.js",
  }
};
