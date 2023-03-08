const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");
const contentPath = path.resolve(__dirname, "public");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };
  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    !withModules
      ? "css-loader"
      : {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64]",
            },
          },
        },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
  target: isProd ? "browserslist" : "web",
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  output: {
    path: buildPath,
    filename: filename("js"),
  },
  optimization: optimization(),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(contentPath, "index.html"),
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: filename("css"),
      }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.join(contentPath, "favicon.svg"), to: buildPath },
      ],
    }),
    new CleanWebpackPlugin(),
    new ESLintWebpackPlugin(),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.(png | svg | jpg)$/,
        use: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@shared": path.join(srcPath, "shared"),
      "@entities": path.join(srcPath, "entities"),
      "@pages": path.join(srcPath, "pages"),
      "@features": path.join(srcPath, "features"),
      "@widgets": path.join(srcPath, "widgets"),
    },
  },
  devServer: {
    static: {
      directory: contentPath,
    },
    open: true,
    host: "127.0.0.1",
    port: 9000,
    hot: isDev,
    historyApiFallback: true,
  },
};
