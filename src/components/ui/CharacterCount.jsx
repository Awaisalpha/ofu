// "120 / 500" under a text field; turns red and bold once the limit is passed.
// The field points at it with aria-describedby.
export default function CharacterCount({ id, length, maxLength }) {
  const isOverLimit = length > maxLength

  return (
    <p
      id={id}
      className={`mt-1.5 ml-auto shrink-0 text-[13px] leading-5 tabular-nums ${
        isOverLimit ? 'font-semibold text-danger' : 'text-muted'
      }`}
    >
      {length} / {maxLength}
      <span className="sr-only"> characters</span>
    </p>
  )
}
