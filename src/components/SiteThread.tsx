import { useEffect, useRef } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

// An Ochre Red running stitch down the left edge of the whole site.
// The dashed line is not yet sewn; the solid part grows as the visitor scrolls and reaches the bottom at the end of the page.
// With reduced motion the thread is simply solid and static.
export function SiteThread() {
  const threadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const thread = threadRef.current
    if (!thread) return
    if (window.matchMedia(reducedMotionQuery).matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 1
      // The sewn end sits a little below the middle of the screen and lands exactly on the page bottom.
      const sewn = window.scrollY + window.innerHeight * (0.35 + 0.65 * progress)
      thread.style.setProperty('--sewn', `${Math.round(sewn)}px`)
    }
    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="site-thread" ref={threadRef}>
      <span className="site-thread__sewn" />
    </div>
  )
}
