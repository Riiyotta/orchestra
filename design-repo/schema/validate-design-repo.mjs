#!/usr/bin/env node
/*
 * Validates the design-repo against itself, against the root ia.json, and
 * against the real source tree. Exits non-zero on any ERROR.
 *
 *   node design-repo/schema/validate-design-repo.mjs
 *
 * This checks referential integrity (do the pointers resolve?) and drift
 * (has the code moved out from under the docs?) — not prose quality.
 */
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const errors = []
const warnings = []
const err = (m) => errors.push(m)
const warn = (m) => warnings.push(m)

const tokens = read('design-repo/tokens/tokens.json')
const primitives = read('design-repo/primitives/primitives.json')
const components = read('design-repo/components/components.json')
const sections = read('design-repo/sections/sections.json')
const templates = read('design-repo/templates/templates.json')
const ia = read('ia.json')

/* 1. Every section's implementedBy must exist on disk. */
for (const [key, s] of Object.entries(sections.sections)) {
  if (!existsSync(join(ROOT, s.implementedBy)))
    err(`section "${key}" -> implementedBy "${s.implementedBy}" does not exist on disk`)
}

/* 2. Every component file must exist, and its section must resolve. */
for (const [name, c] of Object.entries(components.components)) {
  if (!existsSync(join(ROOT, c.file)))
    err(`component "${name}" -> file "${c.file}" does not exist on disk`)
  if (c.section && !sections.sections[c.section])
    err(`component "${name}" -> section "${c.section}" is not a key in sections.json`)
}

/* 3. Every template section reference must resolve. */
for (const [id, t] of Object.entries(templates.templates)) {
  for (const s of t.sections)
    if (!sections.sections[s]) err(`template "${id}" references unknown section "${s}"`)
}

/* 4. Derived files must still match ia.json (they are generated from it). */
if (Object.keys(sections.sections).length !== Object.keys(ia.sections).length)
  err(`sections.json has ${Object.keys(sections.sections).length} sections but ia.json has ${Object.keys(ia.sections).length} — re-run sync.mjs`)
if (Object.keys(templates.templates).length !== ia.templates.length)
  err(`templates.json has ${Object.keys(templates.templates).length} templates but ia.json has ${ia.templates.length} — re-run sync.mjs`)
for (const key of Object.keys(ia.sections))
  if (!sections.sections[key]) err(`ia.json section "${key}" is missing from sections.json — re-run sync.mjs`)

/* 5. Token colors must match the Tailwind config that actually ships. */
const tw = readFileSync(join(ROOT, 'tailwind.config.js'), 'utf8')
for (const [name, t] of Object.entries(tokens.color)) {
  const hex = t.value
  if (!tw.includes(hex))
    err(`color token "${name}" (${hex}) is not present in tailwind.config.js — tokens have drifted from the build`)
}

/* 6. Primitives must still be defined in the CSS they claim. */
const css = readFileSync(join(ROOT, 'src/index.css'), 'utf8')
for (const [name, p] of Object.entries(primitives.primitives)) {
  if (p.kind === 'icon') continue // lives partly in JSX
  if (!css.includes(`.${name}`))
    err(`primitive ".${name}" is documented but not defined in src/index.css`)
}

/* 7. CTA must be rendered by Footer and by no page (a stated invariant). */
const footer = readFileSync(join(ROOT, 'src/components/Footer.jsx'), 'utf8')
if (!/CTA/.test(footer)) err('invariant broken: Footer.jsx no longer renders <CTA />')
for (const page of ['Home', 'About', 'Contact', 'Product', 'BlogIndex', 'BlogPost', 'NotFound']) {
  const f = join(ROOT, `src/pages/${page}.jsx`)
  if (existsSync(f) && /from '.*\/CTA/.test(readFileSync(f, 'utf8')))
    err(`invariant broken: src/pages/${page}.jsx imports CTA — it must only be rendered by Footer`)
}

/* 8. Regression guard (was DRIFT-01, fixed): section components must read post
 *    data from the shared source, never redeclare it inline. */
const updates = readFileSync(join(ROOT, 'src/components/Updates.jsx'), 'utf8')
if (!/from '.*content\/posts/.test(updates))
  err('Updates.jsx no longer imports src/content/posts.js — post data must come from the shared source')
if (/const POSTS\s*=/.test(updates))
  err('Updates.jsx redeclares POSTS locally — this is the DRIFT-01 duplication returning')

/* 9. Internal routes use <Link>; a raw <a href="/..."> costs a full reload and
 *    loses the router's scroll-to-top. External hrefs are exempt. */
for (const [name, c] of Object.entries(components.components)) {
  if (!existsSync(join(ROOT, c.file))) continue
  const src = readFileSync(join(ROOT, c.file), 'utf8')
  // Matches href="/x", href={`/x/${y}`} and href={'/x'} — but not external
  // URLs, mailto:, or an opaque href={expr} whose target we cannot see.
  for (const m of src.matchAll(/<a\b[^>]*?href=(?:["'`]|\{\s*["'`])(\/[^"'`]*)/g))
    err(`${c.file} uses a raw <a href="${m[1]}"> for an internal route — use <Link to=...> instead`)
}

/* Report */
const ok = (s) => `\x1b[32m${s}\x1b[0m`, bad = (s) => `\x1b[31m${s}\x1b[0m`, yel = (s) => `\x1b[33m${s}\x1b[0m`
console.log(`\ndesign-repo validation`)
console.log(`  tokens      ${Object.keys(tokens.color).length} colors, ${Object.keys(tokens.fontSize).length} type steps`)
console.log(`  primitives  ${Object.keys(primitives.primitives).length}`)
console.log(`  components  ${Object.keys(components.components).length}`)
console.log(`  sections    ${Object.keys(sections.sections).length} (${templates.meta.sharedSections} shared, ${templates.meta.pageLocalSections} page-local)`)
console.log(`  templates   ${Object.keys(templates.templates).length}`)
for (const w of warnings) console.log(`\n  ${yel('WARN')}  ${w}`)
for (const e of errors) console.log(`\n  ${bad('ERROR')} ${e}`)
console.log(errors.length ? `\n${bad(`FAILED — ${errors.length} error(s)`)}\n` : `\n${ok('PASS')}${warnings.length ? yel(` — ${warnings.length} warning(s)`) : ''}\n`)
process.exit(errors.length ? 1 : 0)
