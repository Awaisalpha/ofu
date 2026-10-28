// A row of toggle chips with a count each, e.g. All 4 · Pending 1 · Approved 2.
// options is a list of { value, label, count, icon }; icon is an optional lucide icon.
export default function StatusFilterChips({ label, options, selected, onSelect }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const isActive = option.value === selected
        const Icon = option.icon
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            aria-pressed={isActive}
            className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive
                ? 'border-accent bg-accent-soft text-accent-strong'
                : 'border-line bg-surface text-muted hover:border-line-strong hover:text-ink'
            }`}
          >
            {Icon && <Icon size={14} aria-hidden="true" />}
            {option.label}
            <span className="text-xs tabular-nums">{option.count}</span>
          </button>
        )
      })}
    </div>
  )
}
