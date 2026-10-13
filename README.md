# WearTake — Fashion Storefront

**A responsive product catalog and interactive shopping cart built with HTML, CSS, and vanilla JavaScript.**

[**↗ See live preview**](https://weartake-store-preview-b8u4grwle-pedrohenriquebarrosns-projects.vercel.app/) · [**↗ Code on GitHub**](https://github.com/pedrohenriquebarrosn/WearTake-Store)

## Overview

WearTake is a fashion storefront exercise originally created during web-development training and modernized as a bilingual, framework-free portfolio project. It demonstrates interactive catalog behavior and persistent browser-local cart management.

## Key features

- Browse a six-product illustrative catalog with responsive images.
- Filter by category and search products by text.
- Add products to the cart, change quantities, or remove items.
- Display item subtotals, shopping-cart quantity, and combined total.
- Preserve cart contents across reloads using validated `localStorage` data.
- Use a mobile-friendly layout and English/Portuguese interface.

## Technology stack

HTML5 · CSS3 · JavaScript (ES6+) · localStorage · Playwright

## Explore and run locally

The default `master` branch contains the reviewed storefront, automated browser tests, and bilingual cart implementation. The hosted preview is a separate deployment and should be checked against the current release.

```bash
git clone https://github.com/pedrohenriquebarrosn/WearTake-Store.git
cd WearTake-Store
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Engineering and verification

- Automated browser tests exercise filtering, combined search, cart operations, cart persistence, images, and mobile layout.
- The application uses only standard browser APIs and requires no runtime backend.
- The product catalog is illustrative; cart interactions do not create real orders or process payments.

---

## Author

**Pedro Henrique Barros Nascimento** — Business Administration graduate and Full Stack development alumnus of Kenzie Academy Brasil.

[GitHub profile](https://github.com/pedrohenriquebarrosn) · [LinkedIn](https://www.linkedin.com/in/pedro-henrique-barros-nascimento-2bb684251/)
