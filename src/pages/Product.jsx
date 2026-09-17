import { Link, Navigate, useParams } from 'react-router-dom'
import Arrow from '../components/Arrow.jsx'
import { PRODUCTS } from '../content/products.js'

export default function Product() {
  const { slug } = useParams()
  const product = PRODUCTS[slug]

  if (!product) return <Navigate to="/404" replace />

  return (
    <>
      <section className="bg-ink pb-12 pt-[136px] md:pb-[88px]">
        <div className="shell">
          <p className="eyebrow-tight text-mint-soft">{product.eyebrow}</p>

          <h1 className="mt-[24px] max-w-[880px] font-display text-display-lg font-medium text-cream">
            {product.title}
          </h1>

          <p className="mt-[24px] max-w-[700px] font-body text-body-md text-mint-pale">
            {product.subhead}
          </p>

          <Link to="/contact" className="btn-light mt-[36px]">
            Book a demo
            <Arrow />
          </Link>
        </div>
      </section>

      {product.features.map((feature, i) => (
        <section key={feature.heading} className="bg-paper">
          <div className="shell grid items-center gap-10 py-16 md:min-h-[658px] md:grid-cols-2 md:gap-16 md:py-0">
            <div className="max-w-[544px]">
              <span className="inline-flex h-7 items-center rounded-full bg-ink px-3 font-mono text-[13px] font-medium leading-[22px] text-paper">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h2 className="mt-[32px] font-display text-display-md font-medium text-ink">
                {feature.heading}
              </h2>

              <p className="mt-[24px] max-w-[544px] font-body text-body-md text-ink-3">
                {feature.copy}
              </p>
            </div>

            <div className="md:justify-self-end">
              <img
                src={feature.image}
                alt=""
                className="w-full rounded-2xl object-cover md:h-[658px] md:w-[704px] md:rounded-none"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
