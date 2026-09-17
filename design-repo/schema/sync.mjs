#!/usr/bin/env node
/*
 * Regenerates the DERIVED design-repo files from the root ia.json.
 *   node design-repo/schema/sync.mjs
 *
 * sections.json and templates.json are generated — edit ia.json instead.
 * tokens/, primitives/ and components/ are hand-authored and NOT touched here.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const ia = JSON.parse(readFileSync(join(ROOT, 'ia.json'), 'utf8'))
const surfaceOf = (d) => (/\bink\b/i.test(d) ? 'ink' : /\bpaper\b/i.test(d) ? 'paper' : 'inherit')

const sections = {
  $comment:
    'Section inventory. DERIVED from ia.json — do not hand-edit; run node design-repo/schema/sync.mjs',
  meta: {
    derivedFrom: 'ia.json',
    totalSections: Object.keys(ia.sections).length,
    totalTemplates: ia.templates.length,
    totalRoutes: ia.meta.totalRoutes,
  },
  categories: ia.categories,
  sections: Object.fromEntries(
    Object.entries(ia.sections).map(([k, v]) => [
      k,
      {
        category: v.category,
        description: v.description,
        scope: v.scope,
        implementedBy: v.implementedBy,
        surface: surfaceOf(v.description),
      },
    ])
  ),
  templates: ia.templates.map((t) => ({
    id: t.id,
    name: t.name,
    routeCount: t.routeCount,
    routePattern: t.routePattern,
    chrome: t.chrome,
    sections: t.sections,
  })),
}

const usage = {}
for (const t of ia.templates) for (const s of t.sections) (usage[s] ||= []).push(t.id)
const shared = Object.entries(usage).filter(([, v]) => v.length > 1)
const local = Object.entries(usage).filter(([, v]) => v.length === 1)

const templates = {
  $comment:
    'Template composition + shared-vs-local verdict. DERIVED from ia.json — do not hand-edit; run node design-repo/schema/sync.mjs',
  meta: { derivedFrom: 'ia.json', sharedSections: shared.length, pageLocalSections: local.length },
  shared: Object.fromEntries(shared.sort((a, b) => b[1].length - a[1].length)),
  pageLocal: Object.fromEntries(local),
  templates: Object.fromEntries(
    ia.templates.map((t) => [
      t.id,
      {
        name: t.name,
        routes: t.routes,
        routePattern: t.routePattern,
        sectionCount: t.sections.length,
        sections: t.sections,
      },
    ])
  ),
}

writeFileSync(join(ROOT, 'design-repo/sections/sections.json'), JSON.stringify(sections, null, 2) + '\n')
writeFileSync(join(ROOT, 'design-repo/templates/templates.json'), JSON.stringify(templates, null, 2) + '\n')
console.log(`synced: ${Object.keys(sections.sections).length} sections, ${Object.keys(templates.templates).length} templates from ia.json`)
