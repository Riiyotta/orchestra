import { useCallback, useEffect, useRef, useState } from 'react'

/* Measured on the original: the eyebrow row is a pill "Menu" (x=223 w=833 h=52,
   bg #D9E1DC, radius 100px) holding three items. Only 01 is ever in the active
   state — it does NOT track the accordion, which cycles independently below.
   Active item: 285x40 pill, bg #375257, cream text, 80px #D0DDD5 rule.
   Inactive:   transparent pill, #375257 text, 24px #9DBDAB rule. */
const EYEBROWS = [
  { num: '01', label: 'Unified Planning', w: 285, rule: 80 },
  { num: '02', label: 'intelligent operations', w: 276, rule: 24 },
  { num: '03', label: 'Decision Support', w: 229, rule: 24 },
]

/* Per-tab screenshot geometry, measured individually on the original — each
   frame has its own intrinsic size and vertical offset, all sharing x=696.
   Offsets below are relative to the band top (y=1395). */
const TABS = [
  {
    title: 'R&D Planning',
    copy: 'Build a centralized roadmap across leadership, programs, and budgets',
    href: 'https://orchestra.bio/product/unified-planning',
    image:
      'https://framerusercontent.com/images/uNU8C4eA2XE74NLRMSSlpFTQeZU.png?scale-down-to=2048&width=2242&height=1436',
    shot: { w: 1119, h: 717, top: 214 },
  },
  {
    title: 'Financial Modelling',
    copy: 'Forecast and analyze spend across R&D, operations, and personnel',
    href: 'https://orchestra.bio/product/unified-planning',
    image:
      'https://framerusercontent.com/images/WXUYgsBVxtqhs22CBQvDViO1NWM.png?scale-down-to=2048&width=1490&height=1804',
    shot: { w: 730, h: 884, top: 185 },
  },
]

/* Measured: the active item's 1px divider carries a dark progress bar that
   scales 0 -> 1 linearly over 8000ms, then the next tab takes over. */
const DWELL = 8000

export default function Pillars() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.15,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const select = useCallback((i) => {
    setActive(i)
    setProgress(0)
  }, [])

  useEffect(() => {
    if (!inView || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf
    const start = performance.now() - progress * DWELL
    const tick = (now) => {
      const p = (now - start) / DWELL
      if (p >= 1) {
        setActive((a) => (a + 1) % TABS.length)
        setProgress(0)
      } else {
        setProgress(p)
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // progress is intentionally not a dep: it would restart the loop each frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, inView, paused])

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative h-[1048px] overflow-clip bg-paper"
    >
      {/* Screenshot stack sits behind the copy column. */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[640px] lg:block">
        <img
          src="https://framerusercontent.com/images/xOtj5Kib4rEI9YdTvhNzUSgB8.png?scale-down-to=2048&width=1280&height=2096"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
        {TABS.map((tab, i) => (
          <img
            key={tab.title}
            src={tab.image}
            alt=""
            width={tab.shot.w}
            height={tab.shot.h}
            style={{ width: tab.shot.w, height: tab.shot.h, top: tab.shot.top }}
            className={`absolute left-[56px] max-w-none object-cover transition-opacity duration-500 ease-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 px-8">
        {/* Eyebrow menu: pill row starting 20px below the band top (y=1415). */}
        <div className="pt-[14px]">
          <div className="hidden h-[52px] w-[833px] items-center gap-4 rounded-full bg-paper-2 px-[6px] lg:ml-[191px] lg:flex">
            {EYEBROWS.map(({ num, label, w, rule }, i) => {
              const isFirst = i === 0
              return (
                <div
                  key={num}
                  style={{ width: w }}
                  className={`flex h-10 shrink-0 items-center gap-[12px] rounded-full pl-2 pr-3 ${
                    isFirst ? 'bg-ink-3' : 'bg-transparent'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center font-mono text-[13px] font-medium uppercase leading-[22px] tracking-normal ${
                      isFirst ? 'text-cream' : 'text-ink-3'
                    }`}
                  >
                    {num}
                  </span>
                  <span
                    style={{ width: rule }}
                    className={`h-px shrink-0 ${isFirst ? 'bg-paper-3' : 'bg-mint-soft'}`}
                  />
                  <span
                    className={`whitespace-nowrap font-mono text-[13px] font-medium uppercase leading-[22px] tracking-normal ${
                      isFirst ? 'text-cream' : 'text-ink-3'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="w-full max-w-[576px]">
            {/* h2 sits at y=1595 = band top + 200; the strip above occupies 72. */}
            <h2 className="mt-[134px] font-display text-display-lg text-ink">
              Align your organization from bench to boardroom
            </h2>

            {/* First accordion divider lands at y=2113 = h2 bottom (1775) + 338. */}
            <div
              className="mt-[338px]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {TABS.map((tab, i) => {
                const isActive = i === active
                return (
                  <div key={tab.title}>
                    {/* 1px track + dark progress bar that fills over DWELL. */}
                    <div className="relative h-px w-full overflow-hidden bg-paper-3">
                      <div
                        className="h-px w-full origin-left bg-ink"
                        style={{
                          transform: `scaleX(${isActive ? progress : 0})`,
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-expanded={isActive}
                      className="block w-full py-6 text-left"
                    >
                      <span
                        className={`ml-[34px] block font-display text-[20px] leading-[28px] transition-colors duration-300 ${
                          isActive ? 'text-ink' : 'text-muted'
                        }`}
                      >
                        {tab.title}
                      </span>

                      {/* Collapsed to 0 when inactive — the original's inactive
                          item is 77px tall and shows title only. */}
                      <div
                        className={`grid transition-all duration-500 ease-out ${
                          isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pt-[24px] font-body text-body-sm text-ink-3">
                            {tab.copy}
                          </p>
                          <span
                            role="link"
                            tabIndex={-1}
                            onClick={(e) => {
                              e.stopPropagation()
                              window.location.href = tab.href
                            }}
                            className="mt-[24px] mb-[24px] inline-flex h-8 items-center gap-1 rounded-[200px] bg-ink-3 pl-[14px] pr-[12px] font-display text-label text-cream transition-opacity duration-150 hover:opacity-90"
                          >
                            Learn more
                            <svg
                              className="h-2 w-[7px] shrink-0"
                              viewBox="0 0 7 8"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M2.5 1 6 4 2.5 7"
                                stroke="currentColor"
                                strokeWidth="1.2"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
