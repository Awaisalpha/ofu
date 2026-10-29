import { useRef } from 'react'
import { roleHomePaths, roleLabels } from '../layout/navItems'
import ArrowLink from '../ui/ArrowLink'
import { tourRoles } from './tourRoles'

const nextIndexByKey = {
  ArrowRight: (index, count) => (index + 1) % count,
  ArrowDown: (index, count) => (index + 1) % count,
  ArrowLeft: (index, count) => (index - 1 + count) % count,
  ArrowUp: (index, count) => (index - 1 + count) % count,
  Home: () => 0,
  End: (index, count) => count - 1,
}

// The role selector of the landing page tour. From 768px up a vertical list with a line on
// its left, below that a row of pills. Roving tabindex: Tab enters on the selected role,
// every arrow key, Home and End move between roles. The tablist may only hold tabs, so the
// Open as link sits under it.
export default function RoleTabs({ selectedRole, onSelect, panelId }) {
  const tabRefs = useRef([])
  const selected = tourRoles.find((item) => item.role === selectedRole)

  function handleKeyDown(event, index) {
    const getNextIndex = nextIndexByKey[event.key]
    if (!getNextIndex) return
    // Also stops the page from scrolling on the arrow keys.
    event.preventDefault()
    const nextIndex = getNextIndex(index, tourRoles.length)
    onSelect(tourRoles[nextIndex].role)
    tabRefs.current[nextIndex].focus()
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Role"
        className="flex gap-2 max-md:flex-wrap md:flex-col md:gap-0 md:border-l md:border-line"
      >
        {tourRoles.map((item, index) => {
          const isSelected = item.role === selectedRole
          return (
            <button
              key={item.role}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              type="button"
              role="tab"
              id={`tour-tab-${item.role}`}
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelect(item.role)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              // Pill classes first, then md: classes that turn the pill into a list item.
              className={`inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:relative md:block md:h-auto md:rounded-card md:border-0 md:bg-transparent md:py-4 md:pr-2 md:pl-6 md:text-left md:whitespace-normal md:hover:bg-transparent ${
                isSelected
                  ? 'border-accent bg-accent font-semibold text-white'
                  : 'border-line bg-surface font-medium text-ink hover:bg-canvas'
              }`}
            >
              {isSelected && (
                <span aria-hidden="true" className="absolute inset-y-4 -left-0.5 w-[3px] rounded-full bg-ink max-md:hidden" />
              )}
              {/* In the list the selected role is ink and the others muted; the bar marks it too. */}
              <span
                className={`md:block md:text-lg md:leading-snug md:font-semibold ${
                  isSelected ? 'md:text-ink' : 'md:text-muted md:hover:text-ink'
                }`}
              >
                {item.name}
              </span>
              <span className="mt-1 block max-w-[38ch] text-sm leading-normal font-normal text-pretty text-muted max-md:hidden">
                {item.description}
              </span>
            </button>
          )
        })}
      </div>

      {/* On phones the pills show only names, so the selected description shows here. */}
      <div className="mt-3 md:pl-6">
        <p className="text-sm text-pretty text-muted md:hidden">{selected.description}</p>
        <ArrowLink to={roleHomePaths[selectedRole]}>Open as {roleLabels[selectedRole]}</ArrowLink>
      </div>
    </div>
  )
}
