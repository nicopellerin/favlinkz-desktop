const path = require("path")
const webpack = require("webpack")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: "source-map",
  entry: "./main.ts",
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            query: {
              // Inline images smaller than 10kb as data URIs
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
    ],
  },
  optimization: {
    minimizer: process.env.E2E_BUILD
      ? []
      : [
          new TerserPlugin({
            parallel: true,
            sourceMap: true,
            cache: true,
          }),
        ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG_PROD: false,
      START_MINIMIZED: false,
      E2E_BUILD: false,
    }),
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
}
