import path from "path";

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";

import {
  ALIAS,
  DIST_DIR,
  IS_DEV,
  SERVER_BUNDLE_NAME,
  SERVER_SRC_DIR,
  SRC_DIR,
} from "./constants";
import * as Loaders from "./loaders";

const CopyPlugin = require("copy-webpack-plugin");

const serverConfig: Configuration = {
  name: "server",
  target: "node",
  node: { __dirname: false },
  entry: path.join(SERVER_SRC_DIR, "/server"),
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(SRC_DIR, "assets/images"),
          to: DIST_DIR,
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: Object.values(Loaders).map((el) => el.server),
  },
  output: {
    filename: `${SERVER_BUNDLE_NAME}.js`,
    path: DIST_DIR,
    publicPath: "/",
  },
  devtool: IS_DEV ? "source-map" : false,
  resolve: {
    alias: ALIAS,
    extensions: [".ts", ".tsx", ".js", ".scss"],
  },
  externals: [nodeExternals()],
};

export { serverConfig };
