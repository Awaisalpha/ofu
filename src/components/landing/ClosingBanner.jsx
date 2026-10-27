import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

// White text on the accent passes AA (about 8.7:1). The focus ring is white because an
// accent ring would disappear against the accent panel.
export default function ClosingBanner() {
  return (
    <section
      aria-labelledby="closing-banner-heading"
      className="rounded-card bg-accent px-6 py-12 text-center text-white sm:px-10 sm:py-16"
    >
      <h2
        id="closing-banner-heading"
        className="mx-auto max-w-2xl text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl"
      >
        Your next opportunity is already here
      </h2>
      <p className="mx-auto mt-3 max-w-[50ch] text-base text-pretty text-white/90">
        Verified jobs, internships, scholarships and events, all in one place.
      </p>
      <Link
        to="/student/browse"
        className="mt-8 inline-flex h-11 items-center gap-1.5 rounded-full bg-surface pr-4 pl-5 text-sm font-semibold text-accent hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Try the demo
        <ChevronRight size={16} aria-hidden="true" />
      </Link>
    </section>
  )
}
