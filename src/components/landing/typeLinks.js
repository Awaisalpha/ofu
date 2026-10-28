import { typeStyles } from '../opportunity/typeStyles'

// One entry per opportunity type for the landing page chips.
// "to" opens student Browse already filtered by that type.
export const typeLinks = [
  { type: 'Job', label: 'Jobs', icon: typeStyles.Job.icon, to: '/student/browse?type=job' },
  { type: 'Internship', label: 'Internships', icon: typeStyles.Internship.icon, to: '/student/browse?type=internship' },
  {
    type: 'Scholarship',
    label: 'Scholarships',
    icon: typeStyles.Scholarship.icon,
    to: '/student/browse?type=scholarship',
  },
  { type: 'Freelance', label: 'Freelance', icon: typeStyles.Freelance.icon, to: '/student/browse?type=freelance' },
  { type: 'Event', label: 'Events', icon: typeStyles.Event.icon, to: '/student/browse?type=event' },
]
