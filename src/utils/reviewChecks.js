import { daysLeft } from './dates'
import { DESCRIPTION_MIN_LENGTH } from './validation'

// Quick checks to help the admin decide. Each one is written out in text,
// so a warning never depends on the icon colour alone.
export function getChecks(post) {
  const descriptionLength = post.description.trim().length

  return [
    {
      label: 'Deadline',
      passed: daysLeft(post.deadline) >= 1,
      passText: 'Deadline is in the future',
      failText: 'Deadline is today or has passed',
    },
    {
      label: 'Description',
      passed: descriptionLength >= DESCRIPTION_MIN_LENGTH,
      passText: 'Description is detailed enough',
      failText: `Description is short (${descriptionLength} of ${DESCRIPTION_MIN_LENGTH} characters)`,
    },
    {
      label: 'Organisation',
      passed: post.organisation.trim() !== '',
      passText: 'Organisation given',
      failText: 'No organisation given',
    },
  ]
}
