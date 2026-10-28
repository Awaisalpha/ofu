import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

// One row of a bordered list (My applications, My posts).
// - leading: the square on the left, usually a TintedSquare.
// - details: extra lines under the title.
// - meta: shown to the right when the row is wide, and under the title when it's narrow.
// - to: when set, the title link stretches over the whole row, the row gets a hover
//   background and a chevron. Buttons or links inside details or meta need
//   'relative z-10' so they sit above the stretched link and stay clickable.
// The layout follows the row's own width (a container query, @2xl = 672px), not the
// screen's, because the sidebar takes room from tablet widths upwards.
export default function ListRow({ leading, title, to, details, meta }) {
  return (
    <div className="@container">
      <div
        className={`relative flex items-center gap-3 px-4 py-3 ${to ? 'hover:bg-canvas motion-safe:transition-colors' : ''}`}
      >
        <div className="self-start @2xl:self-center">{leading}</div>

        <div className="min-w-0 flex-1 @2xl:flex @2xl:items-center @2xl:gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="line-clamp-2 text-[15px] leading-5 font-semibold @2xl:truncate" title={title}>
              {to ? (
                // The ring is drawn inside the row, because the list clips anything outside it.
                <Link
                  to={to}
                  className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
            {details}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 @2xl:mt-0 @2xl:shrink-0 @2xl:flex-nowrap">
            {meta}
          </div>
        </div>

        {/* Same width either way, so rows with and without a link line up. */}
        <span className="w-4 shrink-0">
          {to && <ChevronRight size={16} className="text-muted" aria-hidden="true" />}
        </span>
      </div>
    </div>
  )
}
