import { useEffect, useRef, useState } from 'react'

const DESKTOP_WIDTH = 1200
// Under 768px the pages use their phone layout, so the preview is drawn at phone width.
const PHONE_WIDTH = 400
const PHONE_BREAKPOINT = 768

// Draws children at a fixed virtual width and shrinks them with a CSS transform to fit
// the available width. The transform doesn't change layout size, so the wrapper takes
// the scaled height itself, and nothing is cut off or scrolls sideways.
export default function ScaledPreview({ children }) {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const [size, setSize] = useState({ virtualWidth: DESKTOP_WIDTH, scale: 0, height: 0 })

  useEffect(() => {
    const wrapper = wrapperRef.current
    const content = contentRef.current

    // Runs when the frame resizes, and when the page inside changes height (lazy loading, tab switch).
    const observer = new ResizeObserver(() => {
      const virtualWidth = window.innerWidth < PHONE_BREAKPOINT ? PHONE_WIDTH : DESKTOP_WIDTH
      const scale = wrapper.clientWidth / virtualWidth
      setSize({ virtualWidth, scale, height: content.offsetHeight * scale })
    })
    observer.observe(wrapper)
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className="relative overflow-hidden" style={{ height: size.height }}>
      <div
        ref={contentRef}
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: size.virtualWidth, transform: `scale(${size.scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
