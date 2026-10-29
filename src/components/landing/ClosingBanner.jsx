import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

// "already here" sits on a solid accent block. White on the accent passes AA (4.7:1).
// box-decoration-clone repeats the padding on each line if the words wrap.
export default function ClosingBanner() {
  return (
    <section aria-labelledby="closing-banner-heading" className="py-16 text-center sm:py-24">
      <h2
        id="closing-banner-heading"
        className="mx-auto max-w-3xl text-3xl leading-[1.1] font-bold tracking-[-0.02em] text-balance text-ink sm:text-[2.75rem]"
      >
        Your next opportunity is{' '}
        <span className="box-decoration-clone rounded-[2px] bg-accent px-1.5 text-white">already here</span>
      </h2>
      <p className="mx-auto mt-4 max-w-[50ch] text-base text-pretty text-muted sm:text-lg">
        Verified jobs, internships, scholarships and events, all in one place.
      </p>
      <Link
        to="/student/browse"
        className="mt-8 inline-flex h-11 items-center gap-1.5 rounded-full bg-accent pr-4 pl-5 text-base font-semibold text-white hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Try the demo
        <ChevronRight size={18} strokeWidth={2.25} aria-hidden="true" />
      </Link>
    </section>
  )
}
