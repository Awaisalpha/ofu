import { useEffect, useRef, useState } from 'react'

// Shows the first few lines with a "See more" button, but only when the text is longer than that.
// The clamp is visual only, so screen readers still read the whole text.
// clampClassName must be a full class like 'line-clamp-3' so Tailwind can find it.
export default function ExpandableText({ id, text, clampClassName = 'line-clamp-4' }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const textRef = useRef(null)

  // Measure while clamped, and again whenever the width changes the line count.
  useEffect(() => {
    if (isExpanded) return
    const element = textRef.current

    function measure() {
      setIsOverflowing(element.scrollHeight > element.clientHeight)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [isExpanded, text])

  return (
    <div>
      {/* Paragraphs are separate elements, so the clamp never lands on a blank line. */}
      <div
        id={id}
        ref={textRef}
        className={`max-w-[70ch] space-y-2 text-sm leading-6 text-pretty text-ink ${isExpanded ? '' : clampClassName}`}
      >
        {text.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {(isOverflowing || isExpanded) && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={id}
          className="mt-1.5 rounded text-sm font-medium text-accent-strong underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {isExpanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  )
}
