# orchestra — design-repo

Machine-readable design system for this codebase, extracted from the source
rather than authored alongside it. Every value here was read out of
`tailwind.config.js`, `src/index.css`, `src/components/*` or `ia.json`.

## Layout

| Path | Authored by | What it holds |
|---|---|---|
| `tokens/tokens.json` | hand | Color, type, layout, motion, radius. The vocabulary. |
| `primitives/primitives.json` | hand | The 11 reusable classes in `@layer components/utilities` + the `Arrow` atom. |
| `components/components.json` | hand | The 10 shared React components, their contracts and known issues. |
| `sections/sections.json` | **generated** | 24 sections. Derived from `ia.json`. |
| `templates/templates.json` | **generated** | 7 templates + the shared-vs-page-local verdict. |
| `schema/schema.json` | hand | Shape contract and stated invariants. |
| `schema/sync.mjs` | hand | Regenerates the two generated files from `ia.json`. |
| `schema/validate-design-repo.mjs` | hand | Checks integrity + drift. Exits non-zero on error. |

## Commands

```bash
node design-repo/schema/validate-design-repo.mjs   # check (exit 1 on error)
node design-repo/schema/sync.mjs                   # regenerate derived files
```

## Source of truth

`ia.json` at the repo root remains the single source of truth for **structure**
(what sections exist, which template uses which). `sections.json` and
`templates.json` are generated from it and add design metadata on top — edit
`ia.json` and re-run `sync.mjs`, never hand-edit those two.

`tailwind.config.js` and `src/index.css` remain the source of truth for
**values**. `tokens.json` documents them and the validator fails if the two
drift apart.

## Rules for anyone changing this design

1. **Never hardcode a hex** that already exists in `tokens.json` — use the Tailwind token name.
2. **Pill actions come from a `btn-*` variant.** Don't compose a new one inline.
3. **Arrows use `<Arrow />`.** Its negative margins are tuned; an inline SVG copy overshoots the pill by 8px.
4. **Decimal pixel values are measurements, not mistakes.** `521.47px`, `242.52px`, `94.94px` and `79.8px` came off the original. Don't round them.
5. **`display-hero` is a hard swap, not fluid type.** 76px → 48px below `md`. Don't replace it with `clamp()`.
6. **`CTA` is rendered by `Footer` only.** It is the footer's first child, on the footer's ink background — never render it from a page.
7. **Fonts are substitutes.** `General Sans` and `Source Serif 4` stand in for the licensed Greed Standard and Tiempos Text. Swap both in `tailwind.config.js` to restore the originals — and re-check `SystemBand`'s pinned `h-[104px]` heading box, which exists only because the substitute face wraps wider.

## Known issues

None open. The validator enforces the following as errors:

- **DRIFT-01 (fixed)** — `Updates.jsx` now imports `POSTS` from
  `src/content/posts.js`. Which three posts appear is an explicit
  `FEATURED_SLUGS` list, not a slice: the design promotes posts 1, 2 and **4**,
  skipping `agents-for-r-d-strategy`, so reordering the blog must not silently
  change the home page. A guard fails the build if the local `POSTS` array
  returns.
- **Internal routes use `<Link>`** — a raw `<a href="/...">` in a component
  costs a full page reload and loses the router's scroll-to-top. External
  hrefs (`app.orchestra.bio`, LinkedIn, `mailto:`) are exempt.
