import { Briefcase, CalendarDays, GraduationCap, Laptop, PenTool } from 'lucide-react'

// One icon and one soft tint per opportunity type, shared by the landing chips and My posts.
// The tints are the identity tints (no red, green or amber), and each pair passes WCAG AA.
export const typeStyles = {
  Job: { icon: Briefcase, tintClassName: 'bg-accent-soft text-accent-strong' },
  Internship: { icon: Laptop, tintClassName: 'bg-tint-sky-soft text-tint-sky' },
  Scholarship: { icon: GraduationCap, tintClassName: 'bg-tint-violet-soft text-tint-violet' },
  Freelance: { icon: PenTool, tintClassName: 'bg-tint-fuchsia-soft text-tint-fuchsia' },
  Event: { icon: CalendarDays, tintClassName: 'bg-tint-sand-soft text-tint-sand' },
}
