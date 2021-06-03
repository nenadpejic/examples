# Next PWA

Nexp app into Progressive Web App.

## Installation

Create with

```bash
$ npx create-next-app
```

Add next-pwa

```bash
$ npm install next-pwa
```

Create /next.config.js

```js
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
});
```

Create manifest, favicon and images in /public

```bash
# manifest.webmanifest with 5 .png images
https://www.simicart.com/manifest-generator.html/

# favicon.ico
https://www.favicon-generator.org/

# apple-touch-icon.png wich is 180x180
```

Test

```bash
$ npm run build
$ npm run start
```

Optional: Add auto-generated service worker to .gitignore

```bash
# next-pwa
/public/sw.js
/public/workbox-*.js
```
