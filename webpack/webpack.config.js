const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  // watch: true,
  // mode: "development",
  plugins: [
    // Bundles the index.html
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    port: 8080,
    static: path.resolve(__dirname, "dist"),
    hot: true,
    // Allows live reloading when src/index.html is updated
    watchFiles: ["src/index.html"],
  },
};
