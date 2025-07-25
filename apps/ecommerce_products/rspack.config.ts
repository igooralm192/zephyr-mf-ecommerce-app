import * as path from "node:path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { withZephyr } from "zephyr-rspack-plugin";

import { mfConfig } from "./module-federation.config";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

const name = "ecommerce_products";

export default withZephyr()({
  mode: isDev ? "development" : "production",
  context: __dirname,
  entry: {
    main: "./src/index.ts",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },

  devServer: {
    port: 8081,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      'Cache-Control': 'public, max-age=31536000'
    },
    compress: true
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    uniqueName: name,
    publicPath: "auto",
    filename: "[name].js",
  },

  experiments: {
    css: true,
    rspackFuture: {
      bundlerInfo: {
        force: false
      }
    }
  },
  performance: {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000,
    hints: 'warning',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
    new ModuleFederationPlugin(mfConfig),
    new rspack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new rspack.ProgressPlugin({}),
    isDev ? new RefreshPlugin() : null,
  ].filter(Boolean),
  optimization: {
    minimize: true,
    usedExports: true,
    sideEffects: false,
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
});
