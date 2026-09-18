#!/usr/bin/env node
/*
 * Adversarial test suite for the Orchestra PageSpec system.
 *
 * Structure: one CONTROL PageSpec per real template (7), each asserted to
 * validate with ZERO errors — then 20+ MUTATIONS, each derived from a control
 * by breaking exactly one rule, each asserted to be REJECTED. A validator
 * that rejects everything is as broken as one that rejects nothing, so both
 * directions are checked every run.
 *
 * Run: node design-repo/schema/tests/adversarial_test.mjs
 * Path portability: imports semantic_validate.mjs by relative path, which
 * itself derives its ROOT from import.meta.url — no hardcoded absolute path
 * anywhere in this file, so it also runs correctly from an isolated copy of
 * design-repo/ with no siblings present (see extraction/verify_all.mjs).
 */
import { validate } from '../semantic_validate.mjs'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const readJSON = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const clone = (o) => JSON.parse(JSON.stringify(o))

const node = (section, content, opts = {}) => ({
  section,
  required: opts.required ?? true,
  repeatable: opts.repeatable ?? false,
  ...(opts.index !== undefined ? { index: opts.index } : {}),
  content,
  motion: opts.motion ?? { allowed: [], reducedMotionFallback: 'n/a — no motion measured' }
})

const CHROME_NAVBAR = node('chrome.navbar', {})
const CHROME_FOOTER = node('chrome.footer', {})
const CTA_BAND = node('conversion.cta-band', {
  eyebrow: 'Get started today',
  headline: 'Get started today',
  subhead: 'See how Orchestra brings your programs into one system.',
  cta: { label: 'Book a demo', target: '/contact' },
  backgroundImage: { assetRole: 'photo.background', src: 'https://framerusercontent.com/images/E6Gw45Xk2VqeMVk6aTxadLhT7t4.png' }
}, { motion: { allowed: ['reveal'], reducedMotionFallback: 'fully visible, no transition' } })

function buildPageSpec(basedOnTemplate, middleNodes, route) {
  return {
    repositoryId: 'orchestra-design-repo',
    pageSpecVersion: '1.0.0',
    basedOnTemplate,
    route,
    theme: 'light',
    nodes: [CHROME_NAVBAR, ...middleNodes, CTA_BAND, CHROME_FOOTER]
  }
}

const CONTROLS = {
  'template.home': buildPageSpec('template.home', [
    node('hero.home', { headline: 'Run every program from one system', subhead: 'Plan, track, and adapt without leaving Orchestra.', cta: { label: 'Book a demo', target: '/contact' } }, { motion: { allowed: ['reveal'], reducedMotionFallback: 'fully visible, no transition' } }),
    node('showcase.hero-timeline', { statusChips: [{ label: 'Live' }, { label: 'Draft' }] }, { motion: { allowed: ['marquee'], reducedMotionFallback: 'animation: none' } }),
    node('showcase.product-frame', { screenshot: { assetRole: 'product.screenshot', src: 'https://framerusercontent.com/images/x.png' }, video: { assetRole: 'product.demo-video', src: 'https://framerusercontent.com/videos/x.mp4' } }, { motion: { allowed: ['viewportGatedPlayback'], reducedMotionFallback: 'video does not autoplay; poster frame shown' } }),
    node('narrative.pillar-accordion', { heading: 'Two ways to plan', tabs: [{ label: 'Ops', body: 'Track execution against plan.', screenshot: { assetRole: 'product.screenshot', src: 'https://x.png' } }, { label: 'Finance', body: 'Model budgets and runway.', screenshot: { assetRole: 'product.screenshot', src: 'https://x.png' } }] }, { motion: { allowed: ['autoAdvanceCrossfade'], reducedMotionFallback: 'first tab shown statically, no auto-advance' } }),
    node('showcase.system-video', { heading: 'One management system', video: { assetRole: 'product.demo-video', src: 'https://x.mp4' } }, { motion: { allowed: ['loop'], reducedMotionFallback: 'video loops without pause control; poster frame if suppressed' } }),
    node('collection.home-updates', { heading: 'Latest updates', posts: [{ cover: { assetRole: 'blog.cover-narrow', src: 'https://x.png' }, title: 'Agents for R&D: Science' }, { cover: { assetRole: 'blog.cover-narrow', src: 'https://x.png' }, title: 'How biotechs can manage CROs with agents' }, { cover: { assetRole: 'blog.cover-narrow', src: 'https://x.png' }, title: 'From paper to cloud to agents' }] })
  ], '/'),
  'template.product-detail': buildPageSpec('template.product-detail', [
    node('hero.product', { eyebrow: 'Unified planning', title: 'Align your organization from bench to boardroom', subhead: 'Connect scientific goals, financial models, and execution in one system.', cta: { label: 'Book a demo', target: '/contact' } }),
    node('narrative.product-feature', { index: 1, heading: 'Prepare for board meetings in days', copy: 'Create dashboards in minutes.', image: { assetRole: 'product.screenshot', src: 'https://x.png' } }, { repeatable: true, index: 1 }),
    node('narrative.product-feature', { index: 2, heading: 'Forecast spend confidently', copy: 'Analyze estimated vs actual spend.', image: { assetRole: 'product.screenshot', src: 'https://x.png' } }, { repeatable: true, index: 2 }),
    node('narrative.product-feature', { index: 3, heading: 'Translate strategy into roadmaps', copy: 'Align around a plan of record.', image: { assetRole: 'product.screenshot', src: 'https://x.png' } }, { repeatable: true, index: 3 })
  ], '/product/unified-planning'),
  'template.about': buildPageSpec('template.about', [
    node('hero.about', { eyebrow: 'About', missionStatement: 'We build the operating system for biotech.' }),
    node('narrative.approach', { heading: 'Our approach', body: 'We start with real workflows, not abstractions.' }),
    node('narrative.intelligence-arc', { leadIn: 'Programs move through three stages.', stages: [{ index: 1, label: 'Capture' }, { index: 2, label: 'Interpret' }, { index: 3, label: 'Act' }] }),
    node('narrative.team', { members: [{ portrait: { assetRole: 'team.photo', src: 'https://x.png' }, name: 'Jane Doe', role: 'CEO', linkedinUrl: 'https://linkedin.com/in/jane' }], groupPhoto: { assetRole: 'team.photo', src: 'https://x.png' } }),
    node('conversion.hiring', { heading: "We're hiring!", paragraphs: ['We are growing the team.', 'Come build with us.'], cta: { label: 'View roles', target: 'https://jobs.ashbyhq.com/orchestra' } })
  ], '/about'),
  'template.contact': buildPageSpec('template.contact', [
    node('hero.contact', { heading: 'Get in Touch', intro: 'Tell us about your team and what you want to improve.', image: { assetRole: 'photo.editorial', src: 'https://x.png' } }),
    node('conversion.contact-form', { fields: [{ name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', required: false }, { name: 'phone', label: 'Phone Number', required: false }, { name: 'notes', label: 'Notes', required: false }], submitLabel: 'Submit' })
  ], '/contact'),
  'template.blog-index': buildPageSpec('template.blog-index', [
    node('hero.blog-featured', { title: 'How biotechs can manage CROs with agents', excerpt: 'For two decades, biopharma software organized what scientists already knew.', cover: { assetRole: 'blog.cover', src: 'https://x.png' }, linkLabel: 'Learn more' }),
    node('collection.post-grid', { posts: [{ cover: { assetRole: 'blog.cover', src: 'https://x.png' }, title: 'Agents for R&D: Science', linkLabel: 'Learn more' }] })
  ], '/blog'),
  'template.blog-post': buildPageSpec('template.blog-post', [
    node('hero.post', { readTime: '5 min read', title: 'How biotechs can manage CROs with agents', excerpt: 'For two decades, biopharma software organized what scientists already knew.', cover: { assetRole: 'blog.cover', src: 'https://x.png' } }),
    node('narrative.article-body', { blocks: [] }),
    node('collection.related-posts', { relatedPosts: [{ cover: { assetRole: 'blog.cover', src: 'https://x.png' }, title: 'Agents for R&D: Science' }, { cover: { assetRole: 'blog.cover', src: 'https://x.png' }, title: 'Agents for R&D: Strategy' }] }, { motion: { allowed: ['imageHover'], reducedMotionFallback: 'no hover scale transform' } })
  ], '/blog/how-biotechs-can-manage-cros-with-agents'),
  'template.not-found': buildPageSpec('template.not-found', [
    node('hero.not-found', { eyebrow: '404', headline: 'Page not found', linkLabel: 'Back to home' })
  ], '*')
}

let pass = 0
let fail = 0
const failures = []

function assertValid(label, spec) {
  const { errors } = validate(spec)
  if (errors.length === 0) { pass++ }
  else { fail++; failures.push(`CONTROL "${label}" should pass but got ${errors.length} error(s): ${errors[0]}`) }
}

function assertRejected(label, spec) {
  const { errors } = validate(spec)
  if (errors.length > 0) { pass++ }
  else { fail++; failures.push(`MUTATION "${label}" should be REJECTED but validated with zero errors`) }
}

/* ============ CONTROLS: every real template must validate clean ============ */
for (const [id, spec] of Object.entries(CONTROLS)) assertValid(`control:${id}`, spec)

/* ============ MUTATIONS ============ */

/* -- Schema-layer -- */
assertRejected('wrong-enum-value-for-basedOnTemplate', (() => { const s = clone(CONTROLS['template.home']); s.basedOnTemplate = 'template.nonexistent'; return s })())
assertRejected('missing-required-top-level-field-route', (() => { const s = clone(CONTROLS['template.home']); delete s.route; return s })())
assertRejected('invented-section-id-not-in-allowlist', (() => { const s = clone(CONTROLS['template.contact']); s.nodes[1].section = 'conversion.newsletter-signup'; return s })())
assertRejected('missing-reducedMotionFallback', (() => { const s = clone(CONTROLS['template.home']); delete s.nodes[1].motion.reducedMotionFallback; return s })())
assertRejected('additional-property-at-node-level', (() => { const s = clone(CONTROLS['template.contact']); s.nodes[1].invented = true; return s })())
assertRejected('additional-property-at-top-level', (() => { const s = clone(CONTROLS['template.contact']); s.extraField = 'nope'; return s })())
assertRejected('wrong-type-for-required-boolean', (() => { const s = clone(CONTROLS['template.contact']); s.nodes[1].required = 'yes'; return s })())
assertRejected('theme-not-light', (() => { const s = clone(CONTROLS['template.home']); s.theme = 'dark'; return s })())
assertRejected('repositoryId-mismatch', (() => { const s = clone(CONTROLS['template.home']); s.repositoryId = 'some-other-repo'; return s })())

/* -- Structural -- */
assertRejected('duplicate-onePerPage-section-hero-appears-twice', (() => {
  const s = clone(CONTROLS['template.contact'])
  s.nodes.splice(1, 0, clone(s.nodes[1])) // duplicate hero.contact
  return s
})())
assertRejected('removed-mandatory-navbar', (() => { const s = clone(CONTROLS['template.contact']); s.nodes.shift(); return s })())
assertRejected('reordered-cta-band-not-immediately-before-footer', (() => {
  const s = clone(CONTROLS['template.contact'])
  const cta = s.nodes.splice(2, 1)[0]
  s.nodes.splice(1, 0, cta) // move CTA to right after navbar
  return s
})())
assertRejected('template-node-sequence-mismatch-extra-section', (() => {
  const s = clone(CONTROLS['template.contact'])
  s.nodes.splice(2, 0, clone(CONTROLS['template.about']).nodes[3]) // inject narrative.team into contact
  return s
})())
assertRejected('template-node-sequence-mismatch-wrong-order', (() => {
  const s = clone(CONTROLS['template.blog-post'])
  ;[s.nodes[1], s.nodes[2]] = [s.nodes[2], s.nodes[1]] // swap article-body and related-posts
  return s
})())
assertRejected('product-feature-wrong-count-only-2-of-3', (() => { const s = clone(CONTROLS['template.product-detail']); s.nodes.splice(3, 1); return s })())
assertRejected('product-feature-duplicate-index', (() => { const s = clone(CONTROLS['template.product-detail']); s.nodes[3].index = 1; return s })())
assertRejected('related-posts-wrong-count-only-1', (() => { const s = clone(CONTROLS['template.blog-post']); s.nodes[3].content.relatedPosts.pop(); return s })())
assertRejected('showcase-timeline-not-immediately-after-home-hero', (() => {
  const s = clone(CONTROLS['template.home'])
  const timeline = s.nodes.splice(2, 1)[0]
  s.nodes.splice(3, 0, timeline) // move it one slot later
  return s
})())
assertRejected('two-heroes-on-one-page', (() => {
  const s = clone(CONTROLS['template.contact'])
  s.nodes.splice(2, 0, clone(CONTROLS['template.about']).nodes[1]) // inject hero.about into contact
  return s
})())

/* -- Runtime / content-contract -- */
assertRejected('maxWords-overflow-cta-headline', (() => {
  const s = clone(CONTROLS['template.contact'])
  s.nodes[3].content.headline = 'This headline has deliberately far too many words in it to fit the twelve word budget allowed here'
  return s
})())
assertRejected('maxWords-overflow-product-feature-copy', (() => {
  const s = clone(CONTROLS['template.product-detail'])
  s.nodes[2].content.copy = Array(50).fill('word').join(' ')
  return s
})())
assertRejected('missing-required-content-field', (() => { const s = clone(CONTROLS['template.contact']); delete s.nodes[1].content.heading; return s })())
assertRejected('enum-violation-cta-label', (() => { const s = clone(CONTROLS['template.home']); s.nodes[1].content.cta.label = 'Get in touch now'; return s })())
assertRejected('related-posts-min-items-violated', (() => { const s = clone(CONTROLS['template.blog-post']); s.nodes[3].content.relatedPosts = [s.nodes[3].content.relatedPosts[0]]; return s })())
assertRejected('invalid-assetRole-not-in-closed-enum', (() => {
  const s = clone(CONTROLS['template.blog-post'])
  s.nodes[1].content.cover.assetRole = 'stock.generic-photo'
  return s
})())
assertRejected('motion-pattern-not-permitted-for-this-section', (() => {
  const s = clone(CONTROLS['template.contact'])
  s.nodes[1].motion.allowed = ['marquee'] // hero.contact has no allowed motion patterns
  return s
})())
assertRejected('invented-motion-pattern-not-in-closed-set', (() => {
  const s = clone(CONTROLS['template.home'])
  s.nodes[1].motion.allowed = ['parallax']
  return s
})())
assertRejected('read-time-pattern-violation', (() => { const s = clone(CONTROLS['template.blog-post']); s.nodes[1].content.readTime = 'five minutes'; return s })())

/* ============ Report ============ */
console.log(`\nadversarial_test: ${Object.keys(CONTROLS).length} controls, ${pass + fail - Object.keys(CONTROLS).length} mutations, ${pass + fail} total checks`)
for (const f of failures) console.log(`  \x1b[31mFAIL\x1b[0m  ${f}`)
console.log(fail ? `\n\x1b[31mFAILED — ${fail} check(s) did not behave as expected\x1b[0m\n` : `\n\x1b[32mPASS — all ${pass} checks behaved as expected\x1b[0m\n`)
process.exit(fail ? 1 : 0)
