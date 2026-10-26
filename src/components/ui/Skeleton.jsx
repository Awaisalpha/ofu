// A grey placeholder block; className sets its size so it matches the real content.
export default function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded bg-stone-200 ${className}`} />
}
