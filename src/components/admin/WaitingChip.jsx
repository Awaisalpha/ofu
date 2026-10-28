import { Hourglass } from 'lucide-react'
import { daysLeft } from '../../utils/dates'
import Badge from '../ui/Badge'

const LONG_WAIT_DAYS = 2

// How long the post has waited for review. Amber after 2 days; the text always says the number.
export default function WaitingChip({ postedAt }) {
  const daysWaiting = Math.max(0, -daysLeft(postedAt))
  const isLongWait = daysWaiting > LONG_WAIT_DAYS

  let label = `Waiting ${daysWaiting} days`
  if (daysWaiting === 0) label = 'Waiting under a day'
  if (daysWaiting === 1) label = 'Waiting 1 day'

  return (
    <Badge className={isLongWait ? 'bg-closing-soft text-closing' : 'bg-closed-soft text-closed'}>
      <Hourglass size={13} aria-hidden="true" />
      {label}
    </Badge>
  )
}
