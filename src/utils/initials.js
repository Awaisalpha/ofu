// "Pixel Bagh Studio" → "PB"
export function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Each pair passes WCAG AA (6.5:1 or more).
const initialsTints = [
  'bg-accent-soft text-accent-strong',
  'bg-tint-sky-soft text-tint-sky',
  'bg-tint-violet-soft text-tint-violet',
  'bg-tint-fuchsia-soft text-tint-fuchsia',
  'bg-tint-sand-soft text-tint-sand',
]

// The same name always gets the same tint.
export function getInitialsTint(name) {
  let total = 0
  for (const character of name) total += character.charCodeAt(0)
  return initialsTints[total % initialsTints.length]
}
