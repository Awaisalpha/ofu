export default function SortSelect({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm whitespace-nowrap text-muted">
        Sort by
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        className="h-9 rounded-card border border-line-strong bg-surface px-2 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-sm"
      >
        <option value="closing-soonest">Closing soonest</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  )
}
