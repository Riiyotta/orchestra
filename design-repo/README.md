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

## N0 layer (AI page-generation contract)

Additive to everything above — the internal-shape files keep validating this
design-repo's own consistency, while the N0 layer below is what an AI-driven
page generator reads to compose new, on-brand pages. See
`registry.manifest.json` for the full entry-point map.

| Path | What it holds |
|---|---|
| `registry.manifest.json` | Top-level registry: repo id, theme, recomputed counts, entry points, known content gaps. |
| `schema/pagespec.schema.json` | Draft-07 JSON Schema for a generated page composition (a "PageSpec"). Distinct from `schema/schema.json`. |
| `schema/example.pagespec.json` | One real, complete, passing PageSpec (template.blog-post, using real copy). |
| `schema/semantic_validate.mjs` | Enforces what JSON Schema can't: template/node-sequence agreement, per-section content contracts, compatibility rules, maxWords, assetRole closure. |
| `schema/tests/adversarial_test.mjs` | 7 template controls + 28 mutations, all proven to behave correctly. |
| `sections/content-contracts.json` | Generation-ready, closed content contracts for all 24 sections (required fields, maxWords, enums) — additive to `sections/sections.json`'s prose descriptions. |
| `tokens/llm/token-catalog.json` / `token-policy.json` / `component-allowlist.json` | Curated token view + enforcement policy + closed section allowlist for a generator. |
| `compatibility/graph.json` | Rhythm/ordering rules for the 7 real templates, each with a severity. |
| `assets/asset-roles.json` | Closed assetRole enum + the Framer-asset localization decision + AI-generation/licensing guidance (real company, real people — see file). |
| `motion/motion-spec.json` | Canonical motion contract, closed to the real, evidence-grounded patterns actually implemented. |
| `extraction/measured-values.json` / `verify_all.mjs` | Citation ledger + drift checks (allowlist parity, citation validity, manifest/reality count drift), all proven with a scratch-copy injection test. |

## Commands

```bash
node design-repo/schema/validate-design-repo.mjs   # internal-shape check (exit 1 on error)
node design-repo/schema/sync.mjs                   # regenerate derived files
node design-repo/schema/semantic_validate.mjs       # validate a PageSpec (defaults to the bundled example)
node design-repo/schema/tests/adversarial_test.mjs  # run the adversarial suite
node design-repo/extraction/verify_all.mjs          # allowlist parity + citation validity + manifest drift
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

## Known content gaps (N0 layer)

See `registry.manifest.json`'s `knownGaps` array for the machine-readable
version. In prose:

- **Blog article bodies are placeholders.** All 7 real posts ship with
  `body: []` in `src/content/posts.js` — `BlogPost.jsx` renders a literal
  placeholder message in their place. `sections/content-contracts.json`'s
  `narrative.article-body.contentIntegrity` field flags this explicitly for
  any generator reading this repo.
- **Framer-hosted assets stay external, by decision, not oversight.** Images
  and both MP4s are referenced live from `framerusercontent.com` rather than
  mirrored into this repo. `assets/asset-roles.json`'s `localizationDecision`
  documents why (an unresolved licensing-verification prerequisite this
  README already flagged) and what would need to happen before that changes.

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
