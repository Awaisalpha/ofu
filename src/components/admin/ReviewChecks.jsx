import { CircleCheck, TriangleAlert } from 'lucide-react'
import { daysLeft } from '../../utils/dates'
import { DESCRIPTION_MIN_LENGTH } from '../../utils/validation'

// Quick checks to help the admin decide. Each one is written out in text,
// so a warning never depends on the icon colour alone.
function getChecks(post) {
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

export default function ReviewChecks({ post }) {
  return (
    <div>
      <h3 className="text-[13px] font-semibold text-muted">Automatic checks</h3>
      <ul className="mt-1.5 flex flex-col gap-x-5 gap-y-1.5 sm:flex-row sm:flex-wrap">
        {getChecks(post).map((check) => (
          <li key={check.label} className="flex items-start gap-1.5 text-[13px] leading-5">
            {check.passed ? (
              <CircleCheck size={16} className="mt-0.5 shrink-0 text-open" aria-hidden="true" />
            ) : (
              <TriangleAlert size={16} className="mt-0.5 shrink-0 text-closing" aria-hidden="true" />
            )}
            <span className={check.passed ? '' : 'font-medium text-closing'}>
              {check.passed ? check.passText : check.failText}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
