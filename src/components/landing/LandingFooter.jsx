import { ExternalLink, RotateCcw } from 'lucide-react'
import { useApp } from '../../store/AppContext'
import Button from '../ui/Button'

export default function LandingFooter() {
  const { dispatch } = useApp()

  function resetDemoData() {
    if (window.confirm('Reset all demo data? Your changes will be lost.')) {
      dispatch({ type: 'RESET_DEMO' })
    }
  }

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[60ch] text-sm text-pretty text-muted">
          A solo frontend redesign of OFU, my team’s final year project at the University of Central Punjab. Demo
          data only.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://github.com/Awaisalpha/ofu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-card px-2 text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            GitHub
            <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <Button variant="secondary" onClick={resetDemoData}>
            <RotateCcw size={15} aria-hidden="true" />
            Reset demo data
          </Button>
        </div>
      </div>
    </footer>
  )
}
