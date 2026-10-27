import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../ui/Button'
import TypeChips from './TypeChips'

// Same photo and soft shade as BrowseHero, with a wider ellipse because this text block is larger.
// The text always sits inside the solid 60% part, so white text passes WCAG AA (4.7:1) even over a white pixel.
const shade = 'color-mix(in srgb, var(--color-ink) 60%, transparent)'
const centreOverlay = {
  backgroundImage: `radial-gradient(ellipse 820px 100% at center, ${shade} 0%, ${shade} 55%, transparent 100%)`,
}

export default function SearchHero() {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const query = searchText.trim()
    navigate(query ? `/student/browse?${new URLSearchParams({ q: query })}` : '/student/browse')
  }

  return (
    // The gradient shows if the photo fails to load.
    <div className="relative overflow-hidden bg-linear-to-br from-accent to-accent-strong">
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

      {/* The top padding leaves room for the nav pill that sits over the photo. */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pt-32 pb-16 text-center sm:pt-36 sm:pb-24">
        <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-balance text-white text-shadow-hero sm:text-5xl">
          Every UCP opportunity, in one place
        </h1>
        <p className="mt-4 max-w-[55ch] text-base text-pretty text-white text-shadow-hero sm:text-lg">
          Jobs, internships, scholarships, freelance work and events, verified and organised so you never miss a
          deadline.
        </p>

        {/* The white panel keeps the accent focus rings on a light background. */}
        <form
          role="search"
          onSubmit={handleSubmit}
          className="mt-8 flex w-full max-w-xl gap-2 rounded-card bg-surface p-2 shadow-float"
        >
          <label htmlFor="landing-search" className="sr-only">
            Search opportunities by title or organisation
          </label>
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            {/* Taller than the shared Input (h-9), so it is styled here. */}
            <input
              id="landing-search"
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Try “design”"
              className="h-11 w-full rounded-card border border-line-strong bg-surface pr-3 pl-10 text-base placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
          </div>
          <Button type="submit" size="lg">
            Search
          </Button>
        </form>

        <div className="mt-6">
          <TypeChips />
        </div>
      </div>
    </div>
  )
}
