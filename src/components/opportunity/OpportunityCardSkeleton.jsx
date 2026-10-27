import Skeleton from '../ui/Skeleton'

// Mirrors OpportunityCard line for line so nothing moves when the data appears.
export default function OpportunityCardSkeleton() {
  return (
    <div className="rounded-card border border-line bg-surface px-4 pt-3.5 pb-3">
      <div className="flex h-5 items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="mt-2 h-10 space-y-2 py-1">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-2/3" />
      </div>
      <div className="mt-2 space-y-0.5">
        <div className="flex h-5 items-center">
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="flex h-5 items-center">
          <Skeleton className="h-3 w-2/5" />
        </div>
      </div>
      <div className="mt-3 border-t border-line pt-2.5">
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
  )
}
