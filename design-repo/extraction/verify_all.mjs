#!/usr/bin/env node
/*
 * Drift-proofed integrity checks for the N0 layer, independent of
 * schema/validate-design-repo.mjs (which checks the pre-existing internal
 * shape: tokens/primitives/components/sections/templates vs. real source —
 * that script is untouched and still runs on its own).
 *
 * Checks:
 *   1. Allowlist parity — every id in tokens/llm/component-allowlist.json has
 *      a matching entry in sections/content-contracts.json and sections/
 *      sections.json, and vice versa. No phantom entries, no orphans.
 *   2. Citation-range validity — every measuredFrom/citation in
 *      extraction/measured-values.json resolves against the real file it
 *      names, at a real line count. Degrades gracefully (warns, does not
 *      fail) when the project root above design-repo/ is not present, e.g.
 *      when this folder is copied or zipped standalone — this is what makes
 *      self-containment testing possible.
 *   3. Manifest/reality drift — registry.manifest.json's counts.{sections,
 *      templates,routes} block is recomputed from the real sections.json /
 *      templates.json / ia.json (when present) and must match exactly.
 *
 * Path portability: ROOT derived from import.meta.url, never hardcoded.
 * Run: node design-repo/extraction/verify_all.mjs
 */
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..') // design-repo/
const PROJECT_ROOT = resolve(ROOT, '..') // one level up — may or may not exist in a standalone copy
const readJSON = (base, p) => JSON.parse(readFileSync(join(base, p), 'utf8'))

const errors = []
const warnings = []

/* ---------- 1. Allowlist parity ---------- */
function checkAllowlistParity() {
  const allowlist = readJSON(ROOT, 'tokens/llm/component-allowlist.json')
  const contracts = readJSON(ROOT, 'sections/content-contracts.json')
  const sections = readJSON(ROOT, 'sections/sections.json')

  const allowlistIds = new Set(Object.keys(allowlist.sections))
  const contractIds = new Set(Object.keys(contracts.contracts))
  const sectionIds = new Set(Object.keys(sections.sections))

  for (const id of allowlistIds) {
    if (!contractIds.has(id)) errors.push(`allowlist-parity: "${id}" is in component-allowlist.json but has no entry in sections/content-contracts.json (phantom entry)`)
    if (!sectionIds.has(id)) errors.push(`allowlist-parity: "${id}" is in component-allowlist.json but is not a real section in sections/sections.json (phantom entry)`)
  }
  for (const id of contractIds) {
    if (!allowlistIds.has(id)) errors.push(`allowlist-parity: "${id}" has a content contract but no entry in tokens/llm/component-allowlist.json (orphan)`)
  }
  for (const id of sectionIds) {
    if (!contractIds.has(id)) errors.push(`allowlist-parity: real section "${id}" (sections/sections.json) has no content contract in sections/content-contracts.json (orphan)`)
  }

  const manifest = readJSON(ROOT, 'registry.manifest.json')
  if (manifest.allowlistVersion !== allowlist.version) {
    errors.push(`allowlist-version-parity: registry.manifest.json says allowlistVersion "${manifest.allowlistVersion}" but tokens/llm/component-allowlist.json's own version is "${allowlist.version}"`)
  }
  return { allowlistCount: allowlistIds.size, contractCount: contractIds.size, sectionCount: sectionIds.size }
}

/* ---------- 2. Citation-range validity ---------- */
function checkCitations() {
  const mvPath = join(ROOT, 'extraction/measured-values.json')
  if (!existsSync(mvPath)) { warnings.push('citation-validity: extraction/measured-values.json not found — skipping'); return }
  const mv = JSON.parse(readFileSync(mvPath, 'utf8'))
  if (!existsSync(PROJECT_ROOT) || !existsSync(join(PROJECT_ROOT, 'ia.json'))) {
    warnings.push('citation-validity: no sibling project root found next to design-repo/ (expected when this folder is copied/zipped standalone) — citation checks skipped gracefully, not failed')
    return
  }
  let checked = 0
  for (const c of mv.citations) {
    const filePath = join(PROJECT_ROOT, c.path)
    if (!existsSync(filePath)) { errors.push(`citation-validity: "${c.claim}" cites ${c.path}, which does not exist`); continue }
    const lineCount = readFileSync(filePath, 'utf8').split('\n').length
    const m = /^(\d+)(?:-(\d+))?$/.exec(c.lines)
    if (!m) { errors.push(`citation-validity: "${c.claim}" has an unparseable lines field "${c.lines}"`); continue }
    const end = Number(m[2] ?? m[1])
    if (end > lineCount) {
      errors.push(`citation-validity: "${c.claim}" cites ${c.path}:${c.lines}, but the file only has ${lineCount} lines`)
    }
    checked++
  }
  console.log(`  citation-validity: checked ${checked}/${mv.citations.length} citations against real files`)
}

/* ---------- 3. Manifest / reality drift ---------- */
function checkManifestDrift() {
  const manifest = readJSON(ROOT, 'registry.manifest.json')
  const sections = readJSON(ROOT, 'sections/sections.json')
  const templates = readJSON(ROOT, 'templates/templates.json')

  const realSectionCount = Object.keys(sections.sections).length
  const realTemplateCount = Object.keys(templates.templates).length
  let realRouteCount = null

  const iaPath = join(PROJECT_ROOT, 'ia.json')
  if (existsSync(iaPath)) {
    const ia = JSON.parse(readFileSync(iaPath, 'utf8'))
    realRouteCount = ia.meta?.totalRoutes ?? null
  } else {
    // Fall back to summing each template's routeCount from templates.json itself,
    // which IS inside design-repo/ and so is always available, even standalone.
    realRouteCount = Object.values(templates.templates).reduce((sum, t) => sum + (t.routes?.length ?? 0), 0)
    warnings.push('manifest-drift: no sibling ia.json found — route count recomputed from templates/templates.json\'s own routes[] arrays instead (still a real recompute, not a copy of the manifest\'s claim)')
  }

  if (manifest.counts.sections !== realSectionCount) errors.push(`manifest-drift: registry.manifest.json claims counts.sections=${manifest.counts.sections} but sections/sections.json actually has ${realSectionCount}`)
  if (manifest.counts.templates !== realTemplateCount) errors.push(`manifest-drift: registry.manifest.json claims counts.templates=${manifest.counts.templates} but templates/templates.json actually has ${realTemplateCount}`)
  if (realRouteCount !== null && manifest.counts.routes !== realRouteCount) errors.push(`manifest-drift: registry.manifest.json claims counts.routes=${manifest.counts.routes} but the real route count is ${realRouteCount}`)

  return { realSectionCount, realTemplateCount, realRouteCount }
}

const parity = checkAllowlistParity()
checkCitations()
const drift = checkManifestDrift()

console.log(`\nverify_all`)
console.log(`  allowlist parity   ${parity.allowlistCount} allowlist entries, ${parity.contractCount} content contracts, ${parity.sectionCount} real sections`)
console.log(`  manifest counts    sections=${drift.realSectionCount} templates=${drift.realTemplateCount} routes=${drift.realRouteCount ?? 'n/a'} (recomputed)`)
for (const w of warnings) console.log(`  \x1b[33mWARN\x1b[0m  ${w}`)
for (const e of errors) console.log(`  \x1b[31mERROR\x1b[0m ${e}`)
console.log(errors.length ? `\n\x1b[31mFAILED — ${errors.length} error(s)\x1b[0m\n` : `\n\x1b[32mPASS\x1b[0m${warnings.length ? ` — ${warnings.length} warning(s)` : ''}\n`)
process.exit(errors.length ? 1 : 0)
