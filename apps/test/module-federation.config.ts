export const mfConfig = {
  name: "test",
  filename: "remoteEntry.js",
  exposes: {
    "./Test": "./src/Test.tsx",
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
    }
  },
  remotes: {
    home: "home@http://localhost:8082/remoteEntry.js",
  },
};
