import { Check } from 'lucide-react'
import ButtonLink from '../ui/ButtonLink'
import { roleHomePaths, roleLabels } from '../layout/navItems'
import SectionHeading from './SectionHeading'

const rolePoints = {
  student: ['Search and filter verified opportunities', 'Save listings and see what closes soon', 'Apply with a short cover note'],
  alumni: ['Post a job, internship or event', 'See whether the admin approved it', 'Accept or reject applicants'],
  admin: ['See users, listings and applications at a glance', 'Approve or reject new posts', 'Activate or deactivate users'],
}

// The role is part of the URL, so opening a role's first page is the role switch.
export default function RoleCards() {
  return (
    <section id="try-a-role" aria-labelledby="try-a-role-heading" className="scroll-mt-20">
      <SectionHeading
        id="try-a-role-heading"
        title="Try a role"
        intro="No sign-up. Switch roles at any time from the top bar."
      />

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {Object.keys(rolePoints).map((role) => (
          <li key={role} className="flex flex-col rounded-card border border-line bg-surface p-5">
            <h3 className="text-lg leading-snug font-semibold">{roleLabels[role]}</h3>
            {/* flex-1 pushes the buttons to the same height in every card. */}
            <ul className="mt-3 flex-1 space-y-2 text-sm text-muted">
              {rolePoints[role].map((point) => (
                <li key={point} className="flex gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-open" aria-hidden="true" />
                  <span className="text-pretty">{point}</span>
                </li>
              ))}
            </ul>
            <ButtonLink to={roleHomePaths[role]} className="mt-6 self-start">
              Open as {roleLabels[role]}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
