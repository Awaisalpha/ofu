import Skeleton from '../ui/Skeleton'

// Mirrors the OpportunityDetail card block for block.
export default function OpportunityDetailSkeleton() {
  return (
    <div className="rounded-card border border-line bg-surface">
      <div className="p-5 sm:p-6">
        <div className="flex h-5 items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="mt-3 h-7 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/3" />
      </div>
      <div className="grid border-y border-line sm:grid-cols-3">
        <div className="h-16 p-3">
          <Skeleton className="h-full" />
        </div>
        <div className="h-16 p-3">
          <Skeleton className="h-full" />
        </div>
        <div className="h-16 p-3">
          <Skeleton className="h-full" />
        </div>
      </div>
      <div className="space-y-2.5 p-5 sm:p-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-2/3" />
      </div>
      <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Skeleton className="h-4 w-36" />
        <div className="flex flex-col gap-2 sm:flex-row">
          <Skeleton className="h-9 sm:w-20" />
          <Skeleton className="h-9 sm:w-28" />
          <Skeleton className="h-9 sm:w-20" />
        </div>
      </div>
    </div>
  )
}
