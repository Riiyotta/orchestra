import { Link } from 'react-router-dom'
import { POSTS } from '../content/posts.js'

/* Which three posts the home band promotes is an editorial choice, not
   "the newest three" — the original skips `agents-for-r-d-strategy` and runs
   posts 1, 2 and 4. Keep that choice explicit here rather than slicing POSTS,
   so reordering the blog can't silently change the home page. */
const FEATURED_SLUGS = [
  'how-biotechs-can-manage-cros-with-agents',
  'agents-for-r-d-science',
  'from-paper-to-cloud-to-agents',
]

/* Cards render at 242.52px, so they take the 512px-wide variant rather than
   the 1024 the blog routes use. posts.js stores the 1024 URL; narrow it here. */
const thumb = (image) => image.replace('scale-down-to=1024', 'scale-down-to=512')

export default function Updates() {
  const posts = FEATURED_SLUGS.map((slug) => POSTS.find((p) => p.slug === slug)).filter(Boolean)

  return (
    <section className="bg-ink py-12 md:py-[88px]">
      <div className="shell">
        {/* Heading is mint-soft on the original, not cream. */}
        <h2 className="font-display text-display-md font-medium text-mint-soft">
          Latest updates
        </h2>

        <div className="mt-10 grid gap-8 md:mt-[40px] md:grid-cols-3">
          {posts.map(({ slug, title, image }) => (
            <Link key={slug} to={`/blog/${slug}`} className="group flex flex-col items-start">
              <div className="w-full overflow-hidden rounded-xl bg-ink-2">
                <img
                  src={thumb(image)}
                  alt=""
                  className="h-[242.52px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              {/* Title sits in its own 20px/8px padded block, so it is inset
                  8px from the image edge rather than flush with it. */}
              <div className="w-full px-2 py-5">
                <h3 className="font-body text-[13px] leading-7 tracking-[-0.26px] text-mint-soft md:text-body-lg transition-colors duration-150 group-hover:text-mint">
                  {title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
