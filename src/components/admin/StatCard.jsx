import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

const cardClasses = 'flex h-full flex-col rounded-card border border-line bg-surface p-4'

// A label and a big number. With "to", the whole card is a link.
export default function StatCard({ label, value, hint, to }) {
  const content = (
    <>
      <span className="flex items-center justify-between gap-2 text-[13px] font-medium text-muted">
        {label}
        {to && <ArrowRight size={16} className="shrink-0 text-accent" aria-hidden="true" />}
      </span>
      <span className="mt-2 text-3xl leading-none font-semibold tracking-tight tabular-nums">{value}</span>
      {hint && <span className="mt-2 text-[13px] text-muted">{hint}</span>}
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={`${cardClasses} hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
      >
        {content}
      </Link>
    )
  }

  return <div className={cardClasses}>{content}</div>
}
