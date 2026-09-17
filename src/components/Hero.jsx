import { Link } from 'react-router-dom'
import Arrow from './Arrow'

export default function Hero() {
  return (
    <section className="relative bg-ink pb-16 pt-[136px] md:pb-[88px] text-center">
      <div className="shell">
        {/* Original measure is 700px, not 760 — the H1 and the subhead share
            the same column (x290..990 at a 1280 viewport). */}
        <h1 className="mx-auto max-w-[700px] font-display display-hero font-medium text-cream">
          Manage the<br className="hidden md:inline" />{' '}
          <span className="text-paper-3">business of science.</span>
        </h1>

        <p className="mx-auto mt-[20px] max-w-[700px] font-body text-body-md text-mint-pale">
          Orchestra is the agentic operations platform for drug development
        </p>

        <div className="mt-[32px] flex justify-center">
          <Link to="/contact" className="btn-light">
            Book a demo
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
