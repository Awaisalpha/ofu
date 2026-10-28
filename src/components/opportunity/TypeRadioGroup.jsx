import { opportunityTypes } from '../../data/opportunities'
import FieldError from '../ui/FieldError'

// Real radio inputs styled as chips, so arrow keys move between types for free.
// onBlur only fires when focus leaves the whole group, not when moving between chips.
export default function TypeRadioGroup({ value, error, onChange, onBlur, firstRadioRef }) {
  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) onBlur()
  }

  return (
    <fieldset onBlur={handleBlur} aria-describedby={error ? 'type-error' : undefined}>
      <legend className="text-sm font-semibold">Type</legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {opportunityTypes.map((type, index) => (
          <label
            key={type}
            className={`inline-flex h-8 cursor-pointer items-center rounded-full border px-3 text-[13px] has-checked:border-accent has-checked:bg-accent has-checked:font-semibold has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent ${
              error ? 'border-danger' : 'border-line-strong'
            } bg-surface font-medium text-ink hover:bg-canvas has-checked:hover:bg-accent-hover`}
          >
            <input
              ref={index === 0 ? firstRadioRef : undefined}
              type="radio"
              name="type"
              value={type}
              checked={value === type}
              onChange={() => onChange(type)}
              aria-invalid={error ? true : undefined}
              className="sr-only"
            />
            {type}
          </label>
        ))}
      </div>
      <FieldError id="type-error">{error}</FieldError>
    </fieldset>
  )
}
