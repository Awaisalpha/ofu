import { Link } from 'react-router'

export default function Wordmark() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="rounded bg-accent px-1.5 py-0.5 text-sm font-bold tracking-wide text-white">OFU</span>
      <span className="hidden text-sm font-semibold sm:inline">Opportunities</span>
    </Link>
  )
}
