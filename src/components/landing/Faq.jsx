import { Minus, Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'

const questions = [
  {
    question: 'Who can post opportunities?',
    answer:
      'Alumni, employers and the university career office. Every post is reviewed by an admin before students can see it.',
  },
  {
    question: 'How does verification work?',
    answer:
      'An admin checks each post for a real organisation, a clear description and a valid deadline, then approves or rejects it with a reason.',
  },
  {
    question: 'Do I need an account?',
    answer: 'Not in this demo. Use View as in the top bar to switch between student, alumni and admin.',
  },
  {
    question: 'Is this real data?',
    answer:
      'No. This is a frontend demo with fictional organisations and opportunities, saved only in your browser. Reset demo data restores the original data at any time.',
  },
  {
    question: 'What happens after I apply?',
    answer:
      'Your application appears in My applications as Submitted, and changes to Accepted or Rejected when the poster reviews it.',
  },
]

// Native <details>: keyboard and screen reader support come free. Sharing one name
// makes the browser keep only one open at a time (older browsers allow several).
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 space-y-6">
      <SectionHeading id="faq-heading" title="Questions, answered" intro="Everything you might wonder before trying the demo." />

      <div className="grid gap-4 rounded-3xl border border-line bg-surface p-4 md:grid-cols-[2fr_3fr] md:gap-6 md:p-6">
        {/* Absolutely positioned so the question list sets the height and the photo stretches to match. */}
        <div className="relative h-50 md:h-auto">
          <img
            src="/images/faq-photo.webp"
            alt=""
            width="800"
            height="1066"
            loading="lazy"
            className="absolute inset-0 size-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/10"
          />
        </div>

        <div className="grid gap-3">
          {questions.map(({ question, answer }, index) => (
            <details
              key={question}
              name="faq"
              open={index === 0}
              className="group rounded-xl border border-line bg-surface open:border-line-strong/60"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl p-4 font-semibold text-pretty hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                <Plus size={20} strokeWidth={2.25} aria-hidden="true" className="shrink-0 text-muted group-open:hidden" />
                <Minus size={20} strokeWidth={2.25} aria-hidden="true" className="hidden shrink-0 text-muted group-open:block" />
                {question}
              </summary>
              {/* pl-12 = 16px padding + 20px icon + 12px gap, so the answer lines up with the question */}
              <p className="max-w-[65ch] pr-4 pb-4 pl-12 text-sm leading-relaxed text-pretty text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
