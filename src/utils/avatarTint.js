// Identity tints only (no red, green or amber), each pair checked for WCAG AA.
const AVATAR_TINTS = [
  'bg-accent-soft text-accent-strong',
  'bg-tint-sky-soft text-tint-sky',
  'bg-tint-violet-soft text-tint-violet',
  'bg-tint-fuchsia-soft text-tint-fuchsia',
  'bg-tint-sand-soft text-tint-sand',
]

// The same name always gets the same tint, so a person is easy to spot across lists.
export function getAvatarTint(name) {
  let total = 0
  for (const character of name) total += character.charCodeAt(0)
  return AVATAR_TINTS[total % AVATAR_TINTS.length]
}
