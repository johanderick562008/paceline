# PACELINE — Running & Sportswear

A responsive, accessible frontend for **PACELINE**, an independent running shop in Glasgow selling running shoes,
apparel and accessories. Built as a Web Development Club recruitment assignment: recreate the supplied **Home** and
**About** page designs as closely as possible and make every visible interaction work.

> **Live URL:** https://paceline-delta.vercel.app/

---

## Design

The supplied references live in [`design/`](design/) and are the source of truth:

| File | Purpose |
| --- | --- |
| `design/Home.png` (1440 × 4091) | Home page reference |
| `design/About.png` (1440 × 5684) | About page reference |
| `design/src/Home/*`, `design/src/About/*` | Original supplied photography (untouched) |

The UI uses optimised **WebP copies** of those images (`src/assets/`, `public/images/`). The originals are never modified.
About 16 MB of PNG became ~0.8 MB of WebP.

### Design tokens (`src/styles/index.css`)

Colours were sampled from the reference PNGs, then adjusted only where needed for WCAG AA contrast.

| Token | Value | Use |
| --- | --- | --- |
| `cream` | `#efe9de` | Page background |
| `cream-light` | `#f5f1e8` | "What we stand for" band |
| `ink` | `#171614` | Announcement bar, dark panels, footer, text |
| `lime` | `#c9f04c` | Primary CTA, highlights on dark |
| `orange` | `#e85d2f` | Reference accent (large display text, decoration) |
| `orange-ink` | `#b93d0e` | Small orange text such as section eyebrows (4.65:1 on cream) |
| `sale` | `#c2410c` | SALE badge, cart count (white text 5.2:1) |
| `tan` | `#d98c47` | Value card "03" |

Type is **Inter Variable**, self-hosted through `@fontsource-variable/inter` (no third-party font requests). Headlines
use weight 800–900 with tight tracking. The layout uses a 1312 px content width with 64 px gutters at 1440 px, matching the references.

### Section order

**Home:** announcement bar → nav → hero ("Chase Every Second.") → 01 Shop by category → 02 New arrivals →
Our story (with stats) → Men's/Women's running promos → newsletter → footer.

**About:** breadcrumb + "Our Story" → 01 Why we exist → 02 What we stand for → 03 Ten seasons in (timeline) →
04 Visit us → 05 Meet the founders → lime CTA → newsletter → footer.

### Where the build differs from the references, and why

- **Story paragraph:** in `Home.png` the paragraph overlaps the stats row. Here it has proper spacing.
- **"Visit us in":** in `About.png` the city name is missing. The build shows the city ("Glasgow") from the design's
  own announcement bar. It adds no postal address, phone number or opening hours, because none were supplied.
- **Map pin:** the pin in `About.png` isn't part of `map.png`, so it's drawn as an overlay. The map is labelled
  "illustrative".
- **Hero slide indicator:** the three bars are reproduced, but only one hero image was supplied. They're decorative
  (`aria-hidden`), and no extra campaigns were invented.
- **Small orange text** uses the darker `orange-ink` so it stays readable. Large orange numerals keep the reference colour.
- **Value numerals "02" (lime) and "03" (tan) on white** fall below 3:1 contrast. They keep the reference colours because they're
  decorative (`aria-hidden`), and the list order comes from `<ol>`. Lighthouse flags this, and it's the only accessibility
  audit that fails.

### Inferred behaviour (not shown in the static designs)

Hover, focus and mobile behaviour were inferred and kept restrained: image zoom on hover, a quick-add overlay on product
cards, a slide-in bag drawer, a full-screen mobile menu, a search overlay, toast confirmations, and stacked layouts on
small screens.

---

## Features

- **Pixel-conscious Home and About pages** with all of the supplied photography.
- **Shared header:** announcement bar and sticky navigation. Every nav item goes to a real page: Men, Women, Footwear,
  Apparel and Sale open collections, Brands opens a brand index, and About opens the About page.
- **Accessible mobile menu** (dialog with focus trap; closes on Escape, backdrop click or navigation).
- **Search overlay:** searches by name or brand, supports arrow keys, shows an empty state, has a Clear button, and
  has a "View all results" link to the collection page.
- **Collections** (`/shop/:slug`): category chips, in-collection search, brand filter, sort, an empty state with
  "Clear filters", and URL-driven state so pages can be shared and survive a refresh.
- **New arrivals tabs** (New In / Best Sellers / Race Day / Trail) with an empty state.
- **Product page** (`/product/:id`): size selection with a validation error, add to bag, wishlist, and related products.
- **Bag drawer:** add, remove, change quantity (1–10), line subtotals, total, free-delivery progress, and an empty state.
- **Wishlist:** toggle buttons using `aria-pressed`, a wishlist page and an empty state.
- **Newsletter:** React Hook Form + Zod validation (required / format), loading, success and error states.
- **Gait analysis**, **account**, **checkout**, **brands**, **info** and **404** pages, so no link is dead.

### Demo data, and what this site does *not* do

- **Products** (`src/data/products.ts`) are **demo content**. Names, prices, sizes and availability are sample values;
  the first four mirror `Home.png`. Only one product photo was supplied, so every footwear item shares it. This is stated on the product page.
- **Bag and wishlist** are saved in `localStorage` in the visitor's browser only (`paceline-cart`, `paceline-wishlist`).
- **No payment provider or backend.** `/checkout` shows an order summary and says plainly that no payment can be
  taken and no order is placed.
- **Newsletter:** with no endpoint configured it runs in **demo mode**. It validates the address and confirms that
  nothing was stored. Entering `error@example.com` simulates a failure. If `VITE_NEWSLETTER_ENDPOINT` is set, it POSTs `{ "email": "..." }` there.
- **Account:** there's no authentication. `/account` says so and links to the bag and wishlist.
- **Gait analysis:** the page explains the free Saturday clinic described in the design. It doesn't take bookings.

All editable copy lives in `src/config/site.ts`, `src/data/about.ts`, `src/data/collections.ts` and `src/data/pages.ts`.

---

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · Zustand (persisted) · React Hook Form + Zod ·
Lucide React · Vitest + React Testing Library · Playwright · ESLint (typescript-eslint, react-hooks, jsx-a11y).

## Project structure

```
paceline/
├── design/                 # Supplied references + original PNG assets (unmodified)
├── e2e/                    # Playwright end-to-end tests
├── public/                 # favicon, robots.txt, hero images (preloaded from index.html)
├── scripts/screenshots.mjs # Full-page screenshots for comparing against design/*.png
├── src/
│   ├── assets/             # WebP copies of the supplied images
│   ├── components/
│   │   ├── layout/         # AnnouncementBar, Navbar, MobileMenu, Footer, Newsletter, Layout, Toast
│   │   ├── home/           # Hero, Category, Arrivals, Story, Explore sections
│   │   ├── about/          # Intro, Mission, Values, Timeline, VisitUs, Founders, CTA sections
│   │   ├── shop/           # ProductCard, ProductGrid, CartDrawer, SearchDialog, WishlistButton
│   │   └── ui/             # Button, Dialog, SectionHeader, PageHeader
│   ├── config/site.ts      # Brand/business settings
│   ├── data/               # Demo products, collections, About copy, info pages
│   ├── hooks/ pages/ schemas/ store/ styles/ types/ utils/
│   ├── test/               # Vitest + RTL tests
│   ├── App.tsx             # Routes (Home + About eager, other pages code-split)
│   └── main.tsx
├── .env.example
├── playwright.config.ts
├── vercel.json             # Build output + SPA rewrites + asset caching
└── vite.config.ts
```

## Getting started

**Requirements:** Node.js 20.19+ (developed on Node 24) and npm 10+.

```bash
npm install
cp .env.example .env   # optional — only needed for a real newsletter endpoint
npm run dev            # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript project check |
| `npm run lint` | ESLint (includes jsx-a11y rules) |
| `npm test` | Vitest unit and component tests |
| `npm run test:e2e` | Playwright on desktop and mobile, against the production build |

The first time you run the e2e tests, install the browser with `npx playwright install chromium`. To test a deployment instead, set
`E2E_BASE_URL=https://your-url npm run test:e2e`.

## Testing

**Unit/component (Vitest + RTL), 27 tests:** Home and About render every section in order; nav, logo, CTA and category
navigation; footer links have real destinations; 404 and info routes; mobile menu dialog (Escape, focus return, close
on navigate); arrivals filter tabs; wishlist toggle and empty state; size validation → add to bag; quantity
changes, totals and removal; bag drawer focus trap; cart store rules; search results, keyboard navigation, empty state
and clear; collection filtering and empty state; newsletter required, format, loading, success and error; `subscribe()` API mode.

**End-to-end (Playwright, desktop 1440 px and Pixel 7):** hero image loads; "Shop new arrivals" scrolls; Home → About
→ Home (through the mobile menu on mobile); category → collection; product → bag → quantity → checkout; bag and deep
routes survive a refresh; newsletter; no horizontal overflow at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1600 px.

**Lighthouse 12** (local `vite preview`, so no gzip or Brotli; numbers will differ in production):

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home (mobile) | 93 | 100 | 100 | 100 |
| Home (desktop) | 67 | 100 | 100 | 100 |
| About (mobile) | 96 | 96 | 100 | 100 |
| About (desktop) | 74 | 96 | 100 | 100 |

The desktop performance scores are held back by LCP render delay. This is a client-rendered SPA, and the local preview server
serves uncompressed JS. The hero image is preloaded from `index.html` so it doesn't wait for the bundle. The About
accessibility score is 96 because of the decorative numerals explained above.

## Deployment

The project is ready for **Vercel**. `vercel.json` sets the build command, the `dist` output and SPA rewrites so deep
links like `/about` or `/product/...` work after a refresh.

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New → Project**, import the repository, and keep the detected **Vite** preset
   (build `npm run build`, output `dist`). If the repository contains more than this folder, set **Root Directory** to `paceline`.
3. Optionally add `VITE_NEWSLETTER_ENDPOINT` under **Environment Variables**.
4. Deploy, then check the result with `E2E_BASE_URL=<deployment-url> npm run test:e2e`.

Netlify and other static hosts also work: build with `npm run build`, publish `dist/`, and add an SPA fallback to `index.html`.

## Known limitations

- Frontend only. There's no real catalogue, inventory, accounts, orders, payments or bookings.
- One shoe photo is shared by all demo footwear. Apparel and accessory items reuse the supplied category photos.
- The social links (Instagram, Strava, TikTok, YouTube) lead to an info page because no official handles were supplied.
- The hero has a single slide (only one hero image was supplied).
- Client-side rendering. SSR or prerendering would improve desktop LCP further.
- ESLint is pinned to v9 because `eslint-plugin-jsx-a11y` doesn't support ESLint 10 yet.
