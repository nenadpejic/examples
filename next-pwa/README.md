# Next PWA

Nexp app into Progressive Web App.

## Instructions

1. Create Next app

```bash
$ npx create-next-app
```

2. Add next-pwa as dependancy

```bash
$ npm install next-pwa
```

3. Create /next.config.js

```js
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
});
```

4. Create manifest, favicon and images in /public

- manifest.webmanifest https://www.simicart.com/manifest-generator.html/
- icon-192x192.png
- icon-256x256.png
- icon-384x384.png
- icon-512x512.png
- maskable-icon_x196.png
- favicon.ico https://www.favicon-generator.org/
- apple-touch-icon.png wich is 180x180

5. Create components/HeadComponent.js

6. Optional: Add auto-generated service worker to .gitignore

```bash
# next-pwa
/public/sw.js
/public/workbox-*.js
```
