import { ExternalLink } from 'lucide-react'

// A secondary button-style link to the student's portfolio, opening in a new tab.
// size 'sm' is for card footers.
export default function PortfolioLink({ url, studentName, size = 'md' }) {
  const sizeClassName = size === 'sm' ? 'h-8 px-3' : 'h-9 px-3.5'
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-card border border-line bg-surface text-sm font-medium whitespace-nowrap text-ink hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:transition-colors ${sizeClassName}`}
    >
      <ExternalLink size={14} aria-hidden="true" className="shrink-0" />
      Portfolio
      <span className="sr-only">
        {' '}
        of {studentName} (opens in a new tab)
      </span>
    </a>
  )
}
