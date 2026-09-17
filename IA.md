# React 18 + Vite 5 + Tailwind v3 rebuild of orchestra.bio

Source: React 18 + Vite 5 + Tailwind v3 rebuild of orchestra.bio
Status: **derived-from-codebase**
15 routes · 7 templates · 24 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Blog post, Product detail, Home) account for 11 of 15 routes (73%). The remaining 4 routes span 4 templates.

| template | routes | share |
|---|---:|---:|
| Blog post | 7 | 47% |
| Product detail | 3 | 20% |
| Home | 1 | 7% |
| About | 1 | 7% |
| Contact | 1 | 7% |
| Blog index | 1 | 7% |
| Not found | 1 | 7% |

## Page chrome

**15 routes carry chrome = `full`** — Home, Product detail, About, Contact, Blog index, Blog post, Not found.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `chrome.navbar` | CHROME | 7 | 15 | `src/components/Navbar.jsx` | Rendered by the shared Layout on all 15 routes, including the catch-all. |
| `chrome.footer` | CHROME | 7 | 15 | `src/components/Footer.jsx` | Rendered by the shared Layout on all 15 routes, including the catch-all. |
| `conversion.cta-band` | CONVERSION | 7 | 15 | `src/components/CTA.jsx` | Rendered once, as the first child of Footer, so it reaches all 15 routes. Page components must not render it themselves. |
| `hero.post` | HERO | 1 | 7 | `src/pages/BlogPost.jsx` | All 7 blog post routes. |
| `narrative.article-body` | NARRATIVE | 1 | 7 | `src/pages/BlogPost.jsx` | All 7 blog post routes. Bodies are empty stubs, so this currently renders a placeholder. |
| `collection.related-posts` | COLLECTION | 1 | 7 | `src/pages/BlogPost.jsx` | All 7 blog post routes. |
| `hero.product` | HERO | 1 | 3 | `src/pages/Product.jsx` | All 3 product detail routes. |
| `narrative.product-feature` | NARRATIVE | 1 | 3 | `src/pages/Product.jsx` | All 3 product detail routes. |
| `hero.home` | HERO | 1 | 1 | `src/components/Hero.jsx` | The home route only. |
| `hero.about` | HERO | 1 | 1 | `src/pages/About.jsx` | The about route only. |
| `hero.contact` | HERO | 1 | 1 | `src/pages/Contact.jsx` | The contact route only. |
| `hero.blog-featured` | HERO | 1 | 1 | `src/pages/BlogIndex.jsx` | The blog index route only. |
| `hero.not-found` | HERO | 1 | 1 | `src/pages/NotFound.jsx` | The catch-all route only. |
| `showcase.hero-timeline` | SHOWCASE | 1 | 1 | `src/components/HeroTimeline.jsx` | The home route only. |
| `showcase.product-frame` | SHOWCASE | 1 | 1 | `src/components/Showcase.jsx` | The home route only. |
| `showcase.system-video` | SHOWCASE | 1 | 1 | `src/components/SystemBand.jsx` | The home route only. |
| `narrative.pillar-accordion` | NARRATIVE | 1 | 1 | `src/components/Pillars.jsx` | The home route only. |
| `narrative.approach` | NARRATIVE | 1 | 1 | `src/pages/About.jsx` | The about route only. |
| `narrative.intelligence-arc` | NARRATIVE | 1 | 1 | `src/pages/About.jsx` | The about route only. |
| `narrative.team` | NARRATIVE | 1 | 1 | `src/pages/About.jsx` | The about route only. |
| `collection.post-grid` | COLLECTION | 1 | 1 | `src/pages/BlogIndex.jsx` | The blog index route only. |
| `collection.home-updates` | COLLECTION | 1 | 1 | `src/components/Updates.jsx` | The home route only. |
| `conversion.contact-form` | CONVERSION | 1 | 1 | `src/pages/Contact.jsx` | The contact route only. |
| `conversion.hiring` | CONVERSION | 1 | 1 | `src/pages/About.jsx` | The about route only. |

**3 shared sections** appear in more than one template and belong in a component library.

**21 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Home — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.home` | page-local |
| 3 | SHOWCASE | `showcase.hero-timeline` | page-local |
| 4 | SHOWCASE | `showcase.product-frame` | page-local |
| 5 | NARRATIVE | `narrative.pillar-accordion` | page-local |
| 6 | SHOWCASE | `showcase.system-video` | page-local |
| 7 | COLLECTION | `collection.home-updates` | page-local |
| 8 | CONVERSION | `conversion.cta-band` | shared ×7 |
| 9 | CHROME | `chrome.footer` | shared ×7 |

### Product detail — `template.product-detail`

3 routes · `/product/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.product` | page-local |
| 3 | NARRATIVE | `narrative.product-feature` | page-local |
| 4 | CONVERSION | `conversion.cta-band` | shared ×7 |
| 5 | CHROME | `chrome.footer` | shared ×7 |

### About — `template.about`

1 route · `/about` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.about` | page-local |
| 3 | NARRATIVE | `narrative.approach` | page-local |
| 4 | NARRATIVE | `narrative.intelligence-arc` | page-local |
| 5 | NARRATIVE | `narrative.team` | page-local |
| 6 | CONVERSION | `conversion.hiring` | page-local |
| 7 | CONVERSION | `conversion.cta-band` | shared ×7 |
| 8 | CHROME | `chrome.footer` | shared ×7 |

### Contact — `template.contact`

1 route · `/contact` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.contact` | page-local |
| 3 | CONVERSION | `conversion.contact-form` | page-local |
| 4 | CONVERSION | `conversion.cta-band` | shared ×7 |
| 5 | CHROME | `chrome.footer` | shared ×7 |

### Blog index — `template.blog-index`

1 route · `/blog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.blog-featured` | page-local |
| 3 | COLLECTION | `collection.post-grid` | page-local |
| 4 | CONVERSION | `conversion.cta-band` | shared ×7 |
| 5 | CHROME | `chrome.footer` | shared ×7 |

### Blog post — `template.blog-post`

7 routes · `/blog/{slug}` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.post` | page-local |
| 3 | NARRATIVE | `narrative.article-body` | page-local |
| 4 | COLLECTION | `collection.related-posts` | page-local |
| 5 | CONVERSION | `conversion.cta-band` | shared ×7 |
| 6 | CHROME | `chrome.footer` | shared ×7 |

### Not found — `template.not-found`

1 route · `*` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.navbar` | shared ×7 |
| 2 | HERO | `hero.not-found` | page-local |
| 3 | CONVERSION | `conversion.cta-band` | shared ×7 |
| 4 | CHROME | `chrome.footer` | shared ×7 |

## Section reference

### CHROME

_Layout-level furniture rendered by App.jsx for every route, outside the page component._

**`chrome.navbar`** — Fixed 88px ink bar: wordmark, Product/Company/Blog links with carets on the first two, Login, and a Contact pill. The item matching the current route gets a solid pill behind it.

· Rendered by the shared Layout on all 15 routes, including the catch-all. · appears on 15 routes · implemented by `src/components/Navbar.jsx`

**`chrome.footer`** — Ink footer below the CTA: wordmark, mission line, mail link, Company and Product link columns, copyright row and social marks.

· Rendered by the shared Layout on all 15 routes, including the catch-all. · appears on 15 routes · implemented by `src/components/Footer.jsx`

### HERO

_The page-opening block that establishes what the route is about._

**`hero.home`** — Centred ink hero: 76px two-line headline, single-line subhead and a light Book a demo pill.

· The home route only. · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.product`** — Left-aligned ink hero carrying the product's eyebrow, 56px title, subhead and a light Book a demo pill.

· All 3 product detail routes. · appears on 3 routes · implemented by `src/pages/Product.jsx`

**`hero.about`** — Centred ink hero with an About eyebrow and a 64px mission statement, no call to action.

· The about route only. · appears on 1 routes · implemented by `src/pages/About.jsx`

**`hero.contact`** — Paper band pairing a 40px "Get in Touch" heading and intro line with a full-height image on the right.

· The contact route only. · appears on 1 routes · implemented by `src/pages/Contact.jsx`

**`hero.blog-featured`** — Ink band promoting one post: cover image beside its title, excerpt and a Learn more link.

· The blog index route only. · appears on 1 routes · implemented by `src/pages/BlogIndex.jsx`

**`hero.post`** — Centred paper header: read-time line, article title, optional excerpt, then a full-width cover image.

· All 7 blog post routes. · appears on 7 routes · implemented by `src/pages/BlogPost.jsx`

**`hero.not-found`** — Ink 404 block: numeric eyebrow, apology headline and a link back to the home route.

· The catch-all route only. · appears on 1 routes · implemented by `src/pages/NotFound.jsx`

### SHOWCASE

_Product imagery and motion: screenshots, video, and the animated timeline strip._

**`showcase.hero-timeline`** — Animated 75px strip under the home hero: a looping horizontal track of lane-positioned pills, ring markers and labelled status chips.

· The home route only. · appears on 1 routes · implemented by `src/components/HeroTimeline.jsx`

**`showcase.product-frame`** — Full-bleed product screenshot with the interface video playing inset inside its frame, gated to play only while on screen.

· The home route only. · appears on 1 routes · implemented by `src/components/Showcase.jsx`

**`showcase.system-video`** — Paper band with a 48px heading above a full-bleed looping video of the management system.

· The home route only. · appears on 1 routes · implemented by `src/components/SystemBand.jsx`

### NARRATIVE

_Sequential explanatory blocks that carry a page's argument._

**`narrative.pillar-accordion`** — Fixed-height clipped band: a numbered pill menu, a 56px heading, and an auto-advancing two-item accordion whose active tab cross-fades the screenshot stack on the right.

· The home route only. · appears on 1 routes · implemented by `src/components/Pillars.jsx`

**`narrative.product-feature`** — Repeating paper band pairing a numbered chip, 48px heading and body copy with a screenshot; each product route renders three.

· All 3 product detail routes. · appears on 3 routes · implemented by `src/pages/Product.jsx`

**`narrative.approach`** — Two-column paper band stating the company's approach as a heading and a single paragraph.

· The about route only. · appears on 1 routes · implemented by `src/pages/About.jsx`

**`narrative.intelligence-arc`** — Lead-in line followed by three numbered columns naming the stages of the product's intelligence arc.

· The about route only. · appears on 1 routes · implemented by `src/pages/About.jsx`

**`narrative.team`** — Ink band of member pairs, each a portrait butted against a details panel carrying name, role and a LinkedIn link, followed by a full-width group photograph.

· The about route only. · appears on 1 routes · implemented by `src/pages/About.jsx`

**`narrative.article-body`** — The article itself at an 800px measure, rendered from typed blocks: paragraph, heading, pull quote and captioned figure.

· All 7 blog post routes. Bodies are empty stubs, so this currently renders a placeholder. · appears on 7 routes · implemented by `src/pages/BlogPost.jsx`

### COLLECTION

_Blocks that list other routes — post grids, related links._

**`collection.post-grid`** — Paper band listing every post except the featured one as a three-column grid of cover, title and Learn more link.

· The blog index route only. · appears on 1 routes · implemented by `src/pages/BlogIndex.jsx`

**`collection.related-posts`** — Two-column paper band offering two other posts at the foot of an article.

· All 7 blog post routes. · appears on 7 routes · implemented by `src/pages/BlogPost.jsx`

**`collection.home-updates`** — Ink "Latest updates" band showing three recent posts as cover-and-title cards.

· The home route only. · appears on 1 routes · implemented by `src/components/Updates.jsx`

### CONVERSION

_Blocks whose job is to get the visitor to act._

**`conversion.cta-band`** — "Get started today" band: mono eyebrow, 76px headline, subhead and a mint Book a demo pill, over a full-bleed photo layer.

· Rendered once, as the first child of Footer, so it reaches all 15 routes. Page components must not render it themselves. · appears on 15 routes · implemented by `src/components/CTA.jsx`

**`conversion.contact-form`** — Four-field enquiry form — name, email, phone, free-text challenges — with a mint submit pill; posts nowhere and confirms in local state.

· The contact route only. · appears on 1 routes · implemented by `src/pages/Contact.jsx`

**`conversion.hiring`** — Paper band pairing a "We're hiring!" heading with two paragraphs and a button out to the external Ashby job board.

· The about route only. · appears on 1 routes · implemented by `src/pages/About.jsx`
