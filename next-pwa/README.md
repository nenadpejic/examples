# Next PWA

Example of setting a Nexp app as a Progressive Web App.

## Technologies

- create-next-app
- next-pwa

## Setup

- Initialize with create-next-app:

```bash
$ npx create-next-app
```

- Install dependencies:

```bash
$ npm install next-pwa
```

- Create /next.config.js:

```js
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
});
```

- Create manifest, favicon and images in /public:
  - manifest.webmanifest https://www.simicart.com/manifest-generator.html/
  - icon-192x192.png
  - icon-256x256.png
  - icon-384x384.png
  - icon-512x512.png
  - maskable-icon_x196.png
  - favicon.ico https://www.favicon-generator.org/
  - apple-touch-icon.png wich is 180x180

- Create components/HeadComponent.js

- Optional: Add auto-generated service worker to .gitignore:

```bash
# next-pwa
/public/sw.js
/public/workbox-*.js
```
