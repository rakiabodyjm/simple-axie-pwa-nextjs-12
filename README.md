This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

---

## PWA Transformation

To start with creating a PWA:

---

1. Create `manifest` file through [SimiCart](https://www.simicart.com/manifest-generator.html/)

- Use SimiCart to generate new `manifest.webmanifest`
  > _This will serve as our first version of `manifest.json`_
- Put link to `manifest.json` in `_document.tsx`

```html
<link rel="manifest" href="/manifest.json" />
```

---

2. Create more favicon and app icons to be used when installing on iOS, Android and Windows

- Go to [Favicon.ico & App Icon Generator](https://www.favicon-generator.org/)
- Copy generated `manifest.json` and paste into `public` folder
- Merge `manifest.json` key and value pairs with `manifest.webmanifest` files
- Download generated Icons and images and place into `public` folder

---

3. Install next-pwa

```bash
yarn add next-pwa
```

---

4. Configure `next-pwa` in `next.config.js`

```
const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    disable: process.env.NODE_ENV === 'development',
  },
})


```

---

5. Add to `.gitignore`\_

```
**/public/workbox-*.js
**/public/sw.js
```

---

6. Build

```
yarn build
```
