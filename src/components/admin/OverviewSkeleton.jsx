import Skeleton from '../ui/Skeleton'

// Shown while the Overview page and its chart library download.
export default function OverviewSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading overview">
      <Skeleton className="h-7 w-32" />
      <Skeleton className="mt-2 h-4 w-56" />
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((card) => (
          <Skeleton key={card} className="h-36 rounded-card" />
        ))}
      </div>
      <Skeleton className="mt-4 h-80 rounded-card" />
    </div>
  )
}
