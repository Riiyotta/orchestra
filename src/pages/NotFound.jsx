import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink py-[136px]">
      <div className="shell">
        <p className="eyebrow-tight text-mint-soft">404</p>
        <h1 className="mt-[24px] max-w-[700px] font-display text-display-lg font-medium text-cream">
          We couldn’t find that page.
        </h1>
        <Link to="/" className="btn-light mt-[36px]">
          Back to home
        </Link>
      </div>
    </section>
  )
}
