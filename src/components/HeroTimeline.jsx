/* Hero timeline strip — rebuilt from measurements of https://orchestra.bio
 *
 * Structure in the original (Framer "ticker"):
 *   - 5 lanes at document y = 526 / 544.5 / 563 / 581.5 / 600 (18.5px pitch),
 *     each a 1278x1 div with background rgb(36,71,77) — that 1px div IS the
 *     faint lane rule that runs the full width behind the items.
 *   - Inside each lane sits a <ul> (display:flex, align-items:center,
 *     width/height 100%) of <li class="ticker-item">. Items are laid out in
 *     flow, not absolutely: "spacer" li's are flex-basis fr fractions of the
 *     container and carry an opacity:0 1px white div; "content" li's are
 *     width:fit-content and hold the pills / rings / chips, vertically centred
 *     on the 1px rule so they overhang it symmetrically.
 *   - Content is duplicated exactly twice; each half measures 1278px, so the
 *     full track is 2556px and the loop distance is 1278px (= -50%).
 *
 * Motion (measured over a 2.0s sample of each <ul>'s computed transform.m41,
 * confirmed identical at 1280px and 390px viewports):
 *     lane 526 -> -23.97 px/s   (right-to-left)
 *     lane 544 -> +35.96 px/s   (left-to-right)
 *     lane 563 -> -43.95 px/s   (right-to-left)
 *     lane 581 -> +15.98 px/s   (left-to-right)
 *     lane 600 -> -19.98 px/s   (right-to-left)
 *   Linear, no easing ramp, runs continuously from load, DOES NOT pause on
 *   hover (verified: delta over 1s while hovering was identical, -24/+36/-44/
 *   +16/-20), and is fully frozen under prefers-reduced-motion: reduce
 *   (verified: delta 0 on every lane).
 *   Duration per lane = 1278 / speed:
 *     53.25s / 35.5s / 29.045s / 79.875s / 63.9s
 */

const RULE = 'rgb(36, 71, 77)'

/* Palette, sampled from computed styles */
const SAGE = 'rgb(91, 147, 131)'
const SAGE70 = 'rgba(91, 147, 131, 0.7)'
const SAGE30 = 'rgba(91, 147, 131, 0.3)'
const ROSE = 'rgb(206, 149, 153)'
const ROSE70 = 'rgba(206, 149, 153, 0.7)'
const BLUE = 'rgb(156, 182, 224)'
const BLUE70 = 'rgba(156, 182, 224, 0.7)'
const CLAY = 'rgb(226, 132, 104)'

/* Labelled chips. chipDy is the chip pill's top offset from the 8px-tall
 * marker pill; connH/connDy describe the 1px stem that links them. */
const CHIPS = {
  shipment: {
    text: 'Shipment scheduled',
    bg: 'rgb(38, 72, 129)',
    color: 'rgb(206, 217, 235)',
    w: 141.5,
    dy: -54,
    connH: 24,
    connDy: -24,
    connBg: 'rgb(38, 72, 129)',
  },
  vendor: {
    text: 'Vendor delay',
    bg: 'rgb(54, 94, 85)',
    color: 'rgb(167, 213, 184)',
    w: 96.6,
    dy: -78,
    connH: 48,
    connDy: -48,
    connBg: SAGE,
  },
  spend: {
    text: 'Spend variance',
    bg: 'rgb(94, 49, 32)',
    color: 'rgb(211, 187, 187)',
    w: 111.1,
    dy: 24,
    connH: 16,
    connDy: 8,
    connBg: 'rgb(94, 49, 32)',
  },
}

/* Lane definitions. Each entry is ONE copy of the content; it is rendered
 * twice so the loop seams. `sp` = spacer with an fr weight, everything else is
 * a content item. Sequences transcribed item-by-item from the original's
 * <li> list (18 / 26 / 34 / 32 / 22 li's per lane = 9 / 13 / 17 / 16 / 11
 * per half). */
const LANES = [
  {
    y: 526,
    speed: -23.97,
    items: [
      { t: 'sp', fr: 1 },
      { t: 'pill', bg: SAGE70 },
      { t: 'sp', fr: 2 },
      { t: 'pill', bg: ROSE70 },
      { t: 'sp', fr: 2 },
      { t: 'ring', size: 15, border: ROSE },
      { t: 'sp', fr: 2 },
      { t: 'pill', bg: SAGE },
      { t: 'sp', fr: 1 },
    ],
  },
  {
    y: 544.5,
    speed: 35.96,
    items: [
      { t: 'dash', w: 40 },
      { t: 'ring', size: 30, border: SAGE30, inner: CLAY, dot: SAGE },
      { t: 'sp', fr: 2 },
      { t: 'dot' },
      { t: 'dash', w: 12 },
      { t: 'dot' },
      { t: 'sp', fr: 2 },
      { t: 'pill', bg: BLUE70, chip: 'shipment' },
      { t: 'sp', fr: 2 },
      { t: 'dot' },
      { t: 'dash', w: 24 },
      { t: 'pill', bg: SAGE },
      { t: 'sp', fr: 2 },
    ],
  },
  {
    y: 563,
    speed: -43.95,
    items: [
      { t: 'sp', fr: 1 },
      { t: 'dot' },
      { t: 'sp', fr: 3 },
      { t: 'pill', bg: SAGE70, chip: 'vendor' },
      { t: 'sp', fr: 2 },
      { t: 'ring', size: 30, border: SAGE30, inner: SAGE, dot: SAGE },
      { t: 'dash', w: 64 },
      { t: 'pill', bg: BLUE },
      { t: 'dash', w: 40 },
      { t: 'dot' },
      { t: 'sp', fr: 2 },
      { t: 'ring', size: 15, fill: BLUE, dot: SAGE },
      { t: 'sp', fr: 2 },
      { t: 'pill', bg: CLAY },
      { t: 'sp', fr: 1 },
      { t: 'pill', bg: BLUE },
      { t: 'sp', fr: 1 },
    ],
  },
  {
    y: 581.5,
    speed: 15.98,
    items: [
      { t: 'dash', w: 23 },
      { t: 'pill', bg: BLUE70 },
      { t: 'sp', fr: 1 },
      { t: 'ring', size: 15, fill: BLUE, dot: SAGE },
      { t: 'sp', fr: 1 },
      { t: 'pill', bg: ROSE },
      { t: 'sp', fr: 3 },
      { t: 'pill', bg: SAGE },
      { t: 'sp', fr: 1 },
      { t: 'dot' },
      { t: 'dash', w: 96 },
      { t: 'ring', size: 15, fill: BLUE, dot: SAGE },
      { t: 'dash', w: 40 },
      { t: 'dot' },
      { t: 'sp', fr: 1 },
      { t: 'ring', size: 15, border: ROSE, dot: SAGE },
    ],
  },
  {
    y: 600,
    speed: -19.98,
    items: [
      { t: 'sp', fr: 1 },
      { t: 'pill', bg: SAGE },
      { t: 'sp', fr: 3 },
      { t: 'dot' },
      { t: 'dash', w: 128 },
      { t: 'ring', size: 30, border: SAGE30, inner: CLAY, dot: SAGE },
      { t: 'dash', w: 64 },
      { t: 'pill', bg: ROSE70, chip: 'spend' },
      { t: 'sp', fr: 1 },
      { t: 'ring', size: 30, border: SAGE30, inner: SAGE, dot: SAGE },
      { t: 'sp', fr: 1 },
    ],
  },
]

/* The 5x5 sage dot that sits at the centre of every ring */
function Dot({ color = SAGE }) {
  return (
    <div
      style={{ width: 5, height: 5, borderRadius: 100, backgroundColor: color }}
    />
  )
}

function Item({ it }) {
  if (it.t === 'sp') {
    /* Spacer: fr-weighted share of the leftover width. The original puts an
       opacity:0 1px white div inside; it is invisible, so an empty box with
       the same flex weight is equivalent. */
    return (
      <li
        style={{
          flex: `${it.fr} 1 0`,
          minWidth: 0,
          position: 'relative',
          height: 1,
        }}
      />
    )
  }

  if (it.t === 'dash') {
    /* Fixed-width transparent gap (original: opacity:0 white 1px div) */
    return (
      <li style={{ flex: '0 0 auto', width: it.w, height: 1, position: 'relative' }} />
    )
  }

  if (it.t === 'dot') {
    return (
      <li
        style={{
          flex: '0 0 auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Dot />
      </li>
    )
  }

  if (it.t === 'ring') {
    /* Concentric marker. Measured construction:
         30x30 outer, border-radius 1000px, transparent bg,
           border 2.5px solid rgba(91,147,131,0.3) drawn by Framer's ::after
         > 15x15 inner, border-radius 100px, transparent bg,
           border 2.5px solid (clay #e28468 or sage #5b9383)
         > 5x5 dot, border-radius 100px, background rgb(91,147,131)
       The 15-only variants come in two flavours: bordered (transparent bg,
       2.5px rose/clay/sage border) and solid-filled (background #9cb6e0). */
    const ring15 = (
      <div
        style={{
          width: 15,
          height: 15,
          borderRadius: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: it.fill || 'transparent',
          border: it.fill
            ? undefined
            : `2.5px solid ${it.size === 30 ? it.inner : it.border}`,
          boxSizing: 'border-box',
        }}
      >
        <Dot />
      </div>
    )

    if (it.size === 30) {
      return (
        <li
          style={{
            flex: '0 0 auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 1000,
              border: `2.5px solid ${it.border}`,
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {ring15}
          </div>
        </li>
      )
    }

    return (
      <li
        style={{
          flex: '0 0 auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {ring15}
      </li>
    )
  }

  /* pill: 32x8, border-radius 100px. May carry a labelled chip above/below. */
  const chip = it.chip ? CHIPS[it.chip] : null
  return (
    <li
      style={{
        flex: '0 0 auto',
        position: 'relative',
        width: 32,
        height: 8,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 32,
          height: 8,
          borderRadius: 100,
          backgroundColor: it.bg,
        }}
      />
      {chip && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            /* Offsets are measured from the 8px marker pill's top edge.
               Above-marker chips stack [pill, stem] so the column top is
               chip.dy; below-marker chips stack [stem, pill] so the column
               top is the stem's offset, chip.connDy. */
            top: chip.dy < 0 ? chip.dy : chip.connDy,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {/* chip above the marker: pill first, then the stem down to it */}
          {chip.dy < 0 ? (
            <>
              <div
                style={{
                  height: 30,
                  padding: '4px 10px',
                  width: chip.w,
                  borderRadius: 100,
                  backgroundColor: chip.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '22px',
                    letterSpacing: '-0.14px',
                    color: chip.color,
                    fontFamily: "'General Sans', Inter, system-ui, sans-serif",
                  }}
                >
                  {chip.text}
                </p>
              </div>
              <div
                style={{ width: 1, height: chip.connH, backgroundColor: chip.connBg }}
              />
            </>
          ) : (
            <>
              <div
                style={{ width: 1, height: chip.connH, backgroundColor: chip.connBg }}
              />
              <div
                style={{
                  height: 30,
                  padding: '4px 10px',
                  width: chip.w,
                  borderRadius: 100,
                  backgroundColor: chip.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '22px',
                    letterSpacing: '-0.14px',
                    color: chip.color,
                    fontFamily: "'General Sans', Inter, system-ui, sans-serif",
                  }}
                >
                  {chip.text}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </li>
  )
}

function Lane({ lane, index }) {
  /* The original's ticker container is NOT fluid: it measures 1278px wide at
     any viewport >= 810px and 798px below that (measured at 390/768/1280/1600).
     One copy therefore spans --ht-w, the loop distance is --ht-w, and the
     duration is --ht-w / |speed| so that px/s stays constant across
     breakpoints exactly as the original does (-24/+36/-44/+16/-20 at both
     1280 and 390). */
  const durWide = (1278 / Math.abs(lane.speed)).toFixed(3)
  const durNarrow = (798 / Math.abs(lane.speed)).toFixed(3)
  const dir = lane.speed < 0 ? 'ht-left' : 'ht-right'

  const copy = (key) => (
    <ul
      key={key}
      aria-hidden="true"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        gap: 0,
        flex: '0 0 var(--ht-w)',
        width: 'var(--ht-w)',
        height: '100%',
      }}
    >
      {lane.items.map((it, i) => (
        <Item key={i} it={it} />
      ))}
    </ul>
  )

  return (
    <div
      className="ht-lane"
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'var(--ht-w)',
        top: lane.y,
        height: 1,
        backgroundColor: RULE,
        /* overflow stays visible: the pills/rings/chips overhang the 1px rule
           and are clipped only by the 99px band wrapper, as in the original */
        overflow: 'visible',
      }}
    >
      <div
        className={`ht-track ${dir}`}
        style={{
          display: 'flex',
          width: 'calc(var(--ht-w) * 2)',
          /* The rule is 1px tall; give the track a tall box centred on it so
             items (8..30px, plus chips that overhang by up to 78px) sit
             symmetrically about the rule instead of hanging off its bottom. */
          position: 'absolute',
          top: '50%',
          left: 0,
          height: 200,
          marginTop: -100,
          alignItems: 'center',
          willChange: 'transform',
          '--ht-dur-wide': `${durWide}s`,
          '--ht-dur-narrow': `${durNarrow}s`,
        }}
      >
        {copy(0)}
        {copy(1)}
      </div>
    </div>
  )
}

export default function HeroTimeline() {
  return (
    <div
      className="ht-band relative"
      style={{ height: 99, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <style>{`
        .ht-band { --ht-w: 1278px; }
        @media (max-width: 809px) { .ht-band { --ht-w: 798px; } }

        @keyframes ht-scroll-left  {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(calc(var(--ht-w) * -1),0,0); } }
        @keyframes ht-scroll-right {
          from { transform: translate3d(calc(var(--ht-w) * -1),0,0); }
          to   { transform: translate3d(0,0,0); } }
        .ht-track { animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    animation-duration: var(--ht-dur-wide); }
        @media (max-width: 809px) {
          .ht-track { animation-duration: var(--ht-dur-narrow); }
        }
        .ht-track.ht-left  { animation-name: ht-scroll-left; }
        .ht-track.ht-right { animation-name: ht-scroll-right; }
        /* Verified on the original: hovering does NOT pause the ticker, so we
           deliberately do not add a hover rule here. */
        @media (prefers-reduced-motion: reduce) {
          .ht-track { animation: none !important; }
        }
      `}</style>

      {/* Static backdrop. The original layers this SVG (the faint darker
          rectangular block regions) at x=0 y=526, 1280x75, object-fit:cover
          BEHIND the five ticker lanes — it is the background of the strip, not
          the strip itself. A previous pass transcribed this asset's bars and
          rendered them as the whole element, which is why the band read as a
          static field of dull bars. */}
      <img
        src="https://framerusercontent.com/images/gBzUUIIZd9H9hJVGQD3lc88A88.svg?width=1280&height=72"
        alt=""
        style={{
          position: 'absolute',
          left: 0,
          top: 24,
          width: '100%',
          height: 75,
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {LANES.map((lane, i) => (
        <Lane key={i} lane={{ ...lane, y: lane.y - 502 }} index={i} />
      ))}
    </div>
  )
}
