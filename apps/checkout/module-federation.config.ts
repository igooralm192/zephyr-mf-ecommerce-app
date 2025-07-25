export const mfConfig = {
  name: "checkout",
  filename: "remoteEntry.js",
  exposes: {
    "./Checkout": "./src/Checkout.tsx",
  },  
  shared: {
    react: {singleton: true},
    'react-dom': {singleton: true},
    'zustand': {singleton: true, eager: true},
  },
};
