// A short line sample in the series colour, for the chart tooltip.
export default function SeriesSwatch({ color }) {
  return (
    <svg aria-hidden="true" width="20" height="8" viewBox="0 0 20 8" className="shrink-0">
      <line x1="1" y1="4" x2="19" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
