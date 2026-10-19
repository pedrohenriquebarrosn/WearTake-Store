# WearTake — Interactive Fashion Storefront

**A responsive, bilingual storefront with product search, category filters, and a persistent shopping cart — built with vanilla JavaScript.**

[**Launch the live app ↗**](https://weartake-store-preview.vercel.app/) · [**Professional portfolio ↗**](https://portfolio-pedro-barros-2026-review.vercel.app/en) · [**Browser tests ↗**](https://github.com/pedrohenriquebarrosn/WearTake-Store/actions/runs/38476882022)

## Overview

WearTake is a browser-based fashion shopping experience built with HTML, CSS, and JavaScript — no frontend framework required. Visitors can filter products, search the catalog, modify cart quantities, and return later to find their cart preserved locally.

The original Full Stack training project was expanded into a bilingual, responsive implementation with improved cart logic and automated browser coverage.

## Features

- **Product discovery:** browse a six-item sample fashion catalog with responsive images.
- **Category filtering and search:** narrow results by type or product name.
- **Interactive cart:** add items, change quantities, remove products, and calculate totals.
- **Persistent browser state:** retain cart contents after refresh with validated `localStorage` data.
- **Responsive layout:** usable across mobile and desktop displays.
- **English / Portuguese:** switch between both supported languages.

## Stack

HTML5 · CSS3 · Vanilla JavaScript (ES6+) · Browser localStorage · Playwright

## Explore WearTake

**[Open the live storefront ↗](https://weartake-store-preview.vercel.app/)**

Try filtering the catalog, adding products, and refreshing to see the cart remain available. Product prices and listings are sample data; the cart is a frontend interaction rather than a payment or order-processing flow.

### Run locally

```bash
git clone https://github.com/pedrohenriquebarrosn/WearTake-Store.git
cd WearTake-Store
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Engineering & verification

- Browser tests cover filtering, text search, shopping-cart totals, quantity changes, removal, and persistence.
- Responsive layout and product imagery were exercised in automated checks.
- The interface uses standard browser APIs without a runtime backend.

[**Review the recorded GitHub Actions run ↗**](https://github.com/pedrohenriquebarrosn/WearTake-Store/actions/runs/38476882022)

## About the developer

**Pedro Henrique Barros Nascimento** — Full Stack Web Development training at Kenzie Academy Brasil; Business Administration coursework completed at UNIFG. Interested in applied AI, software development, and practical business solutions.

[GitHub](https://github.com/pedrohenriquebarrosn) · [LinkedIn](https://www.linkedin.com/in/pedro-henrique-barros-nascimento-2bb684251/) · [Portfolio EN](https://portfolio-pedro-barros-2026-review.vercel.app/en) · [Portfólio PT](https://portfolio-pedro-barros-2026-review.vercel.app/pt)
