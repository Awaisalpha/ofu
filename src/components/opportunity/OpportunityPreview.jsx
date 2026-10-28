import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import OpportunityCard from './OpportunityCard'

// The real card, so the alumnus sees exactly what students will see.
// On phones it sits under the form and starts collapsed; on large screens it's always open.
export default function OpportunityPreview({ opportunity }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside aria-labelledby="preview-heading" className="rounded-card border border-line bg-surface p-4">
      <h2 id="preview-heading" className="text-sm font-semibold">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="post-preview"
          className="flex w-full items-center justify-between gap-2 rounded text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
        >
          Preview, how students will see it
          <ChevronDown size={16} className={`shrink-0 text-muted ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <span className="hidden lg:inline">Preview, how students will see it</span>
      </h2>

      <div id="post-preview" className={`${isOpen ? 'block' : 'hidden'} mt-3 lg:block`}>
        <OpportunityCard opportunity={opportunity} headingLevel={3} isPreview />
        <p className="mt-2 text-xs leading-5 text-muted">Students see the full description when they open it.</p>
      </div>
    </aside>
  )
}
