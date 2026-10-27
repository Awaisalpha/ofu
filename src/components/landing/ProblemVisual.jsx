import { ArrowDown, ArrowRight, ClipboardList, Mail, MessageCircle, ShieldCheck } from 'lucide-react'
import SectionHeading from './SectionHeading'

const scatteredSources = [
  { label: 'WhatsApp groups', note: 'Buried under hundreds of messages', icon: MessageCircle },
  { label: 'Emails', note: 'Lost between newsletters and spam', icon: Mail },
  { label: 'Notice boards', note: 'Only seen if you walk past', icon: ClipboardList },
]

// Built from plain HTML and CSS, no image.
export default function ProblemVisual() {
  return (
    <section aria-labelledby="problem-heading">
      <SectionHeading
        id="problem-heading"
        title="Opportunities are scattered"
        intro="Posts are spread across group chats, inboxes and corridors, so students find out after the deadline."
      />

      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        <ul className="flex min-w-0 flex-1 flex-col gap-2">
          {scatteredSources.map(({ label, note, icon: Icon }) => (
            <li key={label} className="flex items-center gap-3 rounded-card border border-line bg-surface px-4 py-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-card bg-closed-soft text-muted">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">{label}</span>
                <span className="block text-sm text-pretty text-muted">{note}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="flex justify-center text-muted">
          <ArrowDown size={24} className="md:hidden" aria-hidden="true" />
          <ArrowRight size={24} className="hidden md:block" aria-hidden="true" />
          <span className="sr-only">All of these lead to</span>
        </div>

        <div className="min-w-0 flex-1 rounded-card bg-accent p-6 text-white">
          <ShieldCheck size={28} aria-hidden="true" />
          <p className="mt-4 text-xl leading-tight font-semibold tracking-tight">One verified place</p>
          <p className="mt-2 text-sm text-pretty text-white/90">
            Every post is checked by an admin, shows its deadline clearly and sits next to the rest.
          </p>
        </div>
      </div>
    </section>
  )
}
