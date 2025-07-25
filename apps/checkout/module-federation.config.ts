export const mfConfig = {
  name: "checkout",
  filename: "remoteEntry.js",
  exposes: {
    "./CheckoutCart": "./src/CheckoutCart",
  },  
  shared: ['react', 'react-dom'],
  remotes: {
    home: "home@http://localhost:8082/remoteEntry.js",
  }
};
