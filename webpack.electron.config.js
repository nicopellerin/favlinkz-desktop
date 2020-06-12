const path = require("path")

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  node: {
    __dirname: false,
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
        use: [{ loader: "file-loader" }],
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
}
