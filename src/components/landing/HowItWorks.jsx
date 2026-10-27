import SectionHeading from './SectionHeading'

const steps = [
  {
    title: 'Alumni and employers post an opportunity',
    text: 'One short form with the role, organisation, deadline and details.',
  },
  {
    title: 'The admin verifies it',
    text: 'Every post is checked before students see it, so nothing fake or expired gets through.',
  },
  {
    title: 'Students discover, save and apply',
    text: 'Search and filter by type, save for later and apply before the deadline.',
  },
]

// The <ol> already gives screen readers the numbers, so the number circles are hidden from them.
export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="scroll-mt-20">
      <SectionHeading id="how-it-works-heading" title="How it works" />

      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-card border border-line bg-surface p-5">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent tabular-nums"
            >
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg leading-snug font-semibold text-balance">{step.title}</h3>
            <p className="mt-1.5 text-sm text-pretty text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
