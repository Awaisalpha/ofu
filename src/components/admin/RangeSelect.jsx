// "Last 7 days" or "Last 30 days" for the overview charts. value is a number of days.
export default function RangeSelect({ id, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-sm whitespace-nowrap text-muted">
        Show
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-9 rounded-card border border-line-strong bg-surface px-2 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-sm"
      >
        <option value={7}>Last 7 days</option>
        <option value={30}>Last 30 days</option>
      </select>
    </div>
  )
}
