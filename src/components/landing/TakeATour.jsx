import { useState } from 'react'
import PreviewAppShell from './PreviewAppShell'
import PreviewFrame from './PreviewFrame'
import RoleTabs from './RoleTabs'
import ScaledPreview from './ScaledPreview'
import TourHeading from './TourHeading'
import TourRolePage from './TourRolePage'
import { tourRoles } from './tourRoles'

const PANEL_ID = 'tour-panel'

// The role list on the left switches a live, scaled down copy of that role's real page on the right.
export default function TakeATour() {
  const [selectedRole, setSelectedRole] = useState('student')
  const selected = tourRoles.find((item) => item.role === selectedRole)

  return (
    <section id="tour" aria-labelledby="tour-heading" className="scroll-mt-20">
      <TourHeading />

      <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-start md:gap-12">
        <RoleTabs selectedRole={selectedRole} onSelect={setSelectedRole} panelId={PANEL_ID} />

        {/* tabIndex 0: the preview inside is inert, so the panel itself is the focus stop. */}
        <div
          role="tabpanel"
          id={PANEL_ID}
          aria-labelledby={`tour-tab-${selectedRole}`}
          tabIndex={0}
          className="min-w-0 rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <p className="sr-only">{selected.previewDescription}</p>
          <PreviewFrame>
            {/* key: a new role fades in, unless the user asked for less motion. */}
            <div key={selectedRole} className="motion-safe:animate-fade-in">
              <ScaledPreview>
                <PreviewAppShell role={selectedRole}>
                  <TourRolePage role={selectedRole} />
                </PreviewAppShell>
              </ScaledPreview>
            </div>
          </PreviewFrame>
        </div>
      </div>
    </section>
  )
}
