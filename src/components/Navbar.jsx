import { Link, useLocation } from 'react-router-dom'
import Arrow from './Arrow'

// The original splits the nav into a left group (Product / Company / Blog,
// 16px padding each, 4px apart) and a right group (Login as a bordered pill,
// Contact as a paper-3 pill), with 16px between the two groups.
// Product and Company carry a trailing chevron caret; the item matching the
// current route gets a solid rgb(24,49,52) pill behind it.
const PRIMARY = [
  { label: 'Product', to: '/product/unified-planning', caret: true, match: '/product' },
  { label: 'Company', to: '/about', caret: true, match: '/about' },
  { label: 'Blog', to: '/blog', caret: false, match: '/blog' },
]

function Caret() {
  return (
    <svg
      className="ml-1 h-[6px] w-[10px] shrink-0"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.25 5 4.75 9 1.25"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[88px] bg-ink text-cream">
      <div className="shell flex h-full items-center justify-between">
        <Link
          to="/"
          className="font-display text-[19px] font-medium leading-5 tracking-[-0.3px] text-cream"
        >
          Orchestra
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-1">
            {PRIMARY.map(({ label, to, caret, match }) => {
              const active = pathname.startsWith(match)
              return (
                <Link
                  key={label}
                  to={to}
                  className={`flex h-9 items-center rounded-full px-4 font-display text-label font-medium transition-colors duration-150 hover:text-cream ${
                    active ? 'bg-[#183134] text-cream' : 'text-mint-soft'
                  }`}
                >
                  {label}
                  {caret ? <Caret /> : null}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://app.orchestra.bio/"
              className="flex h-8 items-center rounded-full px-3 font-display text-label font-medium text-mint-soft transition-colors duration-150 hover:text-cream"
            >
              Login
            </a>
            <Link
              to="/contact"
              className="flex h-8 items-center gap-1 rounded-full bg-paper-3 pl-[14px] pr-3 font-display text-label font-medium text-ink transition-colors duration-150 hover:bg-cream"
            >
              Contact
              <Arrow />
            </Link>
          </div>
        </div>

        <Link
          to="/contact"
          className="flex h-8 items-center gap-1 rounded-full bg-paper-3 pl-[14px] pr-3 font-display text-label font-medium text-ink transition-colors duration-150 hover:bg-cream md:hidden"
        >
          Contact
          <Arrow />
        </Link>
      </div>
    </header>
  )
}
