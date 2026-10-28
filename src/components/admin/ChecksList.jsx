import { CircleCheck, TriangleAlert } from 'lucide-react'
import { getChecks } from '../../utils/reviewChecks'

// The three automatic checks stacked, each with an icon and written result.
export default function ChecksList({ post }) {
  return (
    <ul className="space-y-1.5">
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
  )
}
