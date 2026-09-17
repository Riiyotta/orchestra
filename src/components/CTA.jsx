import { Link } from 'react-router-dom'
import Arrow from './Arrow'

/*
 * On the original this block is the first child of <footer>, not a section in
 * <main>: it sits on the footer's ink background with a full-bleed photo layer
 * behind it, and its type is light-on-dark (cream H2, mint-pale subhead,
 * mint-soft eyebrow) — the inverse of what a standalone light band would use.
 */
export default function CTA() {
  return (
    <div className="relative overflow-hidden md:h-[521.47px]">
      <img
        src="https://framerusercontent.com/images/10Gn2eLO0jG5LzUukp4c2AXeg.png?width=1512&height=616"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      <div className="shell relative py-16 text-center md:py-0 md:pt-[94.94px]">
        <p className="eyebrow-tight text-mint-soft">Get started Today</p>

        <h2 className="mx-auto mt-[32px] max-w-[700px] font-display display-hero font-medium text-cream">
          Make every R&amp;D dollar count.
        </h2>

        <p className="mx-auto mt-[20px] max-w-[700px] font-body text-body-md text-mint-pale">
          Automate operations and reduce the risks that derail breakthrough science
        </p>

        <div className="mt-[32px] flex justify-center">
          <Link to="/contact" className="btn-mint">
            Book a demo
            <Arrow />
          </Link>
        </div>
      </div>
    </div>
  )
}
