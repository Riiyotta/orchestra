# Orchestra — site rebuild

React + Vite + Tailwind v3 rebuild of orchestra.bio, measured against the live
site at a 1280px viewport.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts: `npm run build` (production bundle to `dist/`), `npm run preview`
(serve the built bundle).

## Fonts — read this before deploying

The original uses two commercially licensed typefaces, served to it under
Framer's foundry agreement. That license does not extend to a self-hosted build,
so neither font file is included here. Both are substituted:

| Original | Foundry | Substitute | License |
|---|---|---|---|
| Greed Standard Medium | Displaay | General Sans | Free for commercial use (Fontshare) |
| Tiempos Text Regular | Klim | Source Serif 4 | SIL OFL |

`IBM Plex Mono` (SIL OFL) is used as-is — it's what the original uses.

Substituted faces have different metrics than the originals, so headline line
breaks and text widths differ slightly from the live site. This is inherent to
substitution and is not tunable away.

To restore the originals: license them from Displaay and Klim, add the files,
and swap the two family names in `tailwind.config.js`. Family names containing
spaces or digits must stay quoted there — Tailwind emits the array verbatim, and
an unquoted name is invalid CSS that the browser silently drops.

## Images and video

Images and both MP4s are referenced from `framerusercontent.com` rather than
mirrored locally. If you want them self-hosted, confirm first that none are
stock or contractor-supplied under narrower terms, then download and repoint.

The favicon is an original mark, not the site's logo.

## Routes

| Route | Source |
|---|---|
| `/` | `src/pages/Home.jsx` |
| `/product/:slug` | `src/pages/Product.jsx` + `src/content/products.js` (3 slugs) |
| `/about` | `src/pages/About.jsx` |
| `/contact` | `src/pages/Contact.jsx` |
| `/blog` | `src/pages/BlogIndex.jsx` + `src/content/posts.js` |
| `/blog/:slug` | `src/pages/BlogPost.jsx` (7 slugs) |
| anything else | `src/pages/NotFound.jsx` |

Client-side routing via react-router. On a static host, add a rewrite so deep
links fall through to `index.html` (Netlify: `/* /index.html 200`; Vercel: a
catch-all rewrite) — otherwise `/about` 404s on hard refresh.

### Blog article bodies are intentionally empty

`src/content/posts.js` carries each post's title and cover image, but `body` is
an empty array. `BlogPost.jsx` implements the measured article template —
800px measure, 16px/24px body, heading/quote/figure blocks — and renders a
placeholder where prose would go. Fill `body` with block objects:

```js
body: [
  { type: 'p', text: '...' },
  { type: 'h2', text: '...' },
  { type: 'figure', src: '...', caption: '...' },
  { type: 'quote', text: '...' },
]
```

The article text was not transcribed from the live site. The template is built
to the real measurements; the prose is yours to supply.

### Contact form

Posts nowhere — `onSubmit` sets local state and shows a confirmation. Wire it to
your own handler. The original also carries ~11 zero-size hidden inputs as a
bot honeypot; that is not reproduced here, since it only works paired with
server-side filtering.

## Fidelity

Band positions measured against the live site at 1280px:

| Band | Original (y/h) | Clone (y/h) |
|---|---|---|
| Hero | 0 / 502 | 0 / 502 |
| Showcase | 502 / 894 | 502 / 893 |
| Pillars | 1395 / 1048 | 1395 / 1048 |
| System | 2443 / 772 | 2443 / 772 |
| Updates | 3215 / 607 | 3215 / 619 |
| CTA + footer | 3822 / 909 | 3834 / 980 |

Total height 4813px vs the original's 4731px. The hero and showcase are
pixel-exact, including the video inset inside the product frame.

## Known interpretations

- **Marquee ribbon** — the original is a flat SVG strip. This is a live CSS
  marquee with chips built from the site's own status labels; it animates where
  the original doesn't. Labels beyond the visible ones are invented.
- **Pillars accordion** — structure (fixed 1048px clipped band, two tabs, left
  copy / right screenshot stack) matches. The body copy for "Financial
  Modelling" is written here, not extracted, since it sits behind a tab.
- **Scroll reveal** — the original drives motion through Framer's JS runtime
  with no CSS transitions to read. `.reveal` is an IntersectionObserver
  equivalent, not a measured copy.
- All 7 routes above are built (see "Routes" earlier in this file) and nav/
  footer links point at this app's own routes, not the live site's paths.
