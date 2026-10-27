// Shared by the sidebar and the mobile nav so both show the same pill for the current page.
// Callers add their own padding and gap.
export function navLinkClasses({ isActive }) {
  return `flex items-center rounded-lg py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-accent ${
    isActive ? 'bg-accent-soft text-accent-strong' : 'text-muted hover:bg-canvas hover:text-ink'
  }`
}
