# Webpack

Example of using Webpack.

## Setup

Initialize npm:

```bash
$ npm init -y
```

Install webpack:

```bash
$ npm i -D webpack webpack-cli
```

Install webpacks dev server:

```bash
$ npm i -D webpack-dev-server
```

Install plugins:

```bash
# HTML template
$ npm i -D html-webpack-plugin

# CSS extractor
$ npm i -D mini-css-extract-plugin

# Bundle Analyzer
$ npm i -D webpack-bundle-analyzer
```

Install loaders:

```bash
# CSS
$ npm i -D style-loader css-loader

# SCSS
$ npm i -D sass sass-loader

# JS
$ npm i -D babel-loader @babel/preset-env

```

## Assets

For assets like svg etc.. use `asset/resource`. You use an `<img/>` tag in HTML with no src set and then set the src via JS. The bundled script will then auto set the src.

## NOTES

- With WP there is no need to set `type="module"` on the script tag in index.html, so that you can use `import` in index.js
- WP bundles all the necesary files from node_modules into main.js so they can be downloaded and used on the client
- Hot Module Replacement is enabled by adding `hot: true` to webpack.config.js and adding `if (module.hot) { module.hot.accept(); }` to index.js
- Bundling of src/index.html to dist/index.html is done by adding `plugins: [new HtmlWebpackPlugin()]` to webpack.config.js. Also add `devServer.watchFiles: ["src/index.html"]` to webpack.config.js to enable live-reload when changing the .html.
