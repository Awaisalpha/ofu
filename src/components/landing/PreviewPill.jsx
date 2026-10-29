// A small tag with a hand-drawn arrow pointing at the preview card.
// The arrow points down by default; arrowClassName rotates it for each layout.
// It repeats the step title, so it's hidden from screen readers, and from phones where it doesn't fit.
export default function PreviewPill({ label, className = '', arrowClassName = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none hidden items-center gap-1 md:flex ${className}`}>
      <span
        key={label}
        className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold whitespace-nowrap text-accent-strong shadow-float motion-safe:animate-fade-in"
      >
        {label}
      </span>
      {/* A white stroke under the accent stroke keeps the arrow visible over the photo. */}
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${arrowClassName}`}>
        <g className="stroke-surface" strokeWidth="5">
          <path d="M4 8c14-2 22 6 22 26" />
          <path d="m19 28 7 7 6-8" />
        </g>
        <g className="stroke-accent" strokeWidth="2">
          <path d="M4 8c14-2 22 6 22 26" />
          <path d="m19 28 7 7 6-8" />
        </g>
      </svg>
    </div>
  )
}
