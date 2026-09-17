import Arrow from '../components/Arrow.jsx'
import { TEAM, PANEL_TEXTURE, TEAM_GROUP_PHOTO, JOBS_URL } from '../content/team.js'

const ARC = [
  {
    num: '01',
    label: 'Unified planning',
    copy: 'Build a single operating plan that aligns scientific roadmaps, budgets, hiring, and vendors.',
  },
  {
    num: '02',
    label: 'Intelligent operations',
    copy: 'Track execution continuously so progress and risk stay visible without manual reporting.',
  },
  {
    num: '03',
    label: 'Decision support',
    copy: 'Model scenarios and surface tradeoffs so every program decision is grounded in context.',
  },
]

export default function About() {
  return (
    <>
      <section className="bg-ink pb-12 pt-[136px] text-center md:pb-[88px]">
        <div className="shell">
          <p className="eyebrow-tight text-mint-soft">About</p>
          <h1 className="mx-auto mt-[24px] max-w-[1020px] font-display text-[44px] font-medium leading-[48px] tracking-[-0.88px] text-cream md:text-[64px] md:leading-[68px] md:tracking-[-1.28px]">
            Our mission is to reduce the operational complexity of developing medicines.
          </h1>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-[80px]">
        <div className="shell grid gap-8 md:grid-cols-2 md:gap-16">
          <h2 className="font-display text-display-md font-medium text-ink">Our approach</h2>
          <p className="max-w-[608px] font-body text-body-md text-ink-3">
            Orchestra is the first platform that unifies scientific, operational, and
            financial context into one system of record for R&amp;D.
          </p>
        </div>
      </section>

      <section className="bg-paper pb-16 md:pb-[80px]">
        <div className="shell">
          <p className="max-w-[720px] font-body text-[26px] leading-[34px] tracking-[-0.52px] text-ink-3">
            Our product is built on a multi-stage intelligence arc:
          </p>

          <div className="mt-[64px] grid gap-10 md:grid-cols-3 md:gap-8">
            {ARC.map(({ num, label, copy }) => (
              <div key={num} className="flex flex-col gap-4">
                <span className="eyebrow-tight text-ink-3">{num}</span>
                <p className="eyebrow-tight text-ink">{label}</p>
                <p className="max-w-[360px] font-body text-label text-ink-3">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our team — section 1731/1328 at 1280; padding 80px 32px 40px, gap 64px
          between the header row and the grid. */}
      <section className="bg-ink px-5 pb-[40px] pt-[48px] md:px-8 md:pb-[40px] md:pt-[80px]">
        <div className="mx-auto w-full max-w-[1216px]">
          {/* Header row: h2 occupies x=32 w=608, copy x=640 w=608 — an exact
              50/50 split of the 1216 shell with no gutter between them. */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-0">
            <h2 className="font-display text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-paper-2 md:w-1/2 md:shrink-0 md:text-display-md">
              Our team
            </h2>
            <p className="font-body text-body-md text-mint-soft md:w-1/2 md:shrink-0">
              Orchestra is built by engineers, operators, and scientists who have worked
              across biotech, enterprise software, and AI systems. We combine deep
              technical expertise with a firsthand understanding of the operational
              burden facing scientific teams today.
            </p>
          </div>

          {/* 4 cols x 10px gap at 1280 (2 cols at 390). Each member occupies two
              adjacent cells: portrait + ink details panel, both 302x340. */}
          {/* Two pair-wrappers in a 10px-gap grid (1 col at 390, 2 at 1280).
              Each pair is 603px wide and splits 50/50 with NO internal gap, so
              the portrait and its details panel butt together: 302+302. */}
          <div className="mt-[40px] grid grid-cols-1 gap-[10px] md:mt-[64px] md:grid-cols-2">
            {TEAM.map(({ name, role, photo, linkedin }) => (
              <div key={name} className="flex flex-row">
                <img
                  src={photo}
                  alt={name}
                  className="h-[340px] w-1/2 shrink-0 object-cover"
                  loading="lazy"
                />
                <div className="relative h-[340px] w-1/2 shrink-0 bg-ink">
                  <img
                    src={PANEL_TEXTURE}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="relative z-[1] flex h-full flex-col justify-between p-5">
                    <div className="flex flex-col gap-1">
                      <p className="font-display text-[16px] font-medium leading-6 text-cream">
                        {name}
                      </p>
                      <p className="font-body text-[15px] leading-[23px] tracking-[-0.15px] text-mint">
                        {role}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-mono text-[12px] font-medium leading-5 text-mint-soft">
                        socials
                      </p>
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} on LinkedIn`}
                        className="inline-flex h-6 w-6 items-center justify-center text-mint-soft transition-colors hover:text-cream"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-[18px] w-[18px]"
                        >
                          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.71h.05a4.17 4.17 0 0 1 3.75-2.06c4 0 4.75 2.64 4.75 6.07V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21H9z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Group shot spans the full grid: 1216x690 at 1280, 350x340 at 390. */}
            <img
              src={TEAM_GROUP_PHOTO}
              alt=""
              className="col-span-1 h-[340px] w-full object-cover md:col-span-2 md:h-[690px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* We're hiring! — paper band 3059/336 at 1280 (3610/468 at 390).
          Two columns: h2 at x=32 w=608, copy column at x=640 w=608. There is no
          careers page on orchestra.bio (/careers, /jobs and /company/careers all
          404) — the CTA points at the external Ashby board, target="_blank". */}
      <section className="bg-paper px-5 py-[48px] md:px-8 md:py-[80px]">
        <div className="mx-auto flex w-full max-w-[1216px] flex-col gap-6 md:flex-row md:gap-0">
          <div className="flex flex-col md:w-1/2 md:shrink-0">
            <h2 className="font-display text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-ink md:text-display-md">
              We’re hiring!
            </h2>
            {/* Desktop: button sits at the bottom of the left column (y=3275 in a
                band whose content box runs 3139..3315). Mobile: it follows the
                copy instead, so it is rendered once per breakpoint. */}
            <a
              href={JOBS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mint mt-auto hidden self-start bg-ink-3 text-cream hover:bg-ink-2 hover:brightness-100 md:inline-flex"
            >
              View open positions
              <Arrow />
            </a>
          </div>

          <div className="flex flex-col md:w-1/2 md:shrink-0">
            <div className="flex flex-col">
              <p className="font-body text-body-md text-ink-3">
                Help build the operating system for scientific progress. We’re hiring
                exceptional engineers, product thinkers, and operators who want to work
                at the intersection of biotech, intelligence systems, and enterprise
                tooling.
              </p>
              <p className="mt-5 font-body text-body-md text-ink-3">
                You’ll solve challenges that directly accelerate the pace of scientific
                discovery.
              </p>
            </div>
            <a
              href={JOBS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mint mt-6 self-start bg-ink-3 text-cream hover:bg-ink-2 hover:brightness-100 md:hidden"
            >
              View open positions
              <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
