import { useEffect, useRef } from 'react'

import HeroTimeline from './HeroTimeline'

/* Both videos on the original are viewport-gated: they play while the element is
   on screen and pause once it scrolls away (the hero video reports paused:true
   when the System band is in view, and vice versa). Only the first has
   autoplay=true in markup; the second is started by the runtime on entry. */
function useViewportVideo(autoplayInMarkup) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.autoplay = true
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [autoplayInMarkup])

  return ref
}

export { useViewportVideo }

export default function Showcase() {
  const videoRef = useViewportVideo(true)

  return (
    <section className="relative bg-ink">
      {/* Decoration wrapper: y=502 h=99. The five ticker lanes sit at
          y = 526 / 544.5 / 563 / 581.5 / 600 inside it, matching the original. */}
      <HeroTimeline />

      {/* Product frame is the still image; the video plays inset within it. */}
      <div className="relative">
        <img
          src="https://framerusercontent.com/images/gOuIxBA6pXMhvUg0JgIvPoOgmIk.png?scale-down-to=2048&width=2560&height=1512"
          alt=""
          className="block h-[795px] w-full object-cover object-top"
        />
        <video
          ref={videoRef}
          className="absolute left-1/2 top-[64px] h-[699px] w-[1120px] -translate-x-1/2 object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="https://framerusercontent.com/assets/dSJnsOZOKZ1CHQrLYu8r4FChjLE.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  )
}
