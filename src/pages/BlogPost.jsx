import { Link, Navigate, useParams } from 'react-router-dom'
import Arrow from '../components/Arrow.jsx'
import { POSTS, getPost } from '../content/posts.js'

/* Renders a block from `post.body`. Supported: {type:'p'|'h2'|'quote'|'figure'}.
   Bodies ship empty — see src/content/posts.js. */
function Block({ block }) {
  if (block.type === 'h2') {
    return (
      <h2 className="mt-14 font-display text-[32px] font-medium leading-[38px] tracking-[-0.64px] text-ink">
        {block.text}
      </h2>
    )
  }

  if (block.type === 'quote') {
    return (
      <blockquote className="mt-10 border-l-2 border-sage pl-6 font-body text-body-lg italic text-ink">
        {block.text}
      </blockquote>
    )
  }

  if (block.type === 'figure') {
    return (
      <figure className="mt-12">
        <img src={block.src} alt={block.alt ?? ''} className="w-full rounded-xl" loading="lazy" />
        {block.caption && (
          <figcaption className="mt-3 font-body text-body-xs text-muted">
            {block.caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return <p className="mt-6 font-body text-body-sm text-ink-3">{block.text}</p>
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <Navigate to="/404" replace />

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <section className="bg-paper pt-[136px]">
        <div className="shell">
          <p className="text-center font-display text-label text-ink-3">5 min read</p>

          <h1 className="mx-auto mt-[24px] max-w-[880px] text-center font-display text-[40px] font-medium leading-[46px] tracking-[-0.8px] text-ink md:text-display-lg">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mx-auto mt-[32px] max-w-[520px] text-center font-body text-body-sm text-ink-3">
              {post.excerpt}
            </p>
          )}

          <img
            src={post.image}
            alt=""
            className="mt-[64px] h-[537px] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="bg-paper py-16 md:py-[88px]">
        <div className="mx-auto w-full max-w-[800px] px-5 md:px-0">
          {post.body.length > 0 ? (
            post.body.map((block, i) => <Block key={i} block={block} />)
          ) : (
            <p className="font-body text-body-sm text-muted">
              This article’s body has not been added yet. Add blocks to{' '}
              <code className="font-mono text-[13px]">body</code> in{' '}
              <code className="font-mono text-[13px]">src/content/posts.js</code>.
            </p>
          )}
        </div>
      </section>

      <section className="bg-paper pb-16 md:pb-[88px]">
        <div className="shell grid gap-8 md:grid-cols-2">
          {related.map((item) => (
            <Link key={item.slug} to={`/blog/${item.slug}`} className="group flex flex-col">
              <div className="overflow-hidden rounded-xl bg-paper-2">
                <img
                  src={item.image}
                  alt=""
                  className="h-[374px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <p className="mt-5 font-body text-body-lg text-ink">{item.title}</p>
              <span className="mt-3 inline-flex items-center gap-2 font-display text-body-sm text-ink-3">
                Learn more
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
