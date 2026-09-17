import { Link } from 'react-router-dom'
import Arrow from '../components/Arrow.jsx'
import { POSTS } from '../content/posts.js'

export default function BlogIndex() {
  const featured = POSTS.find((post) => post.featured) ?? POSTS[0]
  const rest = POSTS.filter((post) => post !== featured)

  return (
    <>
      <section className="bg-ink pb-16 pt-[136px] md:pb-[80px]">
        <div className="shell">
          <p className="eyebrow-tight text-mint-soft">Featured update</p>

          <Link
            to={`/blog/${featured.slug}`}
            className="group mt-[24px] grid gap-8 md:grid-cols-2 md:gap-16"
          >
            <div className="overflow-hidden rounded-2xl bg-ink-2">
              <img
                src={featured.image}
                alt=""
                className="h-[322px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="font-display text-[32px] font-medium leading-[38px] tracking-[-0.64px] text-white">
                {featured.title}
              </h1>
              {featured.excerpt && (
                <p className="mt-6 max-w-[460px] font-body text-body-sm text-white/90">
                  {featured.excerpt}
                </p>
              )}
              <span className="mt-8 inline-flex w-fit items-center gap-2 font-display text-body-sm text-white">
                Learn more
                <Arrow />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-[80px]">
        <div className="shell">
          <p className="eyebrow-tight text-muted">All posts</p>

          <div className="mt-[40px] grid gap-8 md:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col items-start"
              >
                <div className="w-full overflow-hidden rounded-xl bg-paper-2">
                  <img
                    src={post.image}
                    alt=""
                    className="h-[243px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="w-full px-2 py-5">
                  <h2 className="font-body text-body-lg text-ink transition-colors duration-150 group-hover:text-sage-deep">
                    {post.title}
                  </h2>
                  <span className="mt-4 inline-flex items-center gap-2 font-display text-label text-ink-3">
                    Learn more
                    <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
