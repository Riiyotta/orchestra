import { useViewportVideo } from './Showcase'

export default function SystemBand() {
  /* Original markup has autoplay=false on this video; the Framer runtime starts
     it on viewport entry and pauses it on exit. Measured: paused at page top,
     playing (currentTime advancing) once scrolled into view, paused again after
     scrolling back to the top. */
  const videoRef = useViewportVideo(false)

  return (
    /* Section is y=2443 h=772: 136px lead-in, h2 (104px), 32px gap, 500px video. */
    <section className="overflow-clip bg-paper pt-[136px]">
      {/* The original's heading is 600x104 (two lines of Greed Standard). Our
          substitute display face is wider and wraps to three lines at 600px, so
          the box is widened to 760px to hold the original two-line shape and
          pinned to h-[104px] — otherwise the band would grow 52px and push the
          video off its measured y=2715. */}
      <div className="h-[104px] px-8">
        <h2 className="max-w-[760px] font-display text-display-md text-ink">
          The intelligent management system for life sciences R&amp;D
        </h2>
      </div>

      {/* Full-bleed: the video runs edge to edge at x=0 w=1280, not inside the gutter. */}
      <div className="mt-8 bg-paper-2">
        <video
          ref={videoRef}
          className="block h-[500px] w-full object-cover"
          loop
          muted
          playsInline
          preload="none"
          poster="https://framerusercontent.com/images/w4eQkSJW6S6yovxrOaETYNkJ7s.png?width=2560&height=1000"
        >
          <source
            src="https://framerusercontent.com/assets/izNT9OJiKwY93QmI1lh2aXgSp4.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  )
}
