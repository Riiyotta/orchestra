#!/usr/bin/env node
/*
 * Validates a PageSpec instance against:
 *   1. schema/pagespec.schema.json (a hand-rolled draft-07 subset validator —
 *      no external dependency, so this script also runs correctly in a
 *      self-contained copy of design-repo/ with no node_modules present).
 *   2. sections/content-contracts.json — per-section required fields,
 *      maxWords/maxItems/enum budgets, since draft-07's additionalProperties:false
 *      on a shared base schema cannot see 24 independent per-section property
 *      sets without an unwieldy duplicated oneOf (see pagespec.schema.json's
 *      own comment on this).
 *   3. templates/templates.json — the declared `basedOnTemplate` must match
 *      the PageSpec's own nodes[] sequence, node-for-node. This is the single
 *      most-repeated bug class across prior design-repo builds: a validator
 *      that only checks nodes[] in isolation and never cross-references the
 *      declared template.
 *   4. compatibility/graph.json — every rule listed there, respecting severity
 *      ("error" fails the run, "warn" is reported but does not fail it).
 *   5. assets/asset-roles.json — every assetRole reference is a real, closed role.
 *
 * Usage:
 *   node design-repo/schema/semantic_validate.mjs [path/to/pagespec.json]
 *   (defaults to schema/example.pagespec.json)
 *
 * Path portability: ROOT is derived from import.meta.url, never hardcoded.
 * Exits 0 with zero errors, 1 otherwise. Designed to be importable too —
 * see schema/tests/adversarial_test.mjs, which calls `validate()` directly.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve, join } from 'node:path'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const readJSON = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))

/* ---------- 1. Minimal draft-07 subset validator ---------- */
/* Supports exactly the keywords pagespec.schema.json actually uses. Not a
   general-purpose JSON Schema implementation — scoped intentionally so it
   has no external dependency and stays auditable. */
function validateAgainstSchema(instance, schema, path, defs, errors) {
  if (schema.$ref) {
    const key = schema.$ref.split('/').pop()
    return validateAgainstSchema(instance, defs[key], path, defs, errors)
  }
  if (schema.const !== undefined) {
    if (instance !== schema.const) errors.push(`${path}: expected const ${JSON.stringify(schema.const)}, got ${JSON.stringify(instance)}`)
    return
  }
  if (schema.enum) {
    if (!schema.enum.includes(instance)) errors.push(`${path}: "${instance}" is not one of the allowed enum values [${schema.enum.join(', ')}]`)
    return
  }
  if (schema.type === 'object' || schema.properties) {
    if (typeof instance !== 'object' || instance === null || Array.isArray(instance)) {
      errors.push(`${path}: expected object, got ${JSON.stringify(instance)}`)
      return
    }
    for (const req of schema.required || []) {
      if (!(req in instance)) errors.push(`${path}: missing required field "${req}"`)
    }
    if (schema.additionalProperties === false) {
      const allowed = new Set(Object.keys(schema.properties || {}))
      for (const k of Object.keys(instance)) {
        if (!allowed.has(k)) errors.push(`${path}: additional property "${k}" is not permitted`)
      }
    }
    for (const [k, v] of Object.entries(schema.properties || {})) {
      if (k in instance) validateAgainstSchema(instance[k], v, `${path}.${k}`, defs, errors)
    }
    return
  }
  if (schema.type === 'array') {
    if (!Array.isArray(instance)) { errors.push(`${path}: expected array, got ${JSON.stringify(instance)}`); return }
    if (schema.minItems !== undefined && instance.length < schema.minItems) errors.push(`${path}: expected at least ${schema.minItems} items, got ${instance.length}`)
    if (schema.items) instance.forEach((item, i) => validateAgainstSchema(item, schema.items, `${path}[${i}]`, defs, errors))
    return
  }
  if (schema.type === 'string') {
    if (typeof instance !== 'string') { errors.push(`${path}: expected string, got ${JSON.stringify(instance)}`); return }
    if (schema.minLength !== undefined && instance.length < schema.minLength) errors.push(`${path}: shorter than minLength ${schema.minLength}`)
    if (schema.pattern && !new RegExp(schema.pattern).test(instance)) errors.push(`${path}: "${instance}" does not match pattern ${schema.pattern}`)
    return
  }
  if (schema.type === 'boolean') {
    if (typeof instance !== 'boolean') errors.push(`${path}: expected boolean, got ${JSON.stringify(instance)}`)
    return
  }
  if (schema.type === 'integer') {
    if (!Number.isInteger(instance)) { errors.push(`${path}: expected integer, got ${JSON.stringify(instance)}`); return }
    if (schema.minimum !== undefined && instance < schema.minimum) errors.push(`${path}: ${instance} is below minimum ${schema.minimum}`)
    return
  }
}

function validateSchema(pageSpec, schema) {
  const errors = []
  validateAgainstSchema(pageSpec, { ...schema, properties: schema.properties, required: schema.required, additionalProperties: schema.additionalProperties, type: 'object' }, '$', schema.definitions, errors)
  return errors
}

/* ---------- word counting (shared with adversarial tests) ---------- */
export function wordCount(str) {
  return String(str).trim().split(/\s+/).filter(Boolean).length
}

/* ---------- 2-5. Semantic checks ---------- */
export function validate(pageSpec) {
  const errors = []
  const warnings = []

  const schema = readJSON('schema/pagespec.schema.json')
  errors.push(...validateSchema(pageSpec, schema))
  if (errors.length) return { errors, warnings } // structural failure — no point semantic-checking garbage

  const templates = readJSON('templates/templates.json')
  const contracts = readJSON('sections/content-contracts.json').contracts
  const graph = readJSON('compatibility/graph.json')
  const assetRoles = Object.keys(readJSON('assets/asset-roles.json').roles)

  /* --- TEMPLATE_NODE_SEQUENCE_MATCH: cross-reference declared template against its REAL node list --- */
  const template = templates.templates[pageSpec.basedOnTemplate]
  if (!template) {
    errors.push(`basedOnTemplate "${pageSpec.basedOnTemplate}" does not exist in templates/templates.json`)
  } else {
    // Collapse consecutive runs of the same repeatable section into one entry
    // before comparing — templates/templates.json lists a repeatable section
    // (e.g. narrative.product-feature) ONCE per its real node-sequence shape,
    // while an expanded PageSpec instance legitimately repeats it N times in
    // direct sequence (exactCountPerPage in sections/content-contracts.json).
    const collapse = (ids) => {
      const out = []
      for (const id of ids) {
        if (out.length && out[out.length - 1] === id && contracts[id]?.repeatable) continue
        out.push(id)
      }
      return out
    }
    const declaredSeq = collapse(pageSpec.nodes.map((n) => n.section))
    const realSeq = template.sections
    if (JSON.stringify(declaredSeq) !== JSON.stringify(realSeq)) {
      errors.push(
        `TEMPLATE_NODE_SEQUENCE_MATCH: nodes[] section sequence [${declaredSeq.join(', ')}] does not match ` +
        `basedOnTemplate "${pageSpec.basedOnTemplate}"'s real sequence in templates/templates.json: [${realSeq.join(', ')}]`
      )
    }
  }

  /* --- per-node checks: allowlist membership, content contract, motion, assetRole --- */
  const seenSections = []
  for (const [i, node] of pageSpec.nodes.entries()) {
    const contract = contracts[node.section]
    if (!contract) { errors.push(`nodes[${i}].section "${node.section}" has no entry in sections/content-contracts.json`); continue }

    /* NO_CONSECUTIVE_SAME_SECTION, keyed on (section, index) per STRUCTURAL_KEY_INCLUDES_VARIANT */
    const prev = seenSections[seenSections.length - 1]
    if (prev && prev.section === node.section && prev.index === node.index) {
      errors.push(`nodes[${i}]: "${node.section}" (index ${node.index}) is an exact duplicate of the immediately preceding node`)
    }
    seenSections.push({ section: node.section, index: node.index })

    /* content contract: required fields + maxWords + enum + maxItems/minItems on this node's content */
    checkContent(node.content, contract.content || {}, `nodes[${i}].content`, errors)

    /* motion: allowed patterns must be a subset of this section's own allowed list */
    const allowedForSection = contract.motion?.allowed ?? []
    for (const m of node.motion.allowed) {
      if (!allowedForSection.includes(m)) {
        errors.push(`nodes[${i}] ("${node.section}"): motion pattern "${m}" is not in this section's allowed set [${allowedForSection.join(', ') || 'none'}] per sections/content-contracts.json`)
      }
    }
    if (!node.motion.reducedMotionFallback || !node.motion.reducedMotionFallback.trim()) {
      errors.push(`nodes[${i}] ("${node.section}"): motion.reducedMotionFallback is required and must be non-empty`)
    }

    /* assetRole closure: recursively find any {assetRole: "..."} and check it's real */
    for (const found of findAssetRoles(node.content)) {
      if (!assetRoles.includes(found)) errors.push(`nodes[${i}] ("${node.section}"): assetRole "${found}" is not one of assets/asset-roles.json's closed roles`)
    }
  }

  /* --- exactCountPerPage rules (PRODUCT_FEATURE_EXACT_COUNT, RELATED_POSTS_EXACT_COUNT) --- */
  for (const [sectionId, contract] of Object.entries(contracts)) {
    if (contract.exactCountPerPage) {
      const count = pageSpec.nodes.filter((n) => n.section === sectionId).length
      if (count > 0 && count !== contract.exactCountPerPage) {
        errors.push(`section "${sectionId}" appears ${count} time(s); sections/content-contracts.json requires exactly ${contract.exactCountPerPage}`)
      }
      if (sectionId === 'narrative.product-feature' && count === 3) {
        const indices = pageSpec.nodes.filter((n) => n.section === sectionId).map((n) => n.index).sort()
        if (JSON.stringify(indices) !== JSON.stringify([1, 2, 3])) {
          errors.push(`section "${sectionId}": expected indices [1,2,3] exactly once each, got [${indices.join(',')}]`)
        }
      }
    }
  }

  /* --- graph.json rules not already covered above --- */
  const nodeIds = pageSpec.nodes.map((n) => n.section)
  if (nodeIds[0] !== 'chrome.navbar') report(graph, 'SHELL_MUST_WRAP_PAGE', 'nodes[0] must be chrome.navbar', errors, warnings)
  if (nodeIds[nodeIds.length - 1] !== 'chrome.footer') report(graph, 'SHELL_MUST_WRAP_PAGE', 'nodes[last] must be chrome.footer', errors, warnings)
  const heroCount = nodeIds.filter((id) => contracts[id]?.category === 'HERO').length
  if (heroCount !== 1) report(graph, 'ONE_HERO_PER_PAGE', `expected exactly 1 HERO-category node, found ${heroCount}`, errors, warnings)
  const ctaIdx = nodeIds.indexOf('conversion.cta-band')
  const footerIdx = nodeIds.indexOf('chrome.footer')
  if (ctaIdx !== -1 && footerIdx !== -1 && footerIdx - ctaIdx !== 1) {
    report(graph, 'CTA_BAND_IMMEDIATELY_PRECEDES_FOOTER', 'conversion.cta-band must be the node immediately before chrome.footer', errors, warnings)
  }
  const timelineIdx = nodeIds.indexOf('showcase.hero-timeline')
  const homeHeroIdx = nodeIds.indexOf('hero.home')
  if (timelineIdx !== -1 && timelineIdx - homeHeroIdx !== 1) {
    report(graph, 'SHOWCASE_TIMELINE_FOLLOWS_HOME_HERO', 'showcase.hero-timeline must immediately follow hero.home', errors, warnings)
  }

  return { errors, warnings }
}

function report(graph, ruleId, message, errors, warnings) {
  const rule = graph.rules.find((r) => r.id === ruleId)
  const sev = rule?.severity ?? 'error'
  ;(sev === 'error' ? errors : warnings).push(`${ruleId}: ${message}`)
}

function findAssetRoles(node, acc = []) {
  if (node && typeof node === 'object') {
    if (typeof node.assetRole === 'string') acc.push(node.assetRole)
    for (const v of Object.values(node)) findAssetRoles(v, acc)
  }
  return acc
}

function checkContent(content, contractFields, path, errors) {
  for (const [field, spec] of Object.entries(contractFields)) {
    if (field === '$comment') continue
    const val = content?.[field]
    if (spec.required && (val === undefined || val === null)) {
      errors.push(`${path}.${field} is required by sections/content-contracts.json but missing`)
      continue
    }
    if (val === undefined || val === null) continue
    checkField(val, spec, `${path}.${field}`, errors)
  }
}

function checkField(val, spec, path, errors) {
  if (spec.type === 'string' && typeof val === 'string') {
    if (spec.maxWords !== undefined) {
      const wc = wordCount(val)
      if (wc > spec.maxWords) errors.push(`${path}: ${wc} words exceeds maxWords budget of ${spec.maxWords} ("${val.slice(0, 40)}...")`)
    }
    if (spec.enum && !spec.enum.includes(val)) errors.push(`${path}: "${val}" is not one of the allowed values [${spec.enum.join(', ')}]`)
    if (spec.pattern && !new RegExp(spec.pattern).test(val)) errors.push(`${path}: "${val}" does not match required pattern ${spec.pattern}`)
  }
  if (spec.type === 'array' && Array.isArray(val)) {
    if (spec.minItems !== undefined && val.length < spec.minItems) errors.push(`${path}: has ${val.length} item(s), needs at least ${spec.minItems}`)
    if (spec.maxItems !== undefined && val.length > spec.maxItems) errors.push(`${path}: has ${val.length} item(s), exceeds maxItems of ${spec.maxItems}`)
    if (spec.items && !spec.items.oneOf) {
      val.forEach((item, i) => {
        for (const [k, itemSpec] of Object.entries(spec.items.properties || {})) {
          if (item?.[k] !== undefined) checkField(item[k], itemSpec, `${path}[${i}].${k}`, errors)
        }
      })
    }
  }
  if (spec.type === 'integer' && typeof val === 'number') {
    if (spec.minimum !== undefined && val < spec.minimum) errors.push(`${path}: ${val} is below minimum ${spec.minimum}`)
    if (spec.maximum !== undefined && val > spec.maximum) errors.push(`${path}: ${val} exceeds maximum ${spec.maximum}`)
  }
  if (spec.type === 'object' && spec.properties && typeof val === 'object' && val !== null && !Array.isArray(val)) {
    for (const [k, subSpec] of Object.entries(spec.properties)) {
      if (val[k] !== undefined && val[k] !== null) checkField(val[k], subSpec, `${path}.${k}`, errors)
    }
  }
}

/* ---------- CLI entry point ---------- */
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const target = process.argv[2] ? resolve(process.cwd(), process.argv[2]) : join(ROOT, 'schema/example.pagespec.json')
  const pageSpec = JSON.parse(readFileSync(target, 'utf8'))
  const { errors, warnings } = validate(pageSpec)
  console.log(`\nsemantic_validate: ${target}`)
  for (const w of warnings) console.log(`  \x1b[33mWARN\x1b[0m  ${w}`)
  for (const e of errors) console.log(`  \x1b[31mERROR\x1b[0m ${e}`)
  console.log(errors.length ? `\n\x1b[31mFAILED — ${errors.length} error(s), ${warnings.length} warning(s)\x1b[0m\n` : `\n\x1b[32mPASS\x1b[0m${warnings.length ? ` — ${warnings.length} warning(s)` : ''}\n`)
  process.exit(errors.length ? 1 : 0)
}
