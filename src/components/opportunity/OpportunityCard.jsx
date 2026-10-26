import { MapPin } from 'lucide-react'
import { Link } from 'react-router'
import Badge from '../ui/Badge'
import DeadlineBadge from './DeadlineBadge'

// Fixed heights on the text lines keep every card the same size as OpportunityCardSkeleton.
export default function OpportunityCard({ opportunity }) {
  return (
    <Link
      to={`/student/opportunities/${opportunity.id}`}
      className="block rounded-lg border border-stone-200 bg-white p-5 hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <div className="flex h-6 items-center justify-between gap-2">
        <Badge>{opportunity.type}</Badge>
        <DeadlineBadge deadline={opportunity.deadline} />
      </div>
      <h2 className="mt-3 line-clamp-2 h-12 text-base leading-6 font-semibold">{opportunity.title}</h2>
      <p className="mt-1 h-5 truncate text-sm leading-5 text-stone-600">{opportunity.organisation}</p>
      <p className="mt-3 flex h-5 items-center gap-1 text-sm leading-5 text-stone-500">
        <MapPin size={14} aria-hidden="true" />
        {opportunity.location}
      </p>
    </Link>
  )
}
