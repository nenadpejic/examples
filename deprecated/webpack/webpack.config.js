const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isProduction = process.env.NODE_ENV == 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // [name] takes the key of entry[name]. Default is main.
    clean: true, // Delete previous bundle
    assetModuleFilename: 'assets/[name].[ext]', // With [name][ext] the filenames for the assets will remain the same after bundling.
  },
  // devtool: 'source-map', // Create a source-map for debugging.
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    watchFiles: ['./src/*'],
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        // [OPTION 1] Doesn't extract CSS. Add import for .css in .js.
        // https://webpack.js.org/loaders/sass-loader/#extracts-css-into-separate-files
        // use: [
        //   // Creates `style` nodes from JS strings
        //   "style-loader",
        //   // Translates CSS into CommonJS
        //   "css-loader",
        //   // Compiles Sass to CSS
        //   "sass-loader",
        // ],

        // [OPTION 2] Extracts CSS. Add plugin mini-css-extract-plugin.
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],

        // [OPTION 3] Extracts CSS. Add entry: 'src/style/main.scss' and add a <link> to main.css in index.html.
        // type: "asset/resource",
        // generator: {
        //   filename: "main.css",
        // },
        // use: ["sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        generator: {
          filename: 'script.js',
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
