import { CircleCheck } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

export default function ApprovalPreview() {
  return (
    <>
      <p className="text-xs font-semibold">Pending approvals</p>
      <ul className="mt-2.5 space-y-2">
        <li className="rounded-card border border-line p-2.5">
          <p className="text-xs font-semibold">UI/UX Design Intern</p>
          <p className="text-[11px] text-muted">Brightpath Studio Â· Gulberg</p>
          <div className="mt-2 flex gap-1.5">
            <Button className="h-7! px-2.5! text-xs!">Approve</Button>
            <Button variant="secondary" className="h-7! px-2.5! text-xs!">
              Reject
            </Button>
          </div>
        </li>
        <li className="flex items-center justify-between gap-2 rounded-card border border-line p-2.5">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">Merit Scholarship 2027</p>
            <p className="truncate text-[11px] text-muted">Indus Learning Trust</p>
          </div>
          <Badge className="bg-open-soft text-open">
            <CircleCheck size={13} />
            Approved
          </Badge>
        </li>
      </ul>
    </>
  )
}
