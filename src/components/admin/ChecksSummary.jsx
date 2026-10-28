import { CircleCheck, TriangleAlert } from 'lucide-react'
import { getChecks } from '../../utils/reviewChecks'

// "3 of 3 checks passed" in green, or "2 of 3 checks passed" in amber with the failing check named.
export default function ChecksSummary({ post }) {
  const checks = getChecks(post)
  const failedChecks = checks.filter((check) => !check.passed)
  const allPassed = failedChecks.length === 0
  const Icon = allPassed ? CircleCheck : TriangleAlert

  return (
    <span
      className={`flex items-start gap-1.5 text-[13px] leading-5 font-semibold ${allPassed ? 'text-open' : 'text-closing'}`}
    >
      <Icon size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>
        {checks.length - failedChecks.length} of {checks.length} checks passed
        {!allPassed && (
          <span className="font-normal">
            {' · '}
            {failedChecks.map((check) => check.label).join(', ')}
          </span>
        )}
      </span>
    </span>
  )
}
