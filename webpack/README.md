# Webpack

Example of using Webpack.

## Technologies

- webpack
- webpack-cli
- webpack-dev-server

## Setup

- Initialize npm:

```bash
$ npm init -y
```

- Install dependencies:

```bash
$ npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```

- NOTES:
  - With WP there is no need to set `type="module"` on the script tag in index.html, so that you can use `import` in index.js
  - WP bundles all the necesary files from node_modules into main.js so they can be downloaded and used on the client
  - Hot Module Replacement is enabled by adding `hot: true` to webpack.config.js and adding `if (module.hot) { module.hot.accept(); }` to index.js
  - Bundling of src/index.html to dist/index.html is done by adding `plugins: [new HtmlWebpackPlugin()]` to webpack.config.js. Also add `devServer.watchFiles: ["src/index.html"]` to webpack.config.js to enable live-reload when changing the .html.
