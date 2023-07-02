# Webpack

Example of using Webpack.

## Software dependencies

- [Webpack](https://webpack.js.org/)

## Setup

Initialize npm:

```bash
$ npm init -y
```

Install webpack dependencies:

```bash
$ npm i -D webpack webpack-cli
```

[Optional] Initialize webpack config by running:

```bash
$ npx webpack init
# NOTE: This will require you to install `@webpack-cli/generators` but you can delete it after.
```

[Optional] Install webpack dev server:

```bash
$ npm i -D webpack-dev-server
```

[Optional] Install webpack bundle analyzer:

```bash
# Bundle Analyzer
$ npm i -D webpack-bundle-analyzer
```

## HTML

Use `html-webpack-plugin` in `webpack.config.js`:

```js
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
}
```

Then create `src/index.html`.

## CSS

[Option] If you want to import CSS in JS:

```js
module.exports = {
  module: {
    rules: [
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ]
    ]
  }
}
```

[Option] Or you can use `mini-css-extract-plugin`:

```js
module.exports = {
  plugins: {
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  },
  module: {
    rules: [
      test: /\.s[ac]ss$/i,
      use: [
        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        'sass-loader',
      ]
    ]
  }
}
```

[Option] Or you can use `asset/resource`:

```js
module.exports = {
  module: {
    rules: [
      test: /\.s[ac]ss$/i,
      type: "asset/resource",
      generator: {
        filename: "main.css",
      },
      use: [
        'css-loader',
        'sass-loader',
      ]
    ]
  }
}
```

## SCSS

Use `sass` and `sass-loader`:

```js
module.exports = {
  module: {
    rules: [
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ]
    ]
  }
}
```

## PostCSS and TailwindCSS

Use `postcss-loader` in `webpack.config.js`:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
}
```

Then create postcss.config.js:

```js
module.exports = {
  plugins: [require('autoprefixer'), require('postcss-nested')],
}
```

## JS

Use `babel-loader` and `@babel/preset-env`:

```js
module.exports = {
  module: {
    rules: [
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
```

## Assets

For assets like svg etc.. use `asset/resource`. You use an `<img/>` tag in HTML with no src set and then set the src via JS. The bundled script will then auto set the src.

## NOTES

- With WP there is no need to set `type="module"` on the script tag in index.html, so that you can use `import` in index.js
- WP bundles all the necesary files from node_modules into main.js so they can be downloaded and used on the client
- Hot Module Replacement is enabled by adding `hot: true` to webpack.config.js and adding `if (module.hot) { module.hot.accept(); }` to index.js
- Bundling of src/index.html to dist/index.html is done by adding `plugins: [new HtmlWebpackPlugin()]` to webpack.config.js. Also add `devServer.watchFiles: ["src/index.html"]` to webpack.config.js to enable live-reload when changing the .html.
