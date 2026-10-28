import { CircleCheck, Search } from 'lucide-react'
import { dateFromToday } from '../../utils/dates'
import DeadlineBadge from '../opportunity/DeadlineBadge'
import Badge from '../ui/Badge'

export default function BrowsePreview() {
  return (
    <>
      <p className="flex h-8 items-center gap-1.5 rounded-card border border-line-strong px-2.5 text-xs text-muted">
        <Search size={13} className="shrink-0" />
        Search opportunities
      </p>
      <ul className="mt-2.5 space-y-2">
        <li className="rounded-card border border-line p-2.5">
          <p className="text-xs font-semibold">Frontend Developer Intern</p>
          <p className="mb-1.5 text-[11px] text-muted">Codeline Labs Â· Johar Town</p>
          <DeadlineBadge deadline={dateFromToday(2)} />
        </li>
        <li className="rounded-card border border-line p-2.5">
          <p className="text-xs font-semibold">Campus Hackathon Volunteer</p>
          <p className="mb-1.5 text-[11px] text-muted">Northgate Events Â· Remote</p>
          <Badge>
            <CircleCheck size={13} />
            Applied
          </Badge>
        </li>
      </ul>
    </>
  )
}
