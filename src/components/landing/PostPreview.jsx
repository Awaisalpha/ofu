import { CalendarDays } from 'lucide-react'
import { dateFromToday, formatDate } from '../../utils/dates'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

// Styled like the real Input, but plain text: the preview is a picture, not a form.
const fieldClasses = 'flex h-8 items-center gap-1.5 rounded-card border border-line-strong px-2.5 text-xs'

export default function PostPreview() {
  return (
    <>
      <p className="text-xs font-semibold">Post opportunity</p>
      <div className="mt-2.5 space-y-2.5">
        <div>
          <p className="mb-1 text-[11px] font-medium text-muted">Title</p>
          <p className={fieldClasses}>UI/UX Design Intern</p>
        </div>
        <div className="flex items-end gap-2">
          <div>
            <p className="mb-1 text-[11px] font-medium text-muted">Type</p>
            <p className="flex h-8 items-center">
              <Badge>Internship</Badge>
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[11px] font-medium text-muted">Deadline</p>
            <p className={fieldClasses}>
              <CalendarDays size={13} className="shrink-0 text-muted" />
              <span className="truncate">{formatDate(dateFromToday(14))}</span>
            </p>
          </div>
        </div>
        <Button className="h-8! w-full text-xs!">Submit for review</Button>
      </div>
    </>
  )
}
