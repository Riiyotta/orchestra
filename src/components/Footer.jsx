import { Link } from 'react-router-dom'
import CTA from './CTA'

const COLUMNS = [
  {
    heading: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: 'https://jobs.ashbyhq.com/orchestra-bio' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  {
    heading: 'Product',
    links: [
      { label: 'Unified planning', href: '/product/unified-planning' },
      { label: 'Intelligent operations', href: '/product/intelligent-operations' },
      { label: 'Decision support', href: '/product/decision-support' },
    ],
  },
]

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/orchestra-bio' },
  { label: 'X', href: 'https://x.com/orchestrabio' },
  { label: 'GitHub', href: 'https://github.com/orchestra-bio' },
]

export default function Footer() {
  return (
    /* The footer is a dark flex column: the CTA block, a 24px gap, then the
       link/copyright block. It owns the ink background for both. */
    <footer id="company" className="flex flex-col gap-6 bg-ink">
      <CTA />

      <div className="flex flex-col gap-20 py-10">
        {/* Column row: a 274px identity column, then a 822px wrapper holding
            two equal 411px columns that each carry a 24px left inset. */}
        <div className="shell flex flex-col gap-12 md:flex-row md:gap-x-[120px]">
          <div className="flex w-full flex-col gap-4 md:w-[274px] md:shrink-0">
            <Link
              to="/"
              className="font-display text-[19px] font-medium leading-[18px] text-cream"
            >
              Orchestra
            </Link>
            <p className="font-body text-body-xs text-muted">
              Our mission is to reduce the operational complexity of drug development.
            </p>
            <a
              href="mailto:hello@orchestra.bio"
              className="mt-[67px] flex h-[22px] items-center gap-3 transition-opacity duration-150 hover:opacity-60"
            >
              <svg
                className="h-4 w-4 shrink-0"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="0.6"
                  y="2.6"
                  width="14.8"
                  height="10.8"
                  rx="1.4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M1 3.5l7 5 7-5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="eyebrow-tight text-paper-2">hello@orchestra.bio</span>
            </a>
          </div>

          {/* 822px wrapper = two 411px columns. Letting this flex to fill the
              leftover space instead pushes the third column 24px right. */}
          <div className="flex w-full flex-col gap-12 md:w-[822px] md:shrink-0 md:flex-row md:gap-0">
            {COLUMNS.map(({ heading, links }) => (
              <div key={heading} className="flex w-full flex-col gap-6 md:w-[411px] md:pl-6">
                <p className="eyebrow-tight text-mint-soft">{heading}</p>
                {/* Rows are h22 on a 38px pitch: line-height 22, 16px gap.
                    A default 24px line-height would make it 40. */}
                <ul className="flex flex-col gap-4">
                  {links.map(({ label, href }) => (
                    <li key={label} className="h-[22px] leading-[22px]">
                      {href.startsWith('http') ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block h-[22px] font-body text-body-xs leading-[22px] text-paper-2 transition-opacity duration-150 hover:opacity-60"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          to={href}
                          className="block h-[22px] font-body text-body-xs leading-[22px] text-paper-2 transition-opacity duration-150 hover:opacity-60"
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow text-muted">
            © 2025 Orchestra Bio Inc. All rights reserved
          </p>
          <div className="flex items-center gap-8">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="block h-[18px] w-[18px] text-paper-2 transition-opacity duration-150 hover:opacity-60"
              >
                <svg viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                  <rect width="18" height="18" rx="3" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
