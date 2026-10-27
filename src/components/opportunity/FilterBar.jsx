import { Search } from 'lucide-react'
import { opportunityTypes } from '../../data/opportunities'
import Input from '../ui/Input'

const typeOptions = ['All', ...opportunityTypes]

// Search plus type chips, shown in the floating panel under the Browse hero.
export default function FilterBar({ searchText, type, onSearchChange, onTypeChange }) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Search by title or organisation
        </label>
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <Input
          id="search"
          type="search"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search title or organisation"
          className="pr-3 pl-9"
        />
      </div>

      <div role="group" aria-label="Opportunity type" className="flex flex-wrap gap-1.5">
        {typeOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onTypeChange(option)}
            aria-pressed={type === option}
            className={`h-8 rounded-full border px-3 text-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              type === option
                ? 'border-accent bg-accent font-semibold text-white'
                : 'border-line bg-surface font-medium text-ink hover:bg-canvas'
            }`}
          >
            {option === 'All' ? 'All types' : option}
          </button>
        ))}
      </div>
    </div>
  )
}
