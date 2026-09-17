# Information architecture

`ia.json` is the only file here to hand-edit. `IA.md` and `matrix.csv` are
generated from it and will be overwritten — don't edit those.

```bash
node validate.mjs   # checks totals, referential integrity, categories
node build.mjs      # regenerates IA.md and matrix.csv
```

Run both after any change to `ia.json`. `validate.mjs` exits non-zero on a hard
failure; the `NOTES` section it prints is informational and needs a human read
rather than an automatic fix.

## Provenance

Derived by reading the codebase — `src/App.jsx` for routes, `src/pages/*` and
`src/components/*` for sections — not from a crawl of the live site. Route
counts for the two data-driven templates come from the length of the exported
arrays in `src/content/`: `products.js` has 3 entries, `posts.js` has 7. If you
add a post or a product, update that template's `routeCount` and
`meta.totalRoutes` together, or the validator will catch the mismatch.

## What the data shows

**10 of 15 routes (67%) come from just two data-driven templates** — blog post
and product detail. Only 5 routes are genuinely one-off pages. Adding content
costs nothing structurally; the build effort lives in those 5.

**Only 3 sections are shared across templates**, and all three are the layout
chrome: `chrome.navbar`, `chrome.footer` and `conversion.cta-band`. The other 21
are single-use. That is worth knowing before anyone refactors on instinct — most
of these sections have exactly one caller and should stay page-local until a
second one appears.

**`conversion.cta-band` reaches all 15 routes but is rendered once**, as the
first child of `Footer`, which the shared `Layout` wraps around every route. Page
components must not render `<CTA />` themselves. They previously did, on four
pages, which produced a visible duplicate band; the fix was deleting the
page-level copies, not touching `CTA.jsx`. The IA records this so the mistake
isn't repeated.

**`src/pages/About.jsx` implements 5 distinct sections** — hero, approach,
intelligence arc, team and hiring — making it by far the densest page component.
If any page here is a candidate for being split into smaller components, it's
that one. `BlogPost.jsx` (3) is a distant second.

All 24 sections have an `implementedBy` pointing at a real file, across 15
distinct components. Nothing in this IA is speculative.

## One caveat on the route count

`meta.totalRoutes` is 15, which counts the catch-all `*` (404) as a route. It is
a page users land on and it renders real markup, so it's counted — but it isn't
a URL anyone navigates to deliberately. If you'd rather track only addressable
routes, the number is 14. Change it in one place and the validator will tell you
which scope strings need updating to match.

## Blog bodies are empty on purpose

`narrative.article-body` is fully implemented — the 800px measure, the paragraph
/ heading / quote / figure block renderer — but every post in `src/content/posts.js`
ships `body: []`, so the section currently renders a placeholder. The article
prose was deliberately not transcribed from the live site. Populate `body` with
block objects and the template renders them immediately; no component changes
needed.
