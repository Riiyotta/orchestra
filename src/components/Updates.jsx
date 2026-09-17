const POSTS = [
  {
    title: 'How biotechs can manage CROs with agents',
    href: '/blog/how-biotechs-can-manage-cros-with-agents',
    image:
      'https://framerusercontent.com/images/aBVvXpB0r2rfq6xa8aVntZF33c.png?scale-down-to=512&width=3408&height=1506',
  },
  {
    title: 'Agents for R&D: Science',
    href: '/blog/agents-for-r-d-science',
    image:
      'https://framerusercontent.com/images/77xOndwSYi2QRMgwkkstALd0Jhw.png?scale-down-to=512&width=3600&height=1520',
  },
  {
    title: 'From paper to cloud to agents: the digital transformation of R&D',
    href: '/blog/from-paper-to-cloud-to-agents',
    image:
      'https://framerusercontent.com/images/xqSsX0CC45mgPMZl0wpS1baL1Io.png?scale-down-to=512&width=3600&height=1800',
  },
]

export default function Updates() {
  return (
    <section className="bg-ink py-12 md:py-[88px]">
      <div className="shell">
        {/* Heading is mint-soft on the original, not cream. */}
        <h2 className="font-display text-display-md font-medium text-mint-soft">
          Latest updates
        </h2>

        <div className="mt-10 grid gap-8 md:mt-[40px] md:grid-cols-3">
          {POSTS.map(({ title, href, image }) => (
            <a key={href} href={href} className="group flex flex-col items-start">
              <div className="w-full overflow-hidden rounded-xl bg-ink-2">
                <img
                  src={image}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
