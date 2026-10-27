// A grey placeholder block; className sets its size so it matches the real content.
// The shimmer only runs when the user allows motion.
export default function Skeleton({ className = '' }) {
  return <div className={`rounded bg-line motion-safe:animate-pulse ${className}`} />
}
