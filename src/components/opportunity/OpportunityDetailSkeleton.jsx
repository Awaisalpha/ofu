import Skeleton from '../ui/Skeleton'

// Mirrors the OpportunityDetail layout block for block.
export default function OpportunityDetailSkeleton() {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-6">
      <div className="flex h-6 items-center gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-36 rounded-full" />
      </div>
      <Skeleton className="mt-3 h-8 w-3/4" />
      <Skeleton className="mt-1 h-6 w-1/3" />

      <Skeleton className="mt-6 h-20 w-full rounded-md" />

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-11" />
        <Skeleton className="h-11" />
        <Skeleton className="h-11" />
      </div>

      <Skeleton className="mt-6 h-6 w-24" />
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>
    </div>
  )
}
