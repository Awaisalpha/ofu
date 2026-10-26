import Skeleton from '../ui/Skeleton'

// Mirrors OpportunityCard line for line so nothing moves when the data appears.
export default function OpportunityCardSkeleton() {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5">
      <div className="flex h-6 items-center justify-between gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-32 rounded-full" />
      </div>
      <div className="mt-3 h-12 space-y-2 py-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="mt-1 h-5 w-1/2" />
      <Skeleton className="mt-3 h-5 w-1/3" />
    </div>
  )
}
