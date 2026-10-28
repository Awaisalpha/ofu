import Skeleton from '../ui/Skeleton'

// Mirrors OpportunityCard with a two-line title and the chips wrapped onto two rows,
// the most common shape in the 3-column grid, so the cards barely move when they appear.
export default function OpportunityCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-card border border-line bg-surface px-4 pt-4 pb-3">
      <div className="flex gap-3 pr-8">
        <Skeleton className="size-10 shrink-0 rounded-card" />
        <div className="min-w-0 flex-1">
          <div className="h-10 space-y-2 py-1">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
          <div className="mt-0.5 flex h-5 items-center">
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="flex gap-1.5">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-28" />
        </div>
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="mt-auto pt-3">
        <div className="flex items-center justify-between gap-2 border-t border-line pt-2.5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  )
}
