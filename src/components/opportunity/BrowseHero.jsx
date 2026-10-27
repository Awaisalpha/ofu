// Evenly dark behind the text, then fading to clear at the edges so the photo stays vivid.
// Sized in px, not %, because the text is about the same width on every screen.
// Measured worst case behind the text passes WCAG AA from 375px to 1280px, even without the text shadow.
const shade = 'color-mix(in srgb, var(--color-ink) 60%, transparent)'
const centreOverlay = {
  backgroundImage: `radial-gradient(ellipse 520px 100% at center, ${shade} 0%, ${shade} 50%, transparent 100%)`,
}

// Bottom padding leaves room for the search panel that overlaps the hero's lower edge.
export default function BrowseHero() {
  return (
    // The gradient shows if the photo fails to load.
    <div className="relative h-40 overflow-hidden rounded-card bg-linear-to-br from-accent to-accent-strong sm:h-[220px]">
      {/* Decorative, so alt is empty. Phones get the 1200px file, larger screens the 2400px one. */}
      <picture>
        <source media="(max-width: 768px)" srcSet="/images/browse-hero-1200.webp" />
        <img
          src="/images/browse-hero-2400.webp"
          alt=""
          className="absolute inset-0 size-full object-cover object-[center_40%]"
        />
      </picture>
      <div style={centreOverlay} className="absolute inset-0" />
      <div className="relative flex h-full flex-col items-center justify-center px-4 pb-12 text-center text-shadow-hero sm:pb-14">
        <h1 className="text-2xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-4xl">
          Browse opportunities
        </h1>
        <p className="mt-1.5 max-w-[55ch] text-sm text-pretty text-white/90 sm:mt-2 sm:text-base">
          Verified jobs, internships, scholarships, freelance work and events.
        </p>
      </div>
    </div>
  )
}
