import { Search } from 'lucide-react'
import { opportunityTypes } from '../../data/opportunities'

const fieldClasses =
  'h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-blue-600'

export default function FilterBar({ searchText, type, sortBy, onSearchChange, onTypeChange, onSortChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="search" className="mb-1 block text-xs font-medium text-stone-600">
          Search
        </label>
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-400"
            aria-hidden="true"
          />
          <input
            id="search"
            type="search"
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Title or organisation"
            className={`${fieldClasses} pl-9`}
          />
        </div>
      </div>

      <div className="sm:w-44">
        <label htmlFor="type" className="mb-1 block text-xs font-medium text-stone-600">
          Type
        </label>
        <select id="type" value={type} onChange={(event) => onTypeChange(event.target.value)} className={fieldClasses}>
          <option value="All">All types</option>
          {opportunityTypes.map((opportunityType) => (
            <option key={opportunityType} value={opportunityType}>
              {opportunityType}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:w-44">
        <label htmlFor="sort" className="mb-1 block text-xs font-medium text-stone-600">
          Sort by
        </label>
        <select id="sort" value={sortBy} onChange={(event) => onSortChange(event.target.value)} className={fieldClasses}>
          <option value="closing-soonest">Closing soonest</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  )
}
