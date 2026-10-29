import { ClipboardCheck, PlusCircle, Search } from 'lucide-react'
import { useState } from 'react'
import { roleHomePaths, roleLabels } from '../layout/navItems'
import ArrowLink from '../ui/ArrowLink'
import PreviewPill from './PreviewPill'
import StepPreview from './StepPreview'

// pillLabel is the small tag beside the app preview.
const steps = [
  {
    title: 'Alumni and employers post an opportunity',
    text: 'One short form with the role, organisation, deadline and details.',
    role: 'alumni',
    icon: PlusCircle,
    pillLabel: 'Post an opportunity',
  },
  {
    title: 'The admin verifies it',
    text: 'Every post is checked before students see it, so nothing fake or expired gets through.',
    role: 'admin',
    icon: ClipboardCheck,
    pillLabel: 'Verified by admin',
  },
  {
    title: 'Students discover, save and apply',
    text: 'Search and filter by type, save for later and apply before the deadline.',
    role: 'student',
    icon: Search,
    pillLabel: 'Apply in one click',
  },
]

// Steps come first in the DOM so phones and screen readers get them before the photo;
// on wider screens the photo moves to the left with order-first.
// The role is part of the URL, so opening a role's first page is the role switch.
export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-hand text-2xl leading-none font-semibold text-accent-strong">Simple steps</p>
        <h2 id="how-it-works-heading" className="mt-2 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
          How it works
        </h2>
        <p className="mt-2 text-base text-pretty text-muted">From posting to applying, in three simple steps.</p>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-[5fr_6fr] md:items-center md:gap-16">
        <ol className="border-l border-line">
          {steps.map((step, index) => {
            const isActive = index === activeStep
            const Icon = step.icon
            return (
              <li key={step.title} className="relative py-4 pl-5 sm:pl-6">
                {isActive && <span aria-hidden="true" className="absolute inset-y-4 -left-0.5 w-[3px] rounded-full bg-ink" />}
                <h3>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveStep(index)}
                    className={`flex w-full items-center gap-3 rounded-card text-left text-lg leading-snug font-semibold text-balance hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${isActive ? 'text-ink' : 'text-muted'}`}
                  >
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-xl ${isActive ? 'bg-accent-soft text-accent-strong' : 'text-muted'}`}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    {step.title}
                  </button>
                </h3>
                {/* pl-13 = 40px icon tile + 12px gap, so the text lines up with the title. */}
                <p className="mt-1 pl-13 text-sm text-pretty text-muted">{step.text}</p>
                <ArrowLink to={roleHomePaths[step.role]} className="mt-1 ml-13">
                  Open as {roleLabels[step.role]}
                </ArrowLink>
              </li>
            )
          })}
        </ol>

        <div className="relative md:order-first">
          <img
            src="/images/how-it-works.webp"
            alt=""
            width="900"
            height="1125"
            loading="lazy"
            decoding="async"
            className="h-65 w-full rounded-[20px] object-cover shadow-float md:aspect-4/5 md:h-auto md:max-h-[36rem]"
          />
          {/* Scaled down on phones so some of the photo still shows around the card. */}
          <div className="absolute right-3 bottom-3 w-72 max-w-[calc(100%-1.5rem)] origin-bottom-right max-md:scale-85 md:-right-8 md:-bottom-8">
            <PreviewPill label={steps[activeStep].pillLabel} className="absolute right-4 bottom-full mb-2 flex-row-reverse" arrowClassName="-scale-x-100" />
            <StepPreview activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  )
}
